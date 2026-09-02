import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuService, ContextMenuType } from '@axe/application/ui/context-menu.service';
import { MobileLayoutService } from '@axe/application/ui/mobile-layout.service';
import { ObjectStore } from '@axe/core/sync/object-store';
import { GameCharacter } from '@axe/domain/character/game-character';
import { GridType } from '@axe/domain/tabletop/game-table';
import { GameTableComponent } from '@axe/features/tabletop/game-table/game-table.component';
import { TEST_PROVIDERS } from '@axe/testing/test-providers';

describe('GameTableComponent', () => {
  let component: GameTableComponent;
  let fixture: ComponentFixture<GameTableComponent>;
  let store: ObjectStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GameTableComponent],
      providers: [...TEST_PROVIDERS],
    }).compileComponents();
  });

  beforeEach(() => {
    store = ObjectStore.instance;
    store.getObjects().forEach((object) => store.delete(object, false));
    store.clearDeleteHistory();
    fixture = TestBed.createComponent(GameTableComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    store.getObjects().forEach((object) => store.delete(object, false));
    store.clearDeleteHistory();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('2D camera', () => {
    const syncMode2d = (target: GameTableComponent): void => {
      (target as unknown as { syncMode2d(): void }).syncMode2d();
    };

    beforeEach(() => {
      (component.gestureService as unknown as { gameTableEl: HTMLElement }).gameTableEl = document.createElement('div');
    });

    it('straightens the table when entering 2D mode without locking later rotation', () => {
      component.gestureService.viewRotateX = 35;
      component.gestureService.viewRotateY = 12;
      component.gestureService.viewRotateZ = 27;
      component.currentTable.mode2d = true;

      syncMode2d(component);

      expect(component.gestureService.viewRotateX).toBe(0);
      expect(component.gestureService.viewRotateY).toBe(0);
      expect(component.gestureService.viewRotateZ).toBe(0);

      component.gestureService.setTransform(0, 0, 0, 0, 0, 15);
      syncMode2d(component);
      expect(component.gestureService.viewRotateZ).toBe(15);
    });

    it('uses scale-based zoom only while orthographic projection is enabled in 2D mode', () => {
      component.gestureService.viewPositionZ = -3000;
      component.currentTable.mode2d = true;
      component.currentTable.orthographicProjection = true;

      syncMode2d(component);
      expect(component.gestureService.orthographicProjection).toBe(true);
      expect(
        (component.gestureService as unknown as { gameTableEl: HTMLElement }).gameTableEl.style.transform
      ).toContain('scale(0.500000)');

      component.currentTable.orthographicProjection = false;
      syncMode2d(component);
      expect(component.gestureService.orthographicProjection).toBe(false);
      expect(
        (component.gestureService as unknown as { gameTableEl: HTMLElement }).gameTableEl.style.transform
      ).not.toContain('scale(');
    });

    it('removes the perspective from the tabletop viewport', async () => {
      component.currentTable.gridType = GridType.NONE;
      component.currentTable.mode2d = true;
      component.currentTable.orthographicProjection = true;

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(component.rootElementRef().nativeElement.style.perspective).toBe('none');
    });
  });

  describe('characters', () => {
    const MINE = ['いち', 'に'];

    function makeCharacter(name: string): GameCharacter {
      const character = GameCharacter.create(name, 1, '');
      character.location.name = 'table';
      return character;
    }

    const laidOut = () =>
      component
        .characters()
        .map((c) => c.name)
        .filter((name) => MINE.includes(name));

    it('lays the pieces out in the order they are stacked', () => {
      const under = makeCharacter('いち');
      const over = makeCharacter('に');
      under.zindex = 5;
      over.zindex = 1;

      expect(laidOut()).toEqual(['に', 'いち']);
    });

    it('lays them out again once one of them moves up the pile', async () => {
      const first = makeCharacter('いち');
      const second = makeCharacter('に');
      first.zindex = 0;
      second.zindex = 1;
      // Settle the arrivals first: a piece's own change bumps its version and not the
      // collection's, and that is the only thing left to notice the order has moved.
      await Promise.resolve();
      expect(laidOut()).toEqual(['いち', 'に']);

      first.toTopmost();
      await Promise.resolve();

      expect(laidOut()).toEqual(['に', 'いち']);
    });
  });

  describe('buildContextMenuActions', () => {
    const position = { x: 0, y: 0, z: 0 };
    const names = () => component.buildContextMenuActions(position).map((action) => action.name);

    it('leaves out the piece-making item on a desktop', () => {
      TestBed.inject(MobileLayoutService).prefersDesktop.set(true);

      expect(names()).not.toContain('コマを作る…');
      expect(names()).toContain('キャラクターを作成');
      expect(names()).toContain('画像タグから山札を作成');
    });

    it('offers it on a mobile layout', () => {
      const mobileLayout = TestBed.inject(MobileLayoutService);
      mobileLayout.prefersDesktop.set(false);
      Object.defineProperty(mobileLayout, 'isActive', { value: () => true, configurable: true });

      expect(names()).toContain('コマを作る…');
    });

    it('groups table actions for the rotating menu without dropping legacy actions', () => {
      const model = component.buildContextMenuModel(position);
      const groupedActions = model.rotatingGroups.flatMap((group) => group.actions);
      const legacyActions = model.actions.filter((action) => action.name.length > 0);

      expect(model.rotatingGroups.map((group) => group.name)).toEqual([
        'オブジェクト作成1',
        'オブジェクト作成2',
        'テーブル設定',
      ]);
      expect(groupedActions).toEqual(expect.arrayContaining(legacyActions));
      expect(groupedActions).toHaveLength(legacyActions.length);
    });

    it('splits the create items with a separator between the dice and the coin', () => {
      const model = component.buildContextMenuModel(position);
      const separatorIndexes = model.actions
        .map((action, index) => (action.type === ContextMenuType.SEPARATOR ? index : -1))
        .filter((index) => 0 <= index);

      expect(separatorIndexes).toHaveLength(2);
      expect(model.actions[separatorIndexes[0] - 1].name).toBe('ダイスを作成');
      expect(model.actions[separatorIndexes[0] + 1].name).toBe('コインを作成');
      expect(model.rotatingGroups[0].actions).toHaveLength(separatorIndexes[0]);
    });
  });

  describe('table context menu display', () => {
    const menuPosition = { x: 320, y: 240, z: 0 };
    const objectPosition = { x: 10, y: 20, z: 0 };

    it('opens the rotating interface directly on an empty 2D table when enabled', () => {
      component.currentTable.mode2d = true;
      component.currentTable.radialMenuEnabled = true;
      component.currentTable.radialMenuRotationSpeed = 8;
      const menus = TestBed.inject(ContextMenuService);
      const openRotating = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);
      const openLegacy = vi.spyOn(menus, 'open').mockImplementation(() => undefined);

      component.openTableContextMenu(menuPosition, objectPosition);

      expect(openRotating).toHaveBeenCalledWith(
        expect.objectContaining({ x: 320, y: 240 }),
        expect.any(Array),
        expect.any(Array),
        component.currentTable.name,
        true,
        8,
        1
      );
      expect(openLegacy).not.toHaveBeenCalled();
    });

    it('opens the four-direction launcher on an empty 2D table when rotating display is disabled', () => {
      component.currentTable.mode2d = true;
      component.currentTable.radialMenuEnabled = false;
      component.currentTable.radialMenuRotationSpeed = 6;
      const menus = TestBed.inject(ContextMenuService);
      const openRotating = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);
      const openLegacy = vi.spyOn(menus, 'open').mockImplementation(() => undefined);

      component.openTableContextMenu(menuPosition, objectPosition);

      expect(openRotating).toHaveBeenCalledWith(
        expect.objectContaining({ x: 320, y: 240 }),
        expect.any(Array),
        expect.any(Array),
        component.currentTable.name,
        false,
        6,
        1
      );
      expect(openLegacy).not.toHaveBeenCalled();
    });

    it('keeps the existing vertical table menu outside 2D mode', () => {
      component.currentTable.mode2d = false;
      component.currentTable.radialMenuEnabled = false;
      const menus = TestBed.inject(ContextMenuService);
      const openRotating = vi.spyOn(menus, 'openRadial').mockImplementation(() => undefined);
      const openLegacy = vi.spyOn(menus, 'open').mockImplementation(() => undefined);

      component.openTableContextMenu(menuPosition, objectPosition);

      expect(openLegacy).toHaveBeenCalledWith(
        expect.objectContaining({ x: 320, y: 240 }),
        expect.any(Array),
        component.currentTable.name
      );
      expect(openRotating).not.toHaveBeenCalled();
    });
  });

  describe('tableSurfaceStyle', () => {
    it('leaves a square table on its default rectangle', () => {
      const table = component.currentTable;
      table.gridType = GridType.SQUARE;

      expect(component.tableSurfaceStyle()).toMatchObject({
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px',
        mask: 'none',
      });
      expect(component.tableSurfaceBorderStyle()).toEqual({ background: 'none' });
    });

    it('widens a hex table to the outline of the hexes and masks it', () => {
      const table = component.currentTable;
      table.width = 3;
      table.height = 2;
      table.gridSize = 50;
      table.gridType = GridType.HEX_VERTICAL;

      const style = component.tableSurfaceStyle();
      const borderStyle = component.tableSurfaceBorderStyle();

      expect(Number.parseFloat(style?.width ?? '')).toBeCloseTo((50 / Math.sqrt(3)) * 2 + (50 / Math.sqrt(3)) * 3);
      expect(Number.parseFloat(style?.height ?? '')).toBeCloseTo(125);
      expect(Number.parseFloat(style?.left ?? '')).toBeCloseTo(-50 / Math.sqrt(3));
      expect(Number.parseFloat(style?.top ?? '')).toBeCloseTo(-25);
      expect(style?.mask).toContain('data:image/svg+xml');
      expect(style?.['-webkit-mask']).toBe(style?.mask);
      expect(borderStyle?.background).toContain('data:image/svg+xml');
    });
  });

  describe('wallBackground', () => {
    it('backs a wall with the picture alone when no grid is asked for', () => {
      const bg = component.wallBackground('blob:wall', '');
      expect(bg.surfaceBackground).toBe('url(blob:wall)');
      expect(bg.surfaceBackgroundSize).toBe('100% 100%');
      expect(bg.surfaceBackgroundRepeat).toBe('no-repeat');
    });

    it('lays the grid over the picture when one is', () => {
      const bg = component.wallBackground('blob:wall', 'data:image/png;base64,AAA');
      expect(bg.surfaceBackground).toBe('url(data:image/png;base64,AAA), url(blob:wall)');
      expect(bg.surfaceBackgroundSize).toBe('100% 100%, 100% 100%');
      expect(bg.surfaceBackgroundRepeat).toBe('no-repeat, no-repeat');
    });
  });
});
