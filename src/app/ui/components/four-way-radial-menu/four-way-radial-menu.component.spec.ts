import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuAction, ContextMenuService } from '@axe/application/ui/context-menu.service';
import { ModalService } from '@axe/application/ui/modal.service';
import { PanelService } from '@axe/application/ui/panel.service';
import { FourWayRadialMenuComponent } from '@axe/ui/components/four-way-radial-menu/four-way-radial-menu.component';

describe('FourWayRadialMenuComponent', () => {
  let fixture: ComponentFixture<FourWayRadialMenuComponent>;
  let service: ContextMenuService;

  const buttons = (): HTMLButtonElement[] =>
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button'));
  const buttonContaining = (text: string): HTMLButtonElement => {
    const button = buttons().find((candidate) => candidate.textContent?.includes(text));
    expect(button).toBeDefined();
    return button!;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FourWayRadialMenuComponent] }).compileComponents();
    service = TestBed.inject(ContextMenuService);
    service.title = 'Hero';
    service.position = { x: 300, y: 300 };
    service.actions = [];
    service.radialGroups = [];
    service.radialMenuEnabled = true;
    service.radialMenuRotationSpeed = 5;
    service.radialMenuClearanceRadius = 0;
    service.radialMenuOcclusionHalfExtent = 0;
    service.rotationDegrees = 0;
    service.radialAnchorPosition = null;
  });

  function createWithGroups(groups: { name: string; icon: string; actions: ContextMenuAction[] }[]): void {
    service.radialGroups = groups;
    fixture = TestBed.createComponent(FourWayRadialMenuComponent);
    fixture.detectChanges();
  }

  function chooseSeat(label: string): void {
    const button = buttons().find((candidate) => candidate.getAttribute('aria-label') === label);
    expect(button).toBeDefined();
    button!.click();
    fixture.detectChanges();
  }

  it('opens the rotating menu directly when radial display is enabled', () => {
    createWithGroups([{ name: '表示', icon: 'visibility', actions: [{ name: '詳細', action: vi.fn() }] }]);
    const labels = buttons().map((button) => button.getAttribute('aria-label'));
    expect((fixture.nativeElement as HTMLElement).querySelector('[data-radial-ring]')).toBeTruthy();
    expect(buttonContaining('表示')).toBeTruthy();
    expect(buttonContaining('戻る')).toBeTruthy();
    expect(labels).not.toContain('南側から操作');
  });

  it('shows fixed snap boundaries and the resulting four panel directions', () => {
    createWithGroups([
      { name: 'North', icon: 'north', actions: [{ name: 'North action', action: vi.fn() }] },
      { name: 'East', icon: 'east', actions: [{ name: 'East action', action: vi.fn() }] },
      { name: 'South', icon: 'south', actions: [{ name: 'South action', action: vi.fn() }] },
      { name: 'West', icon: 'west', actions: [{ name: 'West action', action: vi.fn() }] },
    ]);

    const root = fixture.nativeElement as HTMLElement;
    const guide = root.querySelector<SVGElement>('[data-radial-direction-guide]')!;
    const boundaries = Array.from(guide.querySelectorAll<SVGLineElement>('[data-radial-guide-boundary]'));
    const directions = Array.from(guide.querySelectorAll<SVGGElement>('[data-radial-guide-direction]'));
    const radius = Number(guide.getAttribute('viewBox')?.split(' ')[2]) / 2;

    expect(boundaries).toHaveLength(4);
    expect(boundaries.every((line) => line.getAttribute('x1') === `${radius}`)).toBe(true);
    expect(boundaries.every((line) => line.getAttribute('y1') === `${radius}`)).toBe(true);
    expect(boundaries.every((line) => line.classList.contains('stroke-ui-accent'))).toBe(true);
    expect(boundaries.every((line) => line.getAttribute('stroke-dasharray') === '4 5')).toBe(true);
    expect(directions.map((direction) => Number(direction.dataset['panelRotation']))).toEqual([180, 270, 0, 90]);
  });

  it('masks the dotted boundaries where they pass behind a piece', () => {
    service.radialMenuOcclusionHalfExtent = 25;
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);

    const guide = (fixture.nativeElement as HTMLElement).querySelector<SVGElement>('[data-radial-direction-guide]')!;
    const occlusion = guide.querySelector<SVGRectElement>('[data-radial-guide-piece-occlusion]')!;
    const radius = Number(guide.getAttribute('viewBox')?.split(' ')[2]) / 2;

    expect(occlusion.getAttribute('x')).toBe(`${radius - 27}`);
    expect(occlusion.getAttribute('y')).toBe(`${radius - 27}`);
    expect(occlusion.getAttribute('width')).toBe('54');
    expect(occlusion.getAttribute('height')).toBe('54');
  });

  it('does not mask the guide center after a piece menu is dragged elsewhere', () => {
    service.radialMenuOcclusionHalfExtent = 25;
    service.radialAnchorPosition = { x: 120, y: 140 };
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);

    expect((fixture.nativeElement as HTMLElement).querySelector('[data-radial-guide-piece-occlusion]')).toBeNull();
  });

  it('closes the rotating menu from its return item at the top level', () => {
    const close = vi.spyOn(service, 'close').mockImplementation(() => undefined);
    createWithGroups([{ name: '表示', icon: 'visibility', actions: [{ name: '詳細', action: vi.fn() }] }]);

    const returnButton = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '[data-radial-return]'
    )!;
    expect(returnButton.getAttribute('aria-label')).toBe('閉じる');
    expect(returnButton.querySelector('.material-icons')?.textContent?.trim()).toBe('close');

    returnButton.click();

    expect(close).toHaveBeenCalledOnce();
  });

  it('uses the rotating display setting supplied immediately after component creation', () => {
    service.radialMenuEnabled = false;
    service.radialGroups = [{ name: '表示', icon: 'visibility', actions: [{ name: '詳細', action: vi.fn() }] }];
    fixture = TestBed.createComponent(FourWayRadialMenuComponent);
    service.radialMenuEnabled = true;
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('[data-radial-ring]')).toBeTruthy();
    expect(buttons().some((button) => button.getAttribute('aria-label') === '南側から操作')).toBe(false);
  });

  it('keeps the four direction launcher when radial display is disabled', () => {
    service.radialMenuEnabled = false;
    createWithGroups([]);
    const labels = buttons().map((button) => button.getAttribute('aria-label'));
    expect(labels).toEqual(['閉じる', '北側から操作', '東側から操作', '南側から操作', '西側から操作']);
    expect((fixture.nativeElement as HTMLElement).querySelector('[data-radial-ring]')).toBeNull();
    expect((fixture.nativeElement as HTMLElement).querySelector('[data-radial-direction-guide]')).toBeNull();
  });

  it('draws the connector from a detached piece anchor to the apparent menu center', () => {
    service.radialAnchorPosition = { x: 120, y: 140 };
    createWithGroups([]);

    const marker = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-piece-right-drag-center]')!;
    const connector = (fixture.nativeElement as HTMLElement).querySelector('line')!;
    expect(marker.classList.contains('piece-right-drag-center')).toBe(true);
    expect(marker.style.left).toBe('300px');
    expect(marker.style.top).toBe('300px');
    expect(connector.getAttribute('x1')).toBe('120');
    expect(connector.getAttribute('y1')).toBe('140');
    expect(connector.getAttribute('x2')).toBe('300');
    expect(connector.getAttribute('y2')).toBe('300');
  });

  it('extends the connector to the screen-corrected center when the dragged center is near an edge', () => {
    service.position = { x: 1, y: 1 };
    service.radialAnchorPosition = { x: 300, y: 300 };
    createWithGroups([]);

    const root = fixture.nativeElement as HTMLElement;
    const connector = root.querySelector('line')!;
    const marker = root.querySelector<HTMLElement>('[data-piece-right-drag-center]')!;
    expect(connector.getAttribute('x1')).toBe('300');
    expect(connector.getAttribute('y1')).toBe('300');
    expect(Number(connector.getAttribute('x2'))).toBeGreaterThan(1);
    expect(Number(connector.getAttribute('y2'))).toBeGreaterThan(1);
    expect(marker.style.left).toBe(`${connector.getAttribute('x2')}px`);
    expect(marker.style.top).toBe(`${connector.getAttribute('y2')}px`);
  });

  it('does not add the right-drag center marker to an ordinary piece menu', () => {
    createWithGroups([]);

    expect((fixture.nativeElement as HTMLElement).querySelector('[data-piece-right-drag-center]')).toBeNull();
  });

  it('moves direction launchers away from a large piece', () => {
    service.radialMenuEnabled = false;
    service.radialMenuClearanceRadius = 100;
    createWithGroups([]);

    const north = buttons().find((button) => button.getAttribute('aria-label') === '北側から操作');
    expect(north?.style.top).toBe('172px');
  });

  it('increases the rotating ring radius by the large-piece clearance', () => {
    service.radialMenuClearanceRadius = 100;
    createWithGroups([{ name: 'North', icon: 'north', actions: [{ name: 'Action', action: vi.fn() }] }]);

    expect(buttonContaining('North').style.top).toBe('-168px');
  });

  it('executes a single action using the clicked category direction', () => {
    const action = vi.fn();
    const close = vi.spyOn(service, 'close').mockImplementation(() => undefined);
    const runPanelWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    const runModalWithRotation = vi
      .spyOn(TestBed.inject(ModalService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: [{ name: '詳細を表示', action }] }]);

    buttonContaining('基本情報').click();

    expect(action).toHaveBeenCalledOnce();
    expect(runPanelWithRotation).toHaveBeenCalledWith(180, expect.any(Function));
    expect(runModalWithRotation).toHaveBeenCalledWith(180, action);
    expect(close).toHaveBeenCalledOnce();
  });

  it('uses the direction of the specific category that was clicked', () => {
    const eastAction = vi.fn();
    vi.spyOn(service, 'close').mockImplementation(() => undefined);
    const runWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    createWithGroups([
      { name: 'North', icon: 'north', actions: [{ name: 'North action', action: vi.fn() }] },
      { name: 'East', icon: 'east', actions: [{ name: 'East action', action: eastAction }] },
      { name: 'South', icon: 'south', actions: [{ name: 'South action', action: vi.fn() }] },
      { name: 'West', icon: 'west', actions: [{ name: 'West action', action: vi.fn() }] },
    ]);

    buttonContaining('East').click();

    expect(runWithRotation).toHaveBeenCalledWith(270, expect.any(Function));
  });

  it('combines the clicked item direction with the rotating ring direction', () => {
    const action = vi.fn();
    vi.spyOn(service, 'close').mockImplementation(() => undefined);
    const runWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: [{ name: '詳細を表示', action }] }]);
    const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]')!;
    ring.style.transform = 'matrix(0, 1, -1, 0, 0, 0)';

    buttonContaining('基本情報').click();

    expect(runWithRotation).toHaveBeenCalledWith(270, expect.any(Function));
  });

  it('rotates the ring slowly with each item facing outward', () => {
    createWithGroups([
      { name: 'North', icon: 'north', actions: [{ name: 'Action 1', action: vi.fn() }] },
      { name: 'East', icon: 'east', actions: [{ name: 'Action 2', action: vi.fn() }] },
      { name: 'South', icon: 'south', actions: [{ name: 'Action 3', action: vi.fn() }] },
      { name: 'West', icon: 'west', actions: [{ name: 'Action 4', action: vi.fn() }] },
    ]);
    const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]');
    expect(ring?.classList.contains('animate-radial-orbit')).toBe(true);
    expect(ring?.style.animationDuration).toBe('72s');
    expect(buttonContaining('North').classList.contains('rotating-menu-item')).toBe(true);
    expect(buttonContaining('North').style.transform).toBe('translate(-50%, -50%) rotate(180deg)');
    expect(buttonContaining('East').style.transform).toBe('translate(-50%, -50%) rotate(252deg)');
    expect(buttonContaining('South').style.transform).toBe('translate(-50%, -50%) rotate(324deg)');
    expect(buttonContaining('West').style.transform).toBe('translate(-50%, -50%) rotate(36deg)');
    expect(buttonContaining('戻る').style.transform).toBe('translate(-50%, -50%) rotate(108deg)');
  });

  it('uses the configured table rotation speed', () => {
    service.radialMenuRotationSpeed = 10;
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);

    const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]')!;
    expect(ring.style.animationDuration).toBe('36s');
  });

  it('allows rotation speeds up to twenty-four degrees per second', () => {
    service.radialMenuRotationSpeed = 99;
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);

    const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]')!;
    expect(ring.style.animationDuration).toBe('15s');
  });

  it('leaves the piece center clear without legacy controls', () => {
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[data-radial-center]')).toBeNull();
    expect(root.querySelector('[aria-label="時計回りに90度回転"]')).toBeNull();
    expect(root.querySelector('[aria-label="すべての項目を一覧表示"]')).toBeNull();
  });

  it('turns the existing rotating menu by one displayed item when it is right-clicked again', () => {
    const close = vi.spyOn(service, 'close').mockImplementation(() => undefined);
    createWithGroups([
      { name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] },
      { name: 'Object', icon: 'settings', actions: [{ name: 'Action', action: vi.fn() }] },
    ]);
    const root = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[role="dialog"]')!;
    const ring = root.querySelector<HTMLElement>('[data-radial-ring]')!;

    root.dispatchEvent(
      new MouseEvent('pointerdown', { button: 2, clientX: 300, clientY: 300, bubbles: true, cancelable: true })
    );
    root.dispatchEvent(
      new MouseEvent('contextmenu', { button: 2, clientX: 300, clientY: 300, bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    expect(close).not.toHaveBeenCalled();
    expect(ring.style.rotate).toBe('120deg');

    root.dispatchEvent(
      new MouseEvent('contextmenu', { button: 2, clientX: 300, clientY: 300, bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    expect(ring.style.rotate).toBe('240deg');

    root.dispatchEvent(
      new MouseEvent('contextmenu', { button: 2, clientX: 300, clientY: 300, bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    expect(ring.style.rotate).toBe('360deg');
    expect(ring.classList.contains('transition-[rotate]')).toBe(true);
    expect(ring.classList.contains('duration-180')).toBe(true);

    let reenableTransition: FrameRequestCallback | undefined;
    const requestAnimationFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => ((reenableTransition = callback), 1));
    ring.dispatchEvent(Object.assign(new Event('transitionend', { bubbles: true }), { propertyName: 'rotate' }));
    fixture.detectChanges();
    expect(ring.style.rotate).toBe('0deg');
    expect(ring.style.transition).toBe('none');

    reenableTransition?.(0);
    fixture.detectChanges();
    expect(ring.style.transition).toBe('');
    requestAnimationFrame.mockRestore();
  });

  it('completes an exact forward turn when the item angle is fractional', () => {
    const groups = Array.from({ length: 6 }, (_, index) => ({
      name: `Group ${index + 1}`,
      icon: 'category',
      actions: [{ name: 'Action', action: vi.fn() }],
    }));
    createWithGroups(groups);
    const root = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[role="dialog"]')!;
    const ring = root.querySelector<HTMLElement>('[data-radial-ring]')!;

    for (let index = 0; index < 7; index++) {
      root.dispatchEvent(new MouseEvent('contextmenu', { button: 2, bubbles: true, cancelable: true }));
    }
    fixture.detectChanges();

    expect(ring.style.rotate).toBe('360deg');
  });

  it('passes a right-clicked one-item turn to a panel opened from the menu', () => {
    const action = vi.fn();
    vi.spyOn(service, 'close').mockImplementation(() => undefined);
    const runWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    createWithGroups([
      { name: '基本情報', icon: 'badge', actions: [{ name: '詳細を表示', action }] },
      { name: '表示', icon: 'visibility', actions: [{ name: '表示設定', action: vi.fn() }] },
    ]);

    const root = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[role="dialog"]')!;
    root.dispatchEvent(new MouseEvent('contextmenu', { button: 2, bubbles: true, cancelable: true }));
    fixture.detectChanges();
    buttonContaining('基本情報').click();

    expect(runWithRotation).toHaveBeenCalledWith(270, expect.any(Function));
  });

  it('pauses while opening a submenu, inherits its direction, then resumes', () => {
    vi.useFakeTimers();
    try {
      createWithGroups([
        { name: 'North', icon: 'north', actions: [{ name: 'Action 1', action: vi.fn() }] },
        {
          name: 'East',
          icon: 'east',
          actions: [
            { name: 'Sub action 1', action: vi.fn() },
            { name: 'Sub action 2', action: vi.fn() },
          ],
        },
        { name: 'South', icon: 'south', actions: [{ name: 'Action 3', action: vi.fn() }] },
        { name: 'West', icon: 'west', actions: [{ name: 'Action 4', action: vi.fn() }] },
      ]);
      buttonContaining('East').click();
      fixture.detectChanges();

      const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]')!;
      expect(ring.style.animationPlayState).toBe('paused');
      expect(Number.parseFloat(buttonContaining('Sub action 1').style.left)).toBeCloseTo(131.25, 2);
      expect(Number.parseFloat(buttonContaining('Sub action 1').style.top)).toBeCloseTo(-42.64, 2);
      expect(buttonContaining('Sub action 1').style.transform).toBe('translate(-50%, -50%) rotate(252deg)');

      vi.advanceTimersByTime(180);
      fixture.detectChanges();
      expect(ring.style.animationPlayState).toBe('running');
    } finally {
      vi.useRealTimers();
    }
  });

  it('opens a category, follows a submenu and returns one level', () => {
    createWithGroups([
      {
        name: '表示',
        icon: 'visibility',
        actions: [
          { name: '高度設定', subActions: [{ name: '影を表示する', action: vi.fn() }] },
          { name: 'インベントリ非表示', action: vi.fn() },
        ],
      },
    ]);
    buttonContaining('表示').click();
    fixture.detectChanges();
    buttonContaining('高度設定').click();
    fixture.detectChanges();

    expect(buttonContaining('影を表示する')).toBeTruthy();
    const ringBack = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('[data-radial-return]')!;
    expect(ringBack.getAttribute('aria-label')).toBe('前の階層へ戻る');
    expect(ringBack.querySelector('.material-icons')?.textContent?.trim()).toBe('arrow_back');
    ringBack.click();
    fixture.detectChanges();
    expect(buttonContaining('高度設定')).toBeTruthy();
  });

  it('uses a page fraction until the final page, then restores the return item', () => {
    const actions = Array.from({ length: 15 }, (_, index) => ({
      name: `Action ${index + 1}`,
      action: vi.fn(),
    }));
    createWithGroups([{ name: '表示', icon: 'visibility', actions }]);

    buttonContaining('表示').click();
    fixture.detectChanges();

    const rotatingItems = (fixture.nativeElement as HTMLElement).querySelectorAll('.rotating-menu-item');
    expect(rotatingItems).toHaveLength(8);
    expect(buttonContaining('Action 7')).toBeTruthy();
    expect(buttons().some((button) => button.textContent?.includes('Action 8'))).toBe(false);
    expect(buttonContaining('1 / 3').getAttribute('aria-label')).toBe('次のページ');
    expect((fixture.nativeElement as HTMLElement).querySelector('[data-radial-return]')).toBeNull();

    buttonContaining('1 / 3').click();
    fixture.detectChanges();
    expect(buttonContaining('Action 8')).toBeTruthy();
    expect(buttonContaining('Action 14')).toBeTruthy();
    expect(buttonContaining('2 / 3')).toBeTruthy();

    buttonContaining('2 / 3').click();
    fixture.detectChanges();
    expect(buttonContaining('Action 15')).toBeTruthy();
    expect(buttonContaining('戻る')).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).querySelector('[data-radial-page-advance]')).toBeNull();
  });

  it.each([
    ['北側から操作', { x: 300, y: 230 }, 180],
    ['東側から操作', { x: 370, y: 300 }, 270],
    ['南側から操作', { x: 300, y: 370 }, 0],
    ['西側から操作', { x: 230, y: 300 }, 90],
  ] as const)('opens the legacy menu outside the piece from %s', (label, position, rotation) => {
    const open = vi.spyOn(service, 'openDirectional').mockImplementation(() => undefined);
    service.radialMenuEnabled = false;
    service.actions = [{ name: 'Complete action', action: vi.fn() }];
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: service.actions }]);

    chooseSeat(label);

    expect(open).toHaveBeenCalledWith(position, service.actions, rotation, 'Hero');
  });

  it('uses the large-piece clearance when placing the legacy menu', () => {
    const open = vi.spyOn(service, 'openDirectional').mockImplementation(() => undefined);
    service.radialMenuEnabled = false;
    service.radialMenuClearanceRadius = 100;
    service.actions = [{ name: 'Complete action', action: vi.fn() }];
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: service.actions }]);

    chooseSeat('北側から操作');

    expect(open).toHaveBeenCalledWith({ x: 300, y: 172 }, service.actions, 180, 'Hero');
  });
});
