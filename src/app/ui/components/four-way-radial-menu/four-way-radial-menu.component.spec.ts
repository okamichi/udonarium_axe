import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuAction, ContextMenuService } from '@axe/application/ui/context-menu.service';
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
    service.rotationDegrees = 0;
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
    expect(labels).not.toContain('南側から操作');
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
  });

  it('executes a single action directly from its category', () => {
    const action = vi.fn();
    const close = vi.spyOn(service, 'close').mockImplementation(() => undefined);
    const runWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: [{ name: '詳細を表示', action }] }]);

    buttonContaining('基本情報').click();

    expect(action).toHaveBeenCalledOnce();
    expect(runWithRotation).toHaveBeenCalledWith(0, action);
    expect(close).toHaveBeenCalledOnce();
  });

  it('passes the rotating center direction to an opened panel', () => {
    const action = vi.fn();
    vi.spyOn(service, 'close').mockImplementation(() => undefined);
    const runWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: [{ name: '詳細を表示', action }] }]);
    const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]')!;
    ring.style.transform = 'matrix(0, 1, -1, 0, 0, 0)';

    buttonContaining('基本情報').click();

    expect(runWithRotation).toHaveBeenCalledWith(90, action);
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
    expect(buttonContaining('East').style.transform).toBe('translate(-50%, -50%) rotate(270deg)');
    expect(buttonContaining('South').style.transform).toBe('translate(-50%, -50%) rotate(0deg)');
    expect(buttonContaining('West').style.transform).toBe('translate(-50%, -50%) rotate(90deg)');
  });

  it('uses the configured table rotation speed', () => {
    service.radialMenuRotationSpeed = 10;
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);

    const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]')!;
    expect(ring.style.animationDuration).toBe('36s');
  });

  it('rotates the title and center controls with the outer items', () => {
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);

    const root = fixture.nativeElement as HTMLElement;
    const ring = root.querySelector<HTMLElement>('[data-radial-ring]')!;
    const center = root.querySelector<HTMLElement>('[data-radial-center]')!;

    expect(ring.contains(center)).toBe(true);
    expect(center.textContent).toContain('Hero');
    expect(center.querySelector('[aria-label="時計回りに90度回転"]')).toBeTruthy();
    expect(center.querySelector('[aria-label="すべての項目を一覧表示"]')).toBeTruthy();
    expect(center.querySelector('[aria-label="閉じる"]')).toBeTruthy();
  });

  it('turns the complete rotating menu 90 degrees from its center', () => {
    createWithGroups([{ name: 'Display', icon: 'visibility', actions: [{ name: 'Action', action: vi.fn() }] }]);
    const ring = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[data-radial-ring]')!;
    const rotate = buttons().find((button) => button.getAttribute('aria-label') === '時計回りに90度回転')!;

    rotate.click();
    fixture.detectChanges();
    expect(ring.style.rotate).toBe('90deg');

    rotate.click();
    fixture.detectChanges();
    expect(ring.style.rotate).toBe('180deg');
  });

  it('passes a manual quarter turn to a panel opened from the menu', () => {
    const action = vi.fn();
    vi.spyOn(service, 'close').mockImplementation(() => undefined);
    const runWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: [{ name: '詳細を表示', action }] }]);

    buttons()
      .find((button) => button.getAttribute('aria-label') === '時計回りに90度回転')!
      .click();
    fixture.detectChanges();
    buttonContaining('基本情報').click();

    expect(runWithRotation).toHaveBeenCalledWith(90, action);
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
      expect(buttonContaining('Sub action 1').style.left).toBe('138px');
      expect(buttonContaining('Sub action 1').style.top).toBe('0px');
      expect(buttonContaining('Sub action 1').style.transform).toBe('translate(-50%, -50%) rotate(270deg)');

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
    const back = buttons().find((button) => button.getAttribute('aria-label') === '前の階層へ戻る');
    back!.click();
    fixture.detectChanges();
    expect(buttonContaining('高度設定')).toBeTruthy();
  });

  it('can switch to the complete legacy menu', () => {
    const open = vi.spyOn(service, 'openDirectional').mockImplementation(() => undefined);
    service.actions = [{ name: 'Complete action', action: vi.fn() }];
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: service.actions }]);

    const fullMenu = buttons().find((button) => button.getAttribute('aria-label') === 'すべての項目を一覧表示');
    fullMenu!.click();

    expect(open).toHaveBeenCalledWith(service.position, service.actions, 0, 'Hero');
  });

  it('opens the legacy menu in the selected direction when radial display is disabled', () => {
    const open = vi.spyOn(service, 'openDirectional').mockImplementation(() => undefined);
    service.radialMenuEnabled = false;
    service.actions = [{ name: 'Complete action', action: vi.fn() }];
    createWithGroups([{ name: '基本情報', icon: 'badge', actions: service.actions }]);

    chooseSeat('北側から操作');

    expect(open).toHaveBeenCalledWith(service.position, service.actions, 180, 'Hero');
  });
});
