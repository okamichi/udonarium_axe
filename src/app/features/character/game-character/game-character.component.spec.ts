import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectPlaybackService } from '@axe/application/effect/effect-playback.service';
import { ObjectChangeService } from '@axe/application/sync/object-change.service';
import { TabletopService } from '@axe/application/tabletop/tabletop.service';
import { ContextMenuService } from '@axe/application/ui/context-menu.service';
import { TabletopOverlapService } from '@axe/application/ui/tabletop-overlap.service';
import { UiSignalService } from '@axe/application/ui/ui-signal.service';
import { PointerDeviceService } from '@axe/core/input/pointer-device.service';
import { ImageStorage } from '@axe/core/storage/image-storage';
import { ObjectStore } from '@axe/core/sync/object-store';
import { GameCharacter } from '@axe/domain/character/game-character';
import { DataElement, DataElementAttribute, DataElementType } from '@axe/domain/data/data-element';
import { EffectPreset } from '@axe/domain/effect/effect-preset';
import { PresetSound, SoundEffect } from '@axe/domain/media/sound-effect';
import { GameCharacterComponent } from '@axe/features/character/game-character/game-character.component';
import { TEST_PROVIDERS } from '@axe/testing/test-providers';

describe('GameCharacterComponent', () => {
  let component: GameCharacterComponent;
  let fixture: ComponentFixture<GameCharacterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GameCharacterComponent],
      providers: [...TEST_PROVIDERS],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCharacterComponent);
    component = fixture.componentInstance;
  });

  const useFlatTable = () => {
    const table = TestBed.inject(TabletopService).currentTable;
    table.mode2d = false;
    table.radialMenuEnabled = false;
    table.imageBillboard = false;
    table.multiAngleEnabled = false;
    table.multiAngleMotionMode = 'continuous';
    table.multiAngleRevolutionSeconds = 12;
    table.multiAnglePauseSeconds = 2;
    table.multiAnglePieceRevolutionSeconds = 60;
  };

  beforeEach(useFlatTable);
  afterEach(useFlatTable);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('carries its place in the pile onto the element the table stacks', async () => {
    const character = GameCharacter.create('コマ', 1, '');
    fixture.componentRef.setInput('gameCharacter', character);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).style.zIndex).toBe('0');

    character.zindex = 4;
    await Promise.resolve();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.zIndex).toBe('4');
  });

  it('registers its effect in the constructor, so nothing is set up outside an injection context', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  describe('character context menu display', () => {
    function pointerEvent(type: string, x: number, y: number): PointerEvent {
      return new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerId: 7,
        button: 2,
        buttons: type === 'pointerup' ? 0 : 2,
        clientX: x,
        clientY: y,
      });
    }

    function openMenu(tableMode2d: boolean, radialMenuEnabled: boolean, size = 1, showRotatingName = false) {
      const character = GameCharacter.create('menu-piece', size, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const table = TestBed.inject(TabletopService).currentTable;
      table.mode2d = tableMode2d;
      table.radialMenuEnabled = radialMenuEnabled;
      table.radialMenuRotationSpeed = 7;
      table.multiAngleEnabled = showRotatingName;
      fixture.detectChanges();
      const diameter = size * 50;
      vi.spyOn(component.rootElementRef()!.nativeElement, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        right: 100 + diameter,
        bottom: 100 + diameter,
        left: 100,
        width: diameter,
        height: diameter,
        x: 100,
        y: 100,
      } as DOMRect);
      TestBed.inject(PointerDeviceService).primeForContextMenu(120, 160);
      vi.spyOn(TestBed.inject(TabletopOverlapService), 'findAt').mockReturnValue([]);

      component.onContextMenu(new Event('contextmenu', { cancelable: true }));
      return character;
    }

    it('uses the ordinary downward menu outside 2D mode', () => {
      const menus = TestBed.inject(ContextMenuService);
      const open = vi.spyOn(menus, 'open').mockImplementation(() => undefined);
      const openRadial = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);
      const character = openMenu(false, true);

      try {
        expect(open).toHaveBeenCalled();
        expect(openRadial).not.toHaveBeenCalled();
      } finally {
        character.destroy();
      }
    });

    it.each([true, false])('opens the 2D menu interface with rotating display %s', (enabled) => {
      const menus = TestBed.inject(ContextMenuService);
      const openRadial = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);
      const character = openMenu(true, enabled);

      try {
        expect(openRadial).toHaveBeenCalledWith(
          expect.any(Object),
          expect.any(Array),
          expect.any(Array),
          'menu-piece',
          enabled,
          7,
          0,
          25
        );
      } finally {
        character.destroy();
      }
    });

    it.each([true, false])('keeps the same large-piece clearance with rotating names %s', (showRotatingName) => {
      const menus = TestBed.inject(ContextMenuService);
      const openRadial = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);
      const character = openMenu(true, true, 3, showRotatingName);

      try {
        const clearanceRadius = openRadial.mock.calls[0]?.[6];
        expect(clearanceRadius).toBeCloseTo(100.05);
      } finally {
        character.destroy();
      }
    });

    it('keeps the original 1x1 distance and passes its rendered half extent', () => {
      const menus = TestBed.inject(ContextMenuService);
      const openRadial = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);
      const character = openMenu(true, true, 1, true);

      try {
        expect(openRadial.mock.calls[0]?.[6]).toBe(0);
        expect(openRadial.mock.calls[0]?.[7]).toBe(25);
      } finally {
        character.destroy();
      }
    });

    it('opens a 2D piece menu at the release point of a right drag', () => {
      const character = GameCharacter.create('drag-menu-piece', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const table = TestBed.inject(TabletopService).currentTable;
      table.mode2d = true;
      table.radialMenuEnabled = false;
      fixture.detectChanges();
      const root = component.rootElementRef()!.nativeElement;
      vi.spyOn(root, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        right: 150,
        bottom: 150,
        left: 100,
        width: 50,
        height: 50,
        x: 100,
        y: 100,
      } as DOMRect);
      vi.spyOn(TestBed.inject(TabletopOverlapService), 'findAt').mockReturnValue([]);
      const openRadial = vi.spyOn(TestBed.inject(ContextMenuService), 'openRadial').mockImplementation(() => undefined);

      try {
        root.dispatchEvent(pointerEvent('pointerdown', 120, 120));
        root.dispatchEvent(pointerEvent('pointermove', 360, 280));
        const centerMarker = document.querySelector<HTMLElement>('[data-piece-right-drag-center]');
        expect(centerMarker?.classList.contains('piece-right-drag-center')).toBe(true);
        expect(centerMarker?.style.left).toBe('360px');
        expect(centerMarker?.style.top).toBe('280px');
        root.dispatchEvent(pointerEvent('pointerup', 360, 280));
        const nativeMenu = new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
          button: 2,
          clientX: 360,
          clientY: 280,
        });
        root.dispatchEvent(nativeMenu);

        expect(openRadial).toHaveBeenCalledWith(
          { x: 360, y: 280 },
          expect.any(Array),
          expect.any(Array),
          'drag-menu-piece',
          false,
          expect.any(Number),
          0,
          25,
          { x: 125, y: 125 }
        );
        expect(openRadial).toHaveBeenCalledTimes(1);
        expect(nativeMenu.defaultPrevented).toBe(true);
        expect(document.querySelector('[data-piece-right-drag-center]')).toBeNull();
      } finally {
        character.destroy();
      }
    });

    it('leaves an unmoved right click on the existing menu path', () => {
      const character = GameCharacter.create('click-menu-piece', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const table = TestBed.inject(TabletopService).currentTable;
      table.mode2d = true;
      fixture.detectChanges();
      const root = component.rootElementRef()!.nativeElement;
      vi.spyOn(root, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        right: 150,
        bottom: 150,
        left: 100,
        width: 50,
        height: 50,
        x: 100,
        y: 100,
      } as DOMRect);
      vi.spyOn(TestBed.inject(TabletopOverlapService), 'findAt').mockReturnValue([]);
      const menus = TestBed.inject(ContextMenuService);
      const openRadial = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);

      try {
        root.dispatchEvent(pointerEvent('pointerdown', 120, 120));
        root.dispatchEvent(pointerEvent('pointerup', 120, 120));
        expect(openRadial).not.toHaveBeenCalled();
        expect(document.querySelector('[data-piece-right-drag-center]')).toBeNull();

        TestBed.inject(PointerDeviceService).primeForContextMenu(120, 120);
        component.onContextMenu(new Event('contextmenu', { cancelable: true }));
        expect(openRadial).toHaveBeenCalledWith(
          { x: 125, y: 125 },
          expect.any(Array),
          expect.any(Array),
          'click-menu-piece',
          table.radialMenuEnabled,
          table.radialMenuRotationSpeed,
          0,
          25
        );
      } finally {
        character.destroy();
      }
    });

    it('does not replace the 3D table right drag with a piece menu', () => {
      const character = GameCharacter.create('3d-menu-piece', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      TestBed.inject(TabletopService).currentTable.mode2d = false;
      fixture.detectChanges();
      const root = component.rootElementRef()!.nativeElement;
      const menus = TestBed.inject(ContextMenuService);
      const open = vi.spyOn(menus, 'open').mockImplementation(() => undefined);
      const openRadial = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);

      try {
        root.dispatchEvent(pointerEvent('pointerdown', 120, 120));
        root.dispatchEvent(pointerEvent('pointermove', 360, 280));
        root.dispatchEvent(pointerEvent('pointerup', 360, 280));

        expect(open).not.toHaveBeenCalled();
        expect(openRadial).not.toHaveBeenCalled();
      } finally {
        character.destroy();
      }
    });
  });

  describe('what shows above a piece', () => {
    it('gives a character bars for the usual two resources', () => {
      const character = GameCharacter.create('ゲージ', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        expect(component.pieceGauges().map((gauge) => gauge.name)).toEqual(['HP', 'MP']);
        expect(component.pieceGauges()[0]).toMatchObject({ initial: 'H', ratio: 1 });
      } finally {
        character.destroy();
      }
    });

    it('takes a resource off the piece once its bar is turned off', () => {
      const character = GameCharacter.create('ゲージ', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const hp = DataElement.findElementByReference(character.rootDataElement!, 'HP')!;

      try {
        expect(component.pieceGauges()).toHaveLength(2);

        hp.removeAttribute(DataElementAttribute.PIECE_GAUGE);
        objectChange.notifyChanged(hp.identifier);

        expect(component.pieceGauges().map((gauge) => gauge.name)).toEqual(['MP']);
      } finally {
        character.destroy();
      }
    });

    it('folds the buffs into icons with their strength', () => {
      const character = GameCharacter.create('バフ', 1, '');
      character.addExtendData();
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const buffRoot = character.buffDataElement!;
      const container = DataElement.create('バフ', '', {});
      buffRoot.appendChild(container);
      const buff = DataElement.create('毒', 3, {
        type: DataElementType.NUMBER_RESOURCE,
        currentValue: 'ダメージ2',
      });
      buff.setAttribute(DataElementAttribute.BUFF_ICON, '☠️');
      container.appendChild(buff);
      objectChange.notifyChanged(buffRoot.identifier);

      try {
        expect(component.buffBadges()).toEqual([
          expect.objectContaining({ icon: '☠️', name: '毒', strength: '2', rounds: 3 }),
        ]);
      } finally {
        character.destroy();
      }
    });
  });

  describe('showing a resource change', () => {
    it('shows a red number and a flash of damage as a value falls', async () => {
      const character = GameCharacter.create('被弾', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const hp = DataElement.findElementByReference(character.rootDataElement!, 'HP')!;

      try {
        fixture.detectChanges();
        expect(component.floatingChanges()).toEqual([]);

        hp.currentValue = 170;
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();

        expect(component.floatingChanges()).toEqual([
          expect.objectContaining({ kind: 'damage', label: '-30', name: 'HP' }),
        ]);
        expect(component.hitFlash()).toBe('damage');
      } finally {
        character.destroy();
      }
    });

    it('stays quiet for a value replaced by a load or a sync', async () => {
      const character = GameCharacter.create('復元', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const hp = DataElement.findElementByReference(character.rootDataElement!, 'HP')!;

      try {
        fixture.detectChanges();

        // Loading a room, restoring an autosave and syncing from a peer all come in through the
        // apply rather than the setter, and none of them is a change to show.
        const context = hp.toContext();
        (context.syncData as Record<string, unknown>)['currentValue'] = 999;
        context.majorVersion += 1;
        hp.apply(context);
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();

        expect(component.floatingChanges()).toEqual([]);
        expect(component.hitFlash()).toBeNull();
      } finally {
        character.destroy();
      }
    });

    it('shows a green number and a flash of healing as it rises', async () => {
      const character = GameCharacter.create('回復', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const hp = DataElement.findElementByReference(character.rootDataElement!, 'HP')!;
      hp.currentValue = 100;

      try {
        fixture.detectChanges();
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();
        component.floatingChanges.set([]);

        hp.currentValue = 160;
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();

        expect(component.floatingChanges()).toEqual([
          expect.objectContaining({ kind: 'heal', label: '+60', name: 'HP' }),
        ]);
        expect(component.hitFlash()).toBe('heal');
      } finally {
        character.destroy();
      }
    });

    it('picks the sound by how large the change is', async () => {
      const character = GameCharacter.create('鳴り分け', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const hp = DataElement.findElementByReference(character.rootDataElement!, 'HP')!;
      const played: string[] = [];
      vi.spyOn(SoundEffect, 'playLocal').mockImplementation((arg) => {
        played.push(typeof arg === 'string' ? arg : arg.identifier);
      });

      try {
        fixture.detectChanges();

        hp.currentValue = 190;
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();

        hp.currentValue = 130;
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();

        hp.currentValue = 10;
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();

        expect(played).toEqual([PresetSound.damageSmall, PresetSound.damageMedium, PresetSound.damageLarge]);
      } finally {
        character.destroy();
      }
    });

    it('counts a rise as damage on a resource that runs the other way', async () => {
      const character = GameCharacter.create('狂気', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const hp = DataElement.findElementByReference(character.rootDataElement!, 'HP')!;
      hp.setAttribute(DataElementAttribute.GAUGE_INVERTED, 'true');
      const played: string[] = [];
      vi.spyOn(SoundEffect, 'playLocal').mockImplementation((arg) => {
        played.push(typeof arg === 'string' ? arg : arg.identifier);
      });

      try {
        fixture.detectChanges();

        hp.currentValue = 260;
        objectChange.notifyChanged(hp.identifier);
        await fixture.whenStable();

        expect(component.floatingChanges()).toEqual([
          expect.objectContaining({ kind: 'damage', label: '+60', name: 'HP' }),
        ]);
        expect(component.hitFlash()).toBe('damage');
        expect(played).toEqual([PresetSound.damageLarge]);
      } finally {
        character.destroy();
      }
    });

    it('stays quiet for the portrait slot and the piece image', async () => {
      const character = GameCharacter.create('立ち絵', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      character.addExtendData();
      const played: string[] = [];
      vi.spyOn(SoundEffect, 'playLocal').mockImplementation((arg) => {
        played.push(typeof arg === 'string' ? arg : arg.identifier);
      });

      try {
        fixture.detectChanges();

        character.portraitPosition = 7;
        const pos = character.detailDataElement!.getFirstElementByName('POS')!;
        objectChange.notifyChanged(pos.identifier);
        await fixture.whenStable();

        const icon = character.detailDataElement!.getFirstElementByName('ICON')!;
        icon.currentValue = 3;
        objectChange.notifyChanged(icon.identifier);
        await fixture.whenStable();

        expect(component.floatingChanges()).toEqual([]);
        expect(component.hitFlash()).toBeNull();
        expect(played).toEqual([]);
      } finally {
        character.destroy();
      }
    });

    it('shows nothing when nothing changed', async () => {
      const character = GameCharacter.create('無変化', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);

      try {
        fixture.detectChanges();
        objectChange.notifyChanged(character.identifier);
        await fixture.whenStable();

        expect(component.floatingChanges()).toEqual([]);
        expect(component.hitFlash()).toBeNull();
      } finally {
        character.destroy();
      }
    });
  });

  describe('viewRotateZ computed signal', () => {
    it('starts at ten', () => {
      expect(component.viewRotateZ()).toBe(10);
    });

    it('turns with the table view', () => {
      const uiSignalService = TestBed.inject(UiSignalService);
      uiSignalService.notifyTableViewRotation(50, 20, 120);
      expect(component.viewRotateZ()).toBe(120);
    });
  });

  it('asks for no change detector', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((component as any).changeDetector).toBeUndefined();
  });

  it('computes whether it is targeted', () => {
    expect(typeof component.isTargeted).toBe('function');
  });

  describe('the target marker', () => {
    const setTargeted = (character: GameCharacter, targeted: boolean) => {
      character.targeted = targeted;
      TestBed.inject(UiSignalService).notifyTargetChange(character.identifier, character.aliasName);
      fixture.detectChanges();
    };

    const markerOf = () => fixture.nativeElement.querySelector('[data-testid="target-marker"]');

    const ringOf = () => fixture.nativeElement.querySelector('[data-testid="target-ring"]');

    it('appears on a target and goes with it', () => {
      const character = GameCharacter.create('marker', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        expect(markerOf()).toBeNull();

        setTargeted(character, true);
        expect(markerOf()).toBeTruthy();

        setTargeted(character, false);
        expect(markerOf()).toBeNull();
      } finally {
        character.destroy();
      }
    });

    it('brings the ring at its foot with it', () => {
      const character = GameCharacter.create('marker-ring', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        expect(ringOf()).toBeNull();

        setTargeted(character, true);
        expect(ringOf()).toBeTruthy();

        setTargeted(character, false);
        expect(ringOf()).toBeNull();
      } finally {
        character.destroy();
      }
    });

    it('appears even on a character whose buffs are hidden', () => {
      const character = GameCharacter.create('marker-hidden-buff', 1, '');
      character.addExtendData();
      character.hideBuff = true;
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        setTargeted(character, true);
        expect(markerOf()).toBeTruthy();
      } finally {
        character.destroy();
      }
    });

    const wrapperTransform = () => (markerOf().parentElement as HTMLElement).style.transform;

    const axisValues = (transform: string, axis: 'X' | 'Y' | 'Z') =>
      [...transform.matchAll(new RegExp(`translate${axis}\\((-?[\\d.]+)px\\)`, 'g'))].map((match) => Number(match[1]));

    const markerLift = () => {
      const transform = wrapperTransform();
      const x = axisValues(transform, 'X');
      const y = axisValues(transform, 'Y');
      const z = axisValues(transform, 'Z');
      return Math.hypot(x[x.length - 1], y[0], z[0]);
    };

    it('sits directly above the centre of the piece', () => {
      const character = GameCharacter.create('marker-center', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      TestBed.inject(UiSignalService).notifyTableViewRotation(50, 0, 10);

      try {
        setTargeted(character, true);

        expect(axisValues(wrapperTransform(), 'X')[0]).toBe((component.size() * component.gridSize) / 2);
        expect(component.targetStackTransform()).toContain('translateZ(0.00px)');
      } finally {
        character.destroy();
      }
    });

    it('keeps its distance as the camera turns', () => {
      const character = GameCharacter.create('marker-rotated-view', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);
      const uiSignalService = TestBed.inject(UiSignalService);

      try {
        uiSignalService.notifyTableViewRotation(50, 0, 10);
        setTargeted(character, true);
        const straight = markerLift();

        uiSignalService.notifyTableViewRotation(35, 0, 70);
        fixture.detectChanges();

        expect(markerLift()).toBeCloseTo(straight, 1);
      } finally {
        character.destroy();
      }
    });

    it('sits above the buffs', () => {
      const character = GameCharacter.create('marker-above-buff', 1, '');
      character.addExtendData();
      fixture.componentRef.setInput('gameCharacter', character);
      const objectChange = TestBed.inject(ObjectChangeService);
      const buffRoot = character.buffDataElement!;
      const container = DataElement.create('バフ', '', {});
      buffRoot.appendChild(container);
      const buff = DataElement.create('毒', 3, { type: DataElementType.NUMBER_RESOURCE, currentValue: 'ダメージ2' });
      buff.setAttribute(DataElementAttribute.BUFF_ICON, '☠️');
      container.appendChild(buff);
      objectChange.notifyChanged(buffRoot.identifier);
      TestBed.inject(UiSignalService).notifyTableViewRotation(50, 0, 10);

      try {
        setTargeted(character, true);
        const buffDistance = -Number(/translateY\((-?[\d.]+)px\)/.exec(component.buffLabelOrbit())![1]);

        expect(markerLift()).toBeGreaterThan(buffDistance);
      } finally {
        character.destroy();
      }
    });
  });

  it('computes whether the height is set by hand', async () => {
    const char = GameCharacter.create('height-flag-test', 1, '');
    fixture.componentRef.setInput('gameCharacter', char);

    try {
      expect(component.specifyKomaImageFlag()).toBe(false);

      char.specifyKomaImageFlag = true;
      await new Promise<void>((resolve) => queueMicrotask(resolve));

      expect(component.specifyKomaImageFlag()).toBe(true);
    } finally {
      char.destroy();
    }
  });

  it('keeps a hand-set image in the layout, so the name and the buffs still measure from it', () => {
    ImageStorage.instance.add('piece-height-url');
    const char = GameCharacter.create('height-layout-test', 1, 'piece-height-url');
    char.specifyKomaImageFlag = true;
    char.komaImageHeight = 240;
    fixture.componentRef.setInput('gameCharacter', char);

    try {
      fixture.detectChanges();

      const pieceImage = fixture.nativeElement.querySelector('img.image.chrome-smooth-image-trick') as HTMLImageElement;
      expect(pieceImage).toBeTruthy();
      expect(pieceImage.style.position).toBe('');
      expect(pieceImage.style.display).toBe('inline-block');
      expect(pieceImage.style.height).toBe('240px');
    } finally {
      char.destroy();
      ImageStorage.instance.delete('piece-height-url');
    }
  });

  describe('the handles that tip a piece over', () => {
    const headOf = () => fixture.nativeElement.querySelector('[data-testid="roll-grab-head"]') as HTMLElement | null;
    const footOf = () => fixture.nativeElement.querySelector('[data-testid="roll-grab-foot"]') as HTMLElement | null;

    it('hangs both handles off the picture box instead of off what the layout leaves behind', () => {
      ImageStorage.instance.add('roll-grab-url');
      const character = GameCharacter.create('roll-grab', 1, 'roll-grab-url');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        const pictureBox = (fixture.nativeElement.querySelector('img.image.chrome-smooth-image-trick') as HTMLElement)
          .parentElement;

        expect(headOf()?.parentElement).toBe(pictureBox);
        expect(footOf()?.parentElement).toBe(pictureBox);
        expect(headOf()?.className).toContain('top-0');
        expect(footOf()?.className).toContain('bottom-0');
      } finally {
        character.destroy();
        ImageStorage.instance.delete('roll-grab-url');
      }
    });

    it('centres each handle on the piece and pushes it clear of the edge it hangs off', () => {
      const character = GameCharacter.create('roll-grab-offset', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        expect(component.rollHandleHeadTransform()).toBe(
          'translateX(-50%) translateX(25px) translateY(-100%) translateY(-7px)'
        );
        expect(component.rollHandleFootTransform()).toBe(
          'translateX(-50%) translateX(25px) translateY(100%) translateY(7px)'
        );
      } finally {
        character.destroy();
      }
    });

    it('sizes the handle off the piece and still leaves the biggest and the smallest grabbable', () => {
      const sizeOf = (pieceSize: number) => {
        const character = GameCharacter.create('roll-grab-size', pieceSize, '');
        fixture.componentRef.setInput('gameCharacter', character);
        try {
          return { handle: component.rollHandleSizePx(), icon: component.rollHandleIconSizePx() };
        } finally {
          character.destroy();
        }
      };

      expect(sizeOf(1)).toEqual({ handle: 28, icon: 24 });
      expect(sizeOf(2).handle).toBe(56);
      expect(sizeOf(4).handle).toBe(56);
      expect(sizeOf(0.5).handle).toBe(20);
    });

    it('centres the handle on a piece of any width', () => {
      const character = GameCharacter.create('roll-grab-wide', 4, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        expect(component.rollHandleFootTransform()).toContain('translateX(-50%) translateX(100px)');
      } finally {
        character.destroy();
      }
    });

    it('takes the handles away once the table lies flat', async () => {
      const character = GameCharacter.create('roll-grab-hidden', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        expect(footOf()).toBeTruthy();

        TestBed.inject(TabletopService).currentTable.mode2d = true;
        await new Promise<void>((resolve) => queueMicrotask(resolve));
        fixture.detectChanges();

        expect(headOf()).toBeNull();
        expect(footOf()).toBeNull();
      } finally {
        character.destroy();
      }
    });
  });

  describe('following the table setting for facing the camera', () => {
    it('takes the setting from the table', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.imageBillboard = false;
      expect(component.imageBillboardEnabled()).toBe(false);

      tabletopService.currentTable.imageBillboard = true;
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      expect(component.imageBillboardEnabled()).toBe(true);
    });

    it('faces the picture at the camera without raising it', () => {
      TestBed.inject(UiSignalService).notifyTableViewRotation(50, 0, 10);
      expect(component.billboardTransformImage()).toContain('translateZ(0.00px)');
    });

    it('faces it anyway in the flat mode', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.imageBillboard = false;
      tabletopService.currentTable.mode2d = true;
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      expect(component.imageBillboardEnabled()).toBe(true);
    });
  });

  describe('keeping the name above the piece on the screen in the flat mode', () => {
    it('raises the name straight up in three dimensions', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.mode2d = false;
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      expect(component.nameLabelOrbit()).toBe('translateY(-30px)');
    });

    it('puts it up the screen in the flat mode', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.mode2d = true;
      TestBed.inject(UiSignalService).notifyTableViewRotation(0, 0, 0);
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      const transform = component.nameLabelOrbit();
      const x = Number(transform.match(/translateX\((-?[\d.]+)px\)/)?.[1] ?? NaN);
      expect(x).toBeCloseTo(0, 5);
      expect(transform).toContain('translateZ(-60.00px)');
    });

    it('puts it across as the view turns a quarter', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.mode2d = true;
      TestBed.inject(UiSignalService).notifyTableViewRotation(0, 0, 90);
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      const transform = component.nameLabelOrbit();
      expect(transform).toContain('translateX(-60.00px)');
      const z = Number(transform.match(/translateZ\((-?[\d.]+)px\)/)?.[1] ?? NaN);
      expect(z).toBeCloseTo(0, 5);
    });

    it('compensates nothing along the depth in the flat mode', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.mode2d = true;
      TestBed.inject(UiSignalService).notifyTableViewRotation(50, 0, 10);
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      expect(component.billboardTransform()).toContain('translateZ(0.00px)');
      expect(component.billboardTransformBuff()).toContain('translateZ(0.00px)');
    });

    it('keeps the stationary name while the clockwise orbit is disabled', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.mode2d = true;
      tabletopService.currentTable.multiAngleEnabled = false;
      const character = GameCharacter.create('停止名', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        const root = fixture.nativeElement as HTMLElement;

        expect(component.multiAngleNameOrbitEnabled()).toBe(false);
        expect(root.querySelector('[data-testid="multi-angle-name-orbit"]')).toBeNull();
        expect(root.querySelectorAll('[data-testid="piece-name"]')).toHaveLength(1);
      } finally {
        character.destroy();
      }
    });

    it('curves a short label four times around the clockwise orbit', async () => {
      const tabletopService = TestBed.inject(TabletopService);
      tabletopService.currentTable.mode2d = true;
      tabletopService.currentTable.multiAngleEnabled = true;
      const character = GameCharacter.create('周回名', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        const root = fixture.nativeElement as HTMLElement;
        const orbit = root.querySelector<HTMLElement>('[data-testid="multi-angle-name-orbit"]');

        expect(component.multiAngleNameOrbitEnabled()).toBe(true);
        expect(orbit?.dataset['orbitDirection']).toBe('clockwise');
        expect(orbit?.classList.contains('animate-multi-angle-name-orbit')).toBe(true);
        expect(root.querySelectorAll('[data-testid="piece-name"]')).toHaveLength(1);
        expect(root.querySelectorAll('[data-testid="multi-angle-name-text-path"]')).toHaveLength(4);
        const seamContinuation = root.querySelector<SVGTextPathElement>(
          '[data-testid="multi-angle-name-seam-continuation"]'
        );
        expect(seamContinuation?.getAttribute('startOffset')).toBe('100%');
        expect(seamContinuation?.textContent?.trim()).toBe('周回名');
        expect(root.querySelectorAll('[data-testid="multi-angle-name-separator"]')).toHaveLength(4);
        expect(root.querySelector('[data-testid="multi-angle-name-separator"]')?.textContent?.trim()).toBe('◆');
        expect(root.querySelector('textPath')?.getAttribute('startOffset')).toBe('75%');
        expect(root.querySelector('textPath')?.textContent?.trim()).toBe('周回名');
        expect(root.querySelector('[data-multi-angle-seat]')).toBeNull();
        expect(component.multiAngleCurvedNameLayout().path.match(/ A /g)).toHaveLength(2);
        expect(component.multiAngleCurvedNameLayout().startOffsets).toEqual(['75%', '0%', '25%', '50%']);
        expect(component.multiAngleNameOrbitAnimation()).toEqual({
          durationSeconds: 12,
          timingFunction: 'linear',
        });

        const pieceRotation = root.querySelector<HTMLElement>('[data-testid="multi-angle-piece-motion-source"]');
        expect(pieceRotation?.classList.contains('animate-multi-angle-piece-spin')).toBe(true);
        expect(pieceRotation?.style.animationDuration).toBe('60s');
        expect(pieceRotation?.style.animationTimingFunction).toBe('linear');
        expect(component.multiAnglePieceRotationAnimation()).toEqual({
          durationSeconds: 60,
          timingFunction: 'linear',
        });
        expect(component.multiAnglePieceRotationDelaySeconds()).toBeLessThanOrEqual(0);
        expect(root.querySelector<HTMLElement>('[data-testid="multi-angle-rotating-pedestal"]')?.style.transform).toBe(
          'rotateZ(var(--multi-angle-piece-angle, 0deg))'
        );
        expect(component.multiAnglePieceImageRotation()).toBe('rotateZ(var(--multi-angle-piece-angle, 0deg))');
        expect(component.pieceImageTransform()).toMatch(
          /rotateY\(90deg\).*rotateZ\(var\(--multi-angle-piece-angle, 0deg\)\)$/
        );
        expect(component.pieceImageTransform()).not.toContain('rotateX(var(--multi-angle-piece-angle');
        expect(component.pieceImageTransform()).not.toContain('rotateY(var(--multi-angle-piece-angle');
        expect(root.querySelector<HTMLElement>('[data-testid="piece-gauge"]')?.style.transform ?? '').not.toContain(
          '--multi-angle-piece-angle'
        );
      } finally {
        character.destroy();
      }
    });

    it('uses smooth quarter turns separated by the configured pause', () => {
      const table = TestBed.inject(TabletopService).currentTable;
      table.mode2d = true;
      table.multiAngleEnabled = true;
      table.multiAngleMotionMode = 'quarter-turn';
      table.multiAngleRevolutionSeconds = 8;
      table.multiAnglePauseSeconds = 2;
      table.multiAnglePieceRevolutionSeconds = 90;
      const character = GameCharacter.create('間欠回転', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        const root = fixture.nativeElement as HTMLElement;
        const orbit = root.querySelector<HTMLElement>('[data-testid="multi-angle-name-orbit"]');
        const pieceRotation = root.querySelector<HTMLElement>('[data-testid="multi-angle-piece-motion-source"]');

        expect(component.multiAngleNameOrbitAnimation().durationSeconds).toBe(16);
        expect(component.multiAngleNameOrbitAnimation().timingFunction).toContain('0.25 12.5%');
        expect(orbit?.style.animationDuration).toBe('16s');
        expect(orbit?.style.animationTimingFunction).toContain('linear(');
        expect(component.multiAnglePieceRotationAnimation().durationSeconds).toBe(98);
        expect(component.multiAnglePieceRotationAnimation().timingFunction).toContain('0.25 22.9592%');
        expect(component.multiAnglePieceRotationAnimation().timingFunction).toContain('0.25 25%');
        expect(pieceRotation?.style.animationDuration).toBe('98s');
        expect(pieceRotation?.style.animationTimingFunction).toContain('linear(');
        expect(pieceRotation?.style.animationDelay).toBe(`${component.multiAnglePieceRotationDelaySeconds()}s`);
      } finally {
        character.destroy();
      }
    });

    it('keeps the name continuous while only the piece pauses after quarter turns', () => {
      const table = TestBed.inject(TabletopService).currentTable;
      table.mode2d = true;
      table.multiAngleEnabled = true;
      table.multiAngleMotionMode = 'piece-quarter-turn';
      table.multiAngleRevolutionSeconds = 8;
      table.multiAnglePauseSeconds = 2;
      table.multiAnglePieceRevolutionSeconds = 90;
      const character = GameCharacter.create('コマだけ間欠回転', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        const root = fixture.nativeElement as HTMLElement;
        const orbit = root.querySelector<HTMLElement>('[data-testid="multi-angle-name-orbit"]');
        const pieceRotation = root.querySelector<HTMLElement>('[data-testid="multi-angle-piece-motion-source"]');

        expect(component.multiAngleNameOrbitAnimation()).toEqual({
          durationSeconds: 8,
          timingFunction: 'linear',
        });
        expect(orbit?.style.animationDuration).toBe('8s');
        expect(orbit?.style.animationTimingFunction).toBe('linear');
        expect(component.multiAnglePieceRotationAnimation().durationSeconds).toBe(98);
        expect(component.multiAnglePieceRotationAnimation().timingFunction).toContain('0.25 22.9592%');
        expect(pieceRotation?.style.animationDuration).toBe('98s');
        expect(pieceRotation?.style.animationTimingFunction).toContain('linear(');
      } finally {
        character.destroy();
      }
    });

    it('adds only the leading buff characters to the repeated label', () => {
      const character = GameCharacter.create('勇者', 1, '');
      character.addExtendData();
      const buff = DataElement.create('攻撃強化状態', 3, {
        type: DataElementType.NUMBER_RESOURCE,
        currentValue: '+2',
      });
      character.buffDataElement!.appendChild(buff);
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        expect(component.multiAngleLabelText()).toBe('勇者/攻撃強化状');

        character.hideBuff = true;
        TestBed.inject(ObjectChangeService).notifyChanged(character.identifier);
        expect(component.multiAngleLabelText()).toBe('勇者');
      } finally {
        character.destroy();
      }
    });
  });

  describe('targeting with a modified click', () => {
    it('targets and untargets a character on a modified press, and says so', () => {
      const uiSignalService = TestBed.inject(UiSignalService);
      const notifySpy = vi.spyOn(uiSignalService, 'notifyTargetChange');
      const char = GameCharacter.create('target-test', 1, '');
      fixture.componentRef.setInput('gameCharacter', char);

      try {
        const event = new PointerEvent('pointerdown', { altKey: true, button: 0, cancelable: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
        const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

        component.checkKey(event);

        expect(char.targeted).toBe(true);
        expect(notifySpy).toHaveBeenCalledWith(char.identifier, char.aliasName);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(stopPropagationSpy).toHaveBeenCalled();
      } finally {
        char.destroy();
      }
    });

    it('clears every target with the second modifier and does not target this one again', () => {
      const uiSignalService = TestBed.inject(UiSignalService);
      const notifySpy = vi.spyOn(uiSignalService, 'notifyTargetChange');
      const char1 = GameCharacter.create('target-clear-1', 1, '');
      const char2 = GameCharacter.create('target-clear-2', 1, '');
      char1.targeted = true;
      char2.targeted = true;
      fixture.componentRef.setInput('gameCharacter', char1);

      try {
        component.checkKey(
          new PointerEvent('pointerdown', { altKey: true, shiftKey: true, button: 0, cancelable: true })
        );

        expect(char1.targeted).toBe(false);
        expect(char2.targeted).toBe(false);
        expect(notifySpy).toHaveBeenCalledWith(char1.identifier, char1.aliasName);
        expect(notifySpy).toHaveBeenCalledWith(char2.identifier, char2.aliasName);
      } finally {
        char1.destroy();
        char2.destroy();
      }
    });
  });

  describe('the hop a piece makes when it arrives', () => {
    const bodyWrapper = () => fixture.nativeElement.querySelector('[data-testid="piece-entry-bounce"]') as HTMLElement;

    it('hops once and then stays put, so re-ordering the table does not set it off again', () => {
      const character = GameCharacter.create('bounce', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();
        expect(bodyWrapper().className).toContain('animate-bounce-in');

        bodyWrapper().dispatchEvent(new AnimationEvent('animationend', { animationName: 'bounceIn' }));
        fixture.detectChanges();

        expect(bodyWrapper().className).not.toContain('animate-bounce-in');
      } finally {
        character.destroy();
      }
    });

    it('keeps hopping while another animation on the piece finishes', () => {
      const character = GameCharacter.create('bounce-other', 1, '');
      fixture.componentRef.setInput('gameCharacter', character);

      try {
        fixture.detectChanges();

        bodyWrapper().dispatchEvent(new AnimationEvent('animationend', { animationName: 'hitShake' }));
        fixture.detectChanges();

        expect(bodyWrapper().className).toContain('animate-bounce-in');
      } finally {
        character.destroy();
      }
    });
  });

  describe('setting up and tearing down', () => {
    it('reads without throwing before a character is set', () => {
      expect(() => {
        const name = component.name;
        expect(name).toBeDefined();
      }).not.toThrow();
    });

    it('reads the lock without throwing', () => {
      expect(() => {
        const isLock = component.isLock;
        expect(isLock).toBeDefined();
      }).not.toThrow();
    });

    it('sets the lock without throwing', () => {
      expect(() => {
        component.isLock = true;
      }).not.toThrow();
    });

    it('reads the size without throwing', () => {
      expect(() => {
        const size = component.size;
        expect(size).toBeDefined();
      }).not.toThrow();
    });

    it('reads the altitude without throwing', () => {
      expect(() => {
        const altitude = component.altitude;
        expect(altitude).toBeDefined();
      }).not.toThrow();
    });

    it('sets the altitude without throwing', () => {
      expect(() => {
        component.setAltitude(5);
      }).not.toThrow();
    });

    it('sets up and tears down without throwing', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
      expect(() => fixture.destroy()).not.toThrow();
    });
  });

  it('collapses the piece itself while an effect knocks it down', () => {
    const character = GameCharacter.create('斬られ役', 1, '');
    fixture.componentRef.setInput('gameCharacter', character);
    const preset = new EffectPreset();
    preset.kind = 'dissolve';
    preset.durationMs = 5000;
    ObjectStore.instance.add(preset, false);

    try {
      fixture.detectChanges();
      TestBed.inject(EffectPlaybackService).play({
        presetIdentifier: preset.identifier,
        targets: [{ identifier: character.identifier, x: 0, y: 0, z: 0 }],
        seed: 1,
      });
      fixture.detectChanges();

      // An effect around it does not read as falling; the piece has to go down with it.
      const body = (fixture.nativeElement as HTMLElement).querySelector('[data-testid="piece-body"]')!;
      expect(body.classList.contains('animate-defeat-dissolve')).toBe(true);
    } finally {
      ObjectStore.instance.remove(preset);
      character.destroy();
    }
  });
});
