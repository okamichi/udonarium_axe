import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { TRANSLATE_FN } from '@axe/application/i18n/translate.token';
import {
  ContextMenuAction,
  ContextMenuRadialGroup,
  ContextMenuService,
  ContextMenuType,
} from '@axe/application/ui/context-menu.service';
import { PanelRotationDegrees, PanelService } from '@axe/application/ui/panel.service';
import {
  DEFAULT_RADIAL_MENU_ROTATION_SPEED,
  MAX_RADIAL_MENU_ROTATION_SPEED,
  MIN_RADIAL_MENU_ROTATION_SPEED,
} from '@axe/domain/tabletop/game-table';
import {
  angleOnRing,
  clampRadialCenter,
  nearestCardinalRotation,
  outwardRotationOnRing,
  pointAtAngle,
  pointOnRing,
  RadialMenuSeat,
  radialPage,
  radialPageCount,
  RadialPoint,
  seatAngle,
  seatTextRotation,
} from '@axe/ui/components/four-way-radial-menu/four-way-radial-menu-geometry';
import { TranslocoModule } from '@jsverse/transloco';

interface RadialMenuLevel {
  title: string;
  actions: ContextMenuAction[];
}

const SEATS: RadialMenuSeat[] = ['north', 'east', 'south', 'west'];
const LAUNCHER_RADIUS_PX = 70;
const LAUNCHER_HALF_EXTENT_PX = 28;
const ITEM_HALF_EXTENT_PX = 60;
const RING_CLEARANCE_GAP_PX = 8;
const RING_LEVEL_TRANSITION_MS = 180;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'four-way-radial-menu',
  templateUrl: './four-way-radial-menu.component.html',
  imports: [TranslocoModule],
  host: {
    class: 'block',
    '(window:resize)': 'onResize()',
  },
})
export class FourWayRadialMenuComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly contextMenuService = inject(ContextMenuService);
  private readonly panelService = inject(PanelService);
  private readonly t = inject(TRANSLATE_FN);

  protected readonly seatOptions = SEATS;
  protected readonly selectedSeat = signal<RadialMenuSeat | null>(null);
  protected readonly levels = signal<RadialMenuLevel[]>([]);
  protected readonly page = signal(0);
  protected readonly ringStartAngle = signal(-90);
  protected readonly ringTransitioning = signal(false);
  protected readonly manualRotationDegrees = signal(0);
  private readonly viewport = signal({ width: window.innerWidth, height: window.innerHeight });
  private readonly actionRotationDegrees = signal<PanelRotationDegrees>(0);
  private ringResumeTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly radialGroups = computed(() =>
    this.contextMenuService.radialGroups.filter((group) => this.actionItems(group.actions).length > 0)
  );
  protected readonly currentLevel = computed(() => this.levels().at(-1) ?? null);
  protected readonly currentActions = computed(() => this.actionItems(this.currentLevel()?.actions ?? []));
  protected readonly pageCount = computed(() => radialPageCount(this.currentActions().length));
  protected readonly visibleActions = computed(() => radialPage(this.currentActions(), this.page()));
  protected readonly clearanceRadius = computed(() => {
    const radius = Number(this.contextMenuService.radialMenuClearanceRadius);
    return Number.isFinite(radius) ? Math.max(0, radius) : 0;
  });
  protected readonly launcherRadius = computed(() =>
    Math.max(LAUNCHER_RADIUS_PX, this.clearanceRadius() + LAUNCHER_HALF_EXTENT_PX)
  );
  protected readonly ringRadius = computed(() => {
    const shortestSide = Math.min(this.viewport().width, this.viewport().height);
    const baseRadius = Math.max(82, Math.min(138, shortestSide / 2 - ITEM_HALF_EXTENT_PX - 12));
    return Math.max(baseRadius, this.clearanceRadius() + ITEM_HALF_EXTENT_PX + RING_CLEARANCE_GAP_PX);
  });
  protected readonly center = computed(() =>
    clampRadialCenter(this.contextMenuService.position, this.viewport(), this.ringRadius() + ITEM_HALF_EXTENT_PX)
  );
  protected readonly connectorVisible = computed(() => {
    const center = this.center();
    const anchor = this.contextMenuService.position;
    return Math.hypot(center.x - anchor.x, center.y - anchor.y) > 4;
  });

  constructor() {
    afterNextRender(() => this.focusFirstControl());
  }

  protected get title(): string {
    return this.contextMenuService.title;
  }

  protected get anchor(): RadialPoint {
    return this.contextMenuService.position;
  }

  protected ringDurationSeconds(): number {
    const configured = Number(this.contextMenuService.radialMenuRotationSpeed);
    const speed = Number.isFinite(configured)
      ? Math.max(MIN_RADIAL_MENU_ROTATION_SPEED, Math.min(configured, MAX_RADIAL_MENU_ROTATION_SPEED))
      : DEFAULT_RADIAL_MENU_ROTATION_SPEED;
    return 360 / speed;
  }

  protected onResize(): void {
    this.viewport.set({ width: window.innerWidth, height: window.innerHeight });
  }

  protected close(): void {
    this.contextMenuService.close();
  }

  protected onBackdropPointerDown(event: Event): void {
    event.preventDefault();
    this.close();
  }

  protected onContextMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }
    if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) return;

    const controls = this.focusableControls();
    if (controls.length < 1) return;
    event.preventDefault();
    const current = controls.indexOf(document.activeElement as HTMLButtonElement);
    const delta = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    controls[(current + delta + controls.length) % controls.length]?.focus();
  }

  protected chooseSeat(seat: RadialMenuSeat): void {
    this.selectedSeat.set(seat);
    this.actionRotationDegrees.set(seatTextRotation(seat) as PanelRotationDegrees);
    this.levels.set([]);
    this.page.set(0);
    this.openFullMenu();
  }

  protected chooseGroup(group: ContextMenuRadialGroup, index: number): void {
    const actions = this.actionItems(group.actions);
    if (actions.length === 1 && actions[0]?.action && !actions[0].subActions?.length) {
      this.rememberItemDirection(index, this.radialGroups().length);
      this.runAction(actions[0]);
      return;
    }
    this.changeRingLevel(index, this.radialGroups().length, () => {
      this.levels.set([{ title: group.name, actions }]);
      this.page.set(0);
      this.focusFirstControlSoon();
    });
  }

  protected chooseAction(action: ContextMenuAction, index: number): void {
    if (!this.actionEnabled(action)) return;
    const subActions = this.actionItems(action.subActions ?? []);
    if (subActions.length > 0) {
      this.changeRingLevel(index, this.visibleActions().length, () => {
        this.levels.update((levels) => [...levels, { title: this.actionName(action), actions: subActions }]);
        this.page.set(0);
        this.focusFirstControlSoon();
      });
      return;
    }
    if (action.action) {
      this.rememberItemDirection(index, this.visibleActions().length);
      this.runAction(action);
    }
  }

  protected back(): void {
    const levels = this.levels();
    if (levels.length > 1) {
      this.levels.set(levels.slice(0, -1));
    } else {
      this.levels.set([]);
    }
    this.page.set(0);
    this.focusFirstControlSoon();
  }

  protected openFullMenu(): void {
    if (this.contextMenuService.radialMenuEnabled) this.rememberCenterDirection();
    this.contextMenuService.openDirectional(
      this.contextMenuService.position,
      this.contextMenuService.actions,
      this.selectedRotationDegrees(),
      this.contextMenuService.title
    );
  }

  protected previousPage(): void {
    this.page.update((page) => Math.max(0, page - 1));
    this.focusFirstControlSoon();
  }

  protected nextPage(): void {
    this.page.update((page) => Math.min(this.pageCount() - 1, page + 1));
    this.focusFirstControlSoon();
  }

  protected rotateMenuQuarterTurn(): void {
    this.manualRotationDegrees.update((degrees) => (degrees + 90) % 360);
  }

  protected launcherPoint(seat: RadialMenuSeat): RadialPoint {
    return pointAtAngle(seatAngle(seat), this.launcherRadius());
  }

  protected groupPoint(index: number): RadialPoint {
    return pointOnRing(index, this.radialGroups().length, this.ringRadius(), this.ringStartAngle());
  }

  protected actionPoint(index: number): RadialPoint {
    return pointOnRing(index, this.visibleActions().length, this.ringRadius(), this.ringStartAngle());
  }

  protected facingTransform(): string {
    const seat = this.selectedSeat();
    return seat ? `translate(-50%, -50%) rotate(${seatTextRotation(seat)}deg)` : 'translate(-50%, -50%)';
  }

  protected itemTransform(index: number, count: number): string {
    return `translate(-50%, -50%) rotate(${outwardRotationOnRing(index, count, this.ringStartAngle())}deg)`;
  }

  protected launcherTransform(seat: RadialMenuSeat): string {
    return `translate(-50%, -50%) rotate(${seatTextRotation(seat)}deg)`;
  }

  protected seatLabel(seat: RadialMenuSeat): string {
    return this.t(`ui.contextMenu.radial.seat${seat.charAt(0).toUpperCase()}${seat.slice(1)}`);
  }

  protected actionName(action: ContextMenuAction): string {
    return action.name.replace(/^[☑☐◉○✔]\s*/, '');
  }

  protected actionEnabled(action: ContextMenuAction): boolean {
    return action.enabled !== false;
  }

  private actionItems(actions: ContextMenuAction[]): ContextMenuAction[] {
    return actions.filter((action) => action.type !== ContextMenuType.SEPARATOR && action.name.length > 0);
  }

  private runAction(action: ContextMenuAction): void {
    if (!this.actionEnabled(action) || !action.action) return;
    this.panelService.runWithInitialRotation(this.selectedRotationDegrees(), action.action);
    this.close();
  }

  private selectedRotationDegrees(): PanelRotationDegrees {
    return this.actionRotationDegrees();
  }

  private rememberCenterDirection(): void {
    const centerRotation = this.selectedSeat() ? seatTextRotation(this.selectedSeat()!) : 0;
    this.actionRotationDegrees.set(
      nearestCardinalRotation(centerRotation + this.currentRingRotationDegrees() + this.manualRotationDegrees())
    );
  }

  private rememberItemDirection(index: number, count: number): void {
    const itemRotation = outwardRotationOnRing(index, count, this.ringStartAngle());
    this.actionRotationDegrees.set(
      nearestCardinalRotation(itemRotation + this.currentRingRotationDegrees() + this.manualRotationDegrees())
    );
  }

  private currentRingRotationDegrees(): number {
    const ring = this.elementRef.nativeElement.querySelector<HTMLElement>('[data-radial-ring]');
    if (!ring) return 0;
    const transform = getComputedStyle(ring).transform;
    if (!transform || transform === 'none') return 0;

    const matrix2d = transform.match(/^matrix\(([^)]+)\)$/);
    const matrix3d = transform.match(/^matrix3d\(([^)]+)\)$/);
    const values = (matrix2d?.[1] ?? matrix3d?.[1])?.split(',').map(Number);
    if (!values || values.length < 2 || values.some((value) => !Number.isFinite(value))) return 0;
    return (Math.atan2(values[1]!, values[0]!) * 180) / Math.PI;
  }

  private changeRingLevel(index: number, count: number, changeLevel: () => void): void {
    this.ringTransitioning.set(true);
    this.ringStartAngle.set(angleOnRing(index, count, this.ringStartAngle()));
    changeLevel();
    if (this.ringResumeTimer) clearTimeout(this.ringResumeTimer);
    this.ringResumeTimer = setTimeout(() => {
      this.ringTransitioning.set(false);
      this.ringResumeTimer = null;
    }, RING_LEVEL_TRANSITION_MS);
  }

  private focusFirstControlSoon(): void {
    setTimeout(() => this.focusFirstControl());
  }

  private focusFirstControl(): void {
    this.focusableControls()[0]?.focus();
  }

  private focusableControls(): HTMLButtonElement[] {
    return Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLButtonElement>('button[data-radial-control]:not([disabled])')
    );
  }
}
