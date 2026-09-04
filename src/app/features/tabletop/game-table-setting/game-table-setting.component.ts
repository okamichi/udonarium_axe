import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SaveDataService } from '@axe/application/file/save-data.service';
import { TRANSLATE_FN } from '@axe/application/i18n/translate.token';
import { CutInService } from '@axe/application/media/cut-in.service';
import { RolePermissionService } from '@axe/application/permission/role-permission.service';
import { ImageService } from '@axe/application/storage/image.service';
import { ObjectChangeService } from '@axe/application/sync/object-change.service';
import { VisionService } from '@axe/application/tabletop/vision.service';
import { DisplayCalibrationService } from '@axe/application/ui/display-calibration.service';
import { ModalService } from '@axe/application/ui/modal.service';
import { PanelService } from '@axe/application/ui/panel.service';
import { ViewLockService } from '@axe/application/ui/view-lock.service';
import { ViewportService } from '@axe/application/ui/viewport.service';
import { emitSelectGameTable, triggerUpdateGameObject } from '@axe/core/event/domain-events';
import { ImageFile } from '@axe/core/storage/image-file';
import { ObjectSerializer } from '@axe/core/sync/object-serializer';
import { ObjectStore } from '@axe/core/sync/object-store';
import { DiceBot } from '@axe/domain/dice/dice-bot';
import {
  ambienceColorOf,
  ambienceDensityOf,
  type AmbienceKind,
  ambienceKindOf,
  ambiencePalette,
  DEFAULT_AMBIENCE_DENSITY,
  SKY_AMBIENCE_KINDS,
} from '@axe/domain/effect/ambience/ambience-kind';
import { CutIn } from '@axe/domain/media/cut-in';
import { encodeCutInIdentifiers, parseCutInIdentifiers } from '@axe/domain/media/table-cut-in';
import { Config } from '@axe/domain/peer/config';
import { PeerCursor } from '@axe/domain/peer/peer-cursor';
import { CELL_DISTANCE_UNITS, CellDistanceUnit } from '@axe/domain/tabletop/cell-distance';
import {
  asCutInMultiDirectionMode,
  CUT_IN_MULTI_DIRECTION_MODES,
  CutInMultiDirectionMode,
} from '@axe/domain/tabletop/cut-in-multi-direction';
import { ensureFogMemoryOn } from '@axe/domain/tabletop/fog/fog-memory';
import { asFogMode, DEFAULT_FOG_COLOR, FOG_MODES, FogMode } from '@axe/domain/tabletop/fog/fog-mode';
import {
  DEFAULT_RADIAL_MENU_ROTATION_SPEED,
  FilterType,
  GameTable,
  GridSnapStyle,
  GridType,
  MAX_RADIAL_MENU_ROTATION_SPEED,
  MIN_RADIAL_MENU_ROTATION_SPEED,
} from '@axe/domain/tabletop/game-table';
import {
  asHoverDetailPlacement,
  HOVER_DETAIL_PLACEMENTS,
  HoverDetailPlacement,
} from '@axe/domain/tabletop/hover-detail-placement';
import {
  DEFAULT_MULTI_ANGLE_PAUSE_SECONDS,
  DEFAULT_MULTI_ANGLE_PIECE_REVOLUTION_SECONDS,
  DEFAULT_MULTI_ANGLE_REVOLUTION_SECONDS,
  MultiAngleMotionMode,
} from '@axe/domain/tabletop/multi-angle';
import {
  asMultiAngleFontScale,
  MULTI_ANGLE_FONT_SCALES,
  MultiAngleFontScale,
} from '@axe/domain/tabletop/multi-angle-font-scale';
import { cellWidthInches, clampCellMm, DEFAULT_CELL_MM } from '@axe/domain/tabletop/physical-scale';
import { asTableFacingMark, TABLE_FACING_MARKS, TableFacingMark } from '@axe/domain/tabletop/table-facing-mark';
import { TableSelecter } from '@axe/domain/tabletop/table-selecter';
import { DisplayCalibrationComponent } from '@axe/features/tabletop/display-calibration/display-calibration.component';
import {
  MapImageGridAdjusterComponent,
  MapImageGridAdjusterResult,
} from '@axe/features/tabletop/map-image-grid-adjuster/map-image-grid-adjuster.component';
import { FileSelecterComponent } from '@axe/ui/components/file-selecter/file-selecter.component';
import { SafePipe } from '@axe/ui/pipes/safe.pipe';
import { TranslocoModule } from '@jsverse/transloco';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'game-table-setting',
  templateUrl: './game-table-setting.component.html',
  host: { class: 'block', '[attr.inert]': "isReadOnly() ? '' : null" },
  imports: [NgClass, FormsModule, NgSelectComponent, NgOptionComponent, SafePipe, TranslocoModule],
})
export class GameTableSettingComponent {
  protected readonly isCompact = inject(ViewportService).isCompact;
  private readonly rolePermission = inject(RolePermissionService);
  private readonly t = inject(TRANSLATE_FN);

  readonly isReadOnly = computed(() => {
    this.objectChange.trackMyCursor();
    return !this.rolePermission.canEditTabletop;
  });
  private readonly modalService = inject(ModalService);
  private readonly displayCalibration = inject(DisplayCalibrationService);
  private readonly viewLock = inject(ViewLockService);
  private readonly saveDataService = inject(SaveDataService);
  private readonly imageService = inject(ImageService);
  private readonly panelService = inject(PanelService);
  private readonly objectStore = inject(ObjectStore);
  private readonly objectSerializer = inject(ObjectSerializer);
  private readonly tableSelecter = inject(TableSelecter);
  private readonly objectChange = inject(ObjectChangeService);
  private readonly visionService = inject(VisionService);
  private readonly cutInService = inject(CutInService);
  private readonly destroyRef = inject(DestroyRef);

  get gameType(): string {
    return this.config.defaultDiceBot;
  }
  set gameType(gameType: string) {
    this.config.defaultDiceBot = gameType;
  }
  loadDiceBot(gameType: string) {
    DiceBot.getHelpMessage(gameType).then(() => {});
  }

  get config(): Config {
    return this.objectStore.get<Config>('Config')!;
  }

  minSize: number = 1;
  maxSize: number = 100;

  get diceBotInfos() {
    return DiceBot.diceBotInfos;
  }

  get tableBackgroundImage(): ImageFile {
    this.objectChange.fileVersion();
    if (this.selectedTable) this.objectChange.versionOf(this.selectedTable.identifier)();
    return this.imageService.getEmptyOr(this.selectedTable ? this.selectedTable.imageIdentifier : '');
  }

  get tableDistanceviewImage(): ImageFile {
    this.objectChange.fileVersion();
    if (this.selectedTable) this.objectChange.versionOf(this.selectedTable.identifier)();
    return this.imageService.getEmptyOr(this.selectedTable ? this.selectedTable.backgroundImageIdentifier : '');
  }

  get tableName(): string {
    return this.selectedTable?.name ?? '';
  }
  set tableName(tableName: string) {
    if (this.isEditable && this.selectedTable) this.selectedTable.name = tableName;
  }

  get tableWidth(): number {
    return this.selectedTable?.width ?? 10;
  }
  set tableWidth(tableWidth: number) {
    if (this.isEditable && this.selectedTable) this.selectedTable.width = tableWidth;
  }

  get tableHeight(): number {
    return this.selectedTable?.height ?? 10;
  }
  set tableHeight(tableHeight: number) {
    if (this.isEditable && this.selectedTable) this.selectedTable.height = tableHeight;
  }

  get tableGridColor(): string {
    return this.selectedTable?.gridColor.substring(0, 7) ?? '#000000';
  }
  set tableGridColor(tableGridColor: string) {
    if (this.isEditable && this.selectedTable) this.selectedTable.gridColor = tableGridColor + 'e6';
  }

  get tableGridFontColor(): string {
    return this.selectedTable?.gridFontColor.substring(0, 7) ?? '#000000';
  }
  set tableGridFontColor(tableGridFontColor: string) {
    if (this.isEditable && this.selectedTable) this.selectedTable.gridFontColor = tableGridFontColor + 'e6';
  }

  get tableGridShow(): boolean {
    return this.selectedTable?.gridShow ?? false;
  }
  set tableGridShow(tableGridShow: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.gridShow = tableGridShow;
    if (tableGridShow) this.selectedTable.gridClipRect = null;
    triggerUpdateGameObject(this.selectedTable.toContext()); // 自分にだけイベントを発行してグリッド更新を誘発
  }

  get tableGridSnap(): boolean {
    return this.selectedTable?.gridSnap ?? true;
  }
  set tableGridSnap(tableGridSnap: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.gridSnap = tableGridSnap;
  }

  get tableImageBillboard(): boolean {
    return this.selectedTable?.imageBillboard ?? false;
  }
  set tableImageBillboard(value: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.imageBillboard = value;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableMode2d(): boolean {
    return this.selectedTable?.mode2d ?? false;
  }
  set tableMode2d(value: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.mode2d = value;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableOrthographicProjection(): boolean {
    return this.selectedTable?.orthographicProjection ?? false;
  }
  set tableOrthographicProjection(value: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.orthographicProjection = value;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableTerrainRotationIn2dEnabled(): boolean {
    return this.selectedTable?.terrainRotationIn2dEnabled ?? false;
  }
  set tableTerrainRotationIn2dEnabled(value: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.terrainRotationIn2dEnabled = value;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  readonly cutInMultiDirectionModes = CUT_IN_MULTI_DIRECTION_MODES;

  get tableCutInMultiDirectionMode(): CutInMultiDirectionMode {
    return asCutInMultiDirectionMode(this.selectedTable?.cutInMultiDirectionMode);
  }
  set tableCutInMultiDirectionMode(value: CutInMultiDirectionMode) {
    if (!this.selectedTable) return;
    this.selectedTable.cutInMultiDirectionMode = asCutInMultiDirectionMode(value);
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  readonly hoverDetailPlacements = HOVER_DETAIL_PLACEMENTS;

  get tableHoverDetailPlacement(): HoverDetailPlacement {
    return asHoverDetailPlacement(this.selectedTable?.hoverDetailPlacement);
  }
  set tableHoverDetailPlacement(value: HoverDetailPlacement) {
    if (!this.selectedTable) return;
    this.selectedTable.hoverDetailPlacement = asHoverDetailPlacement(value);
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  readonly multiAngleFontScales = MULTI_ANGLE_FONT_SCALES;

  get tableMultiAngleFontScale(): MultiAngleFontScale {
    return asMultiAngleFontScale(this.selectedTable?.multiAngleFontScale);
  }
  set tableMultiAngleFontScale(value: MultiAngleFontScale) {
    if (!this.selectedTable) return;
    this.selectedTable.multiAngleFontScale = asMultiAngleFontScale(value);
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  /**
   * Real size belongs to the screen rather than to the room, so it sits here without being
   * saved with the table: the display under the miniatures is calibrated, the laptops are not.
   */
  readonly isCalibrated = this.displayCalibration.isCalibrated;
  readonly calibrationDpi = this.displayCalibration.dpi;
  readonly needsRecalibration = this.displayCalibration.needsRecalibration;

  /** The same lock the two 2D menus carry, so either way in shows the other's state. */
  get viewLocked(): boolean {
    return this.viewLock.locked();
  }
  set viewLocked(value: boolean) {
    this.viewLock.set(value);
  }

  get realSizeEnabled(): boolean {
    return this.displayCalibration.realSizeEnabled();
  }
  set realSizeEnabled(value: boolean) {
    // Real size means nothing until the screen has been measured, so asking for it asks for that.
    if (value && !this.displayCalibration.isCalibrated()) {
      this.openCalibration();
      return;
    }
    this.displayCalibration.setRealSizeEnabled(value);
  }

  /** The width of a square belongs to the map, so it is kept on the table with the grid size. */
  get cellMm(): number {
    return clampCellMm(this.selectedTable?.cellMm ?? DEFAULT_CELL_MM);
  }
  set cellMm(value: number) {
    if (!this.selectedTable) return;
    this.selectedTable.cellMm = clampCellMm(value);
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  readonly cellDistanceUnits = CELL_DISTANCE_UNITS;

  /** The rule the table counts by, which the room never sees; see {@link DisplayCalibrationService}. */
  get cellDistanceValue(): number {
    return this.displayCalibration.distanceValue();
  }
  set cellDistanceValue(value: number) {
    this.displayCalibration.setDistance(value, this.displayCalibration.distanceUnit());
  }

  get cellDistanceUnit(): CellDistanceUnit {
    return this.displayCalibration.distanceUnit();
  }
  set cellDistanceUnit(value: CellDistanceUnit) {
    this.displayCalibration.setDistance(this.displayCalibration.distanceValue(), value);
  }

  /** What a square comes to on this screen, read at a glance rather than worked out. */
  readonly cellSummary = computed(() => {
    this.objectChange.versionOf(this.selectedTable?.identifier ?? '')();
    const mm = clampCellMm(this.selectedTable?.cellMm ?? DEFAULT_CELL_MM);
    return {
      mm: round1(mm),
      inches: round2(cellWidthInches(mm)),
      distance: this.displayCalibration.distanceValue(),
      unit: this.displayCalibration.distanceUnit(),
    };
  });

  openCalibration(): void {
    // Without this the shell holds a fixed 800px and clips the frame the card is matched against.
    void this.modalService.open(DisplayCalibrationComponent, { fitWidth: true });
  }

  nudgeScale(steps: number): void {
    this.displayCalibration.nudge(steps);
  }

  /** Back to an unmeasured screen. The width of a square stays, since the map still asks for it. */
  resetCalibration(): void {
    this.displayCalibration.reset();
  }

  get tableRadialMenuEnabled(): boolean {
    return this.selectedTable?.radialMenuEnabled ?? false;
  }
  set tableRadialMenuEnabled(value: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.radialMenuEnabled = value;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableRadialMenuRotationSpeed(): number {
    const configured = Number(this.selectedTable?.radialMenuRotationSpeed);
    if (!Number.isFinite(configured)) return DEFAULT_RADIAL_MENU_ROTATION_SPEED;
    return Math.max(MIN_RADIAL_MENU_ROTATION_SPEED, Math.min(Math.round(configured), MAX_RADIAL_MENU_ROTATION_SPEED));
  }
  set tableRadialMenuRotationSpeed(value: number) {
    if (!this.selectedTable) return;
    const configured = Number(value);
    this.selectedTable.radialMenuRotationSpeed = Number.isFinite(configured)
      ? Math.max(MIN_RADIAL_MENU_ROTATION_SPEED, Math.min(Math.round(configured), MAX_RADIAL_MENU_ROTATION_SPEED))
      : DEFAULT_RADIAL_MENU_ROTATION_SPEED;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableMultiAngleEnabled(): boolean {
    return this.selectedTable?.multiAngleEnabled ?? false;
  }
  set tableMultiAngleEnabled(value: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.multiAngleEnabled = value;
    if (value && asTableFacingMark(this.selectedTable.facingMark) === 'turn') {
      this.selectedTable.facingMark = 'none';
    }
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableMultiAngleResourceBuffEnabled(): boolean {
    return this.selectedTable?.multiAngleResourceBuffEnabled ?? false;
  }
  set tableMultiAngleResourceBuffEnabled(value: boolean) {
    if (!this.selectedTable) return;
    this.selectedTable.multiAngleResourceBuffEnabled = value;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableMultiAngleMotionMode(): MultiAngleMotionMode {
    const mode = this.selectedTable?.multiAngleMotionMode;
    return mode === 'quarter-turn' || mode === 'piece-quarter-turn' ? mode : 'continuous';
  }
  set tableMultiAngleMotionMode(value: MultiAngleMotionMode) {
    if (!this.selectedTable) return;
    const motionMode = value === 'quarter-turn' || value === 'piece-quarter-turn' ? value : 'continuous';
    this.selectedTable.multiAngleMotionMode = motionMode;
    this.selectedTable.multiAnglePieceRevolutionSeconds =
      motionMode === 'continuous' ? DEFAULT_MULTI_ANGLE_PIECE_REVOLUTION_SECONDS : 5;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableMultiAngleRevolutionSeconds(): number {
    return this.selectedTable?.multiAngleRevolutionSeconds ?? DEFAULT_MULTI_ANGLE_REVOLUTION_SECONDS;
  }
  set tableMultiAngleRevolutionSeconds(value: number) {
    if (!this.selectedTable) return;
    const number = Number(value);
    this.selectedTable.multiAngleRevolutionSeconds = Number.isFinite(number)
      ? Math.min(120, Math.max(1, number))
      : DEFAULT_MULTI_ANGLE_REVOLUTION_SECONDS;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableMultiAnglePauseSeconds(): number {
    return this.selectedTable?.multiAnglePauseSeconds ?? DEFAULT_MULTI_ANGLE_PAUSE_SECONDS;
  }
  set tableMultiAnglePauseSeconds(value: number) {
    if (!this.selectedTable) return;
    const number = Number(value);
    this.selectedTable.multiAnglePauseSeconds = Number.isFinite(number)
      ? Math.min(30, Math.max(0, number))
      : DEFAULT_MULTI_ANGLE_PAUSE_SECONDS;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableMultiAnglePieceRevolutionSeconds(): number {
    return this.selectedTable?.multiAnglePieceRevolutionSeconds ?? DEFAULT_MULTI_ANGLE_PIECE_REVOLUTION_SECONDS;
  }
  set tableMultiAnglePieceRevolutionSeconds(value: number) {
    if (!this.selectedTable) return;
    const number = Number(value);
    this.selectedTable.multiAnglePieceRevolutionSeconds = Number.isFinite(number)
      ? Math.min(300, Math.max(5, number))
      : DEFAULT_MULTI_ANGLE_PIECE_REVOLUTION_SECONDS;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  readonly facingMarks = TABLE_FACING_MARKS;

  get tableFacingMark(): TableFacingMark {
    return asTableFacingMark(this.selectedTable?.facingMark);
  }
  set tableFacingMark(value: TableFacingMark) {
    if (!this.selectedTable) return;
    const facingMark = asTableFacingMark(value);
    this.selectedTable.facingMark = facingMark;
    if (facingMark === 'turn') this.selectedTable.multiAngleEnabled = false;
    triggerUpdateGameObject(this.selectedTable.toContext());
  }

  get tableDarknessEnabled(): boolean {
    return this.selectedTable?.darknessEnabled ?? false;
  }
  set tableDarknessEnabled(value: boolean) {
    if (this.isEditable && this.selectedTable) this.selectedTable.darknessEnabled = value;
  }

  get tableLightSnapToGrid(): boolean {
    return this.selectedTable?.lightSnapToGrid ?? false;
  }
  set tableLightSnapToGrid(value: boolean) {
    if (this.isEditable && this.selectedTable) this.selectedTable.lightSnapToGrid = value;
  }

  get tableDarknessLevelPercent(): number {
    return Math.round((this.selectedTable?.darknessLevel ?? 0) * 100);
  }
  set tableDarknessLevelPercent(value: number) {
    if (this.isEditable && this.selectedTable) this.selectedTable.darknessLevel = Number(value) / 100;
  }

  get tableGlobalIlluminationPercent(): number {
    return Math.round((this.selectedTable?.globalIllumination ?? 0) * 100);
  }
  set tableGlobalIlluminationPercent(value: number) {
    if (this.isEditable && this.selectedTable) this.selectedTable.globalIllumination = Number(value) / 100;
  }

  get tableAmbientColor(): string {
    return this.selectedTable?.ambientColor ?? '#05060a';
  }
  set tableAmbientColor(value: string) {
    if (this.isEditable && this.selectedTable) this.selectedTable.ambientColor = value;
  }

  get tableFogEnabled(): boolean {
    return this.selectedTable?.fogEnabled ?? false;
  }
  set tableFogEnabled(value: boolean) {
    if (this.isEditable && this.selectedTable) this.selectedTable.fogEnabled = value;
  }

  get tableFogMode(): FogMode {
    return asFogMode(this.selectedTable?.fogMode);
  }
  set tableFogMode(value: FogMode) {
    if (this.isEditable && this.selectedTable) this.selectedTable.fogMode = asFogMode(value);
  }

  get tableFogColor(): string {
    return this.selectedTable?.fogColor ?? DEFAULT_FOG_COLOR;
  }
  set tableFogColor(value: string) {
    if (this.isEditable && this.selectedTable) this.selectedTable.fogColor = value;
  }

  protected readonly fogModes = FOG_MODES;

  private readonly fogModeLabelKeys: Record<FogMode, string> = {
    easy: 'feature.tabletop.tableSetting.fogModeEasy',
    normal: 'feature.tabletop.tableSetting.fogModeNormal',
    hard: 'feature.tabletop.tableSetting.fogModeHard',
  };

  fogModeLabel(mode: FogMode): string {
    return this.t(this.fogModeLabelKeys[mode]);
  }

  resetFog(): void {
    const table = this.selectedTable;
    if (!this.isEditable || !table) return;
    ensureFogMemoryOn(table).reset();
  }

  protected readonly weatherKinds = SKY_AMBIENCE_KINDS;

  weatherKindLabel(kind: AmbienceKind): string {
    return this.t(`feature.ambience.kind.${kind}`);
  }

  get tableWeatherKind(): string {
    return this.selectedTable?.weatherKind ?? '';
  }
  set tableWeatherKind(value: string) {
    if (this.isEditable && this.selectedTable) this.selectedTable.weatherKind = value;
  }

  get tableWeatherDensityPercent(): number {
    return Math.round(ambienceDensityOf(this.selectedTable?.weatherDensity ?? DEFAULT_AMBIENCE_DENSITY) * 100);
  }
  set tableWeatherDensityPercent(value: number) {
    if (this.isEditable && this.selectedTable) this.selectedTable.weatherDensity = Number(value) / 100;
  }

  get tableWeatherColor(): string {
    const table = this.selectedTable;
    if (!table) return ambiencePalette('fog').primary;
    return ambienceColorOf(ambienceKindOf(table.weatherKind), table.weatherColor);
  }
  set tableWeatherColor(value: string) {
    if (this.isEditable && this.selectedTable) this.selectedTable.weatherColor = value;
  }

  get isWeatherDefaultColor(): boolean {
    return (this.selectedTable?.weatherColor ?? '').trim().length < 1;
  }

  resetWeatherColor(): void {
    if (this.isEditable && this.selectedTable) this.selectedTable.weatherColor = '';
  }

  get isGameMaster(): boolean {
    this.objectChange.trackMyCursor();
    return PeerCursor.isMyselfGameMaster;
  }

  get previewAsUserId(): string {
    return this.visionService.previewAsUserId() ?? '';
  }
  set previewAsUserId(value: string) {
    this.visionService.previewAsUserId.set(value ? value : null);
  }

  getNonGmCursors(): PeerCursor[] {
    this.objectChange.collectionOf('PeerCursor')();
    return this.objectStore.getObjects<PeerCursor>(PeerCursor).filter((cursor) => !cursor.isGameMaster);
  }

  minWallHeight: number = 1;
  maxWallHeight: number = 20;

  readonly wallFields = [
    {
      key: 'north',
      label: 'feature.tabletop.tableSetting.imageNorthWall',
      alt: 'feature.tabletop.tableSetting.imageNorthWallAlt',
      add: 'feature.tabletop.tableSetting.addImageNorthWall',
      image: () => this.tableNorthWallImage,
      show: () => this.tableShowNorthWall,
      setShow: (value: boolean) => (this.tableShowNorthWall = value),
      open: () => this.openNorthWallImageModal(),
    },
    {
      key: 'east',
      label: 'feature.tabletop.tableSetting.imageEastWall',
      alt: 'feature.tabletop.tableSetting.imageEastWallAlt',
      add: 'feature.tabletop.tableSetting.addImageEastWall',
      image: () => this.tableEastWallImage,
      show: () => this.tableShowEastWall,
      setShow: (value: boolean) => (this.tableShowEastWall = value),
      open: () => this.openEastWallImageModal(),
    },
    {
      key: 'south',
      label: 'feature.tabletop.tableSetting.imageSouthWall',
      alt: 'feature.tabletop.tableSetting.imageSouthWallAlt',
      add: 'feature.tabletop.tableSetting.addImageSouthWall',
      image: () => this.tableSouthWallImage,
      show: () => this.tableShowSouthWall,
      setShow: (value: boolean) => (this.tableShowSouthWall = value),
      open: () => this.openSouthWallImageModal(),
    },
    {
      key: 'west',
      label: 'feature.tabletop.tableSetting.imageWestWall',
      alt: 'feature.tabletop.tableSetting.imageWestWallAlt',
      add: 'feature.tabletop.tableSetting.addImageWestWall',
      image: () => this.tableWestWallImage,
      show: () => this.tableShowWestWall,
      setShow: (value: boolean) => (this.tableShowWestWall = value),
      open: () => this.openWestWallImageModal(),
    },
  ];

  get tableWallHeight(): number {
    return this.selectedTable?.wallHeight ?? 10;
  }
  set tableWallHeight(value: number) {
    if (this.isEditable && this.selectedTable) this.selectedTable.wallHeight = Number(value);
  }

  private wallImage(identifier: string | undefined): ImageFile {
    this.objectChange.fileVersion();
    if (this.selectedTable) this.objectChange.versionOf(this.selectedTable.identifier)();
    return this.imageService.getEmptyOr(identifier ?? '');
  }

  get tableNorthWallImage(): ImageFile {
    return this.wallImage(this.selectedTable?.northWallImageIdentifier);
  }
  get tableEastWallImage(): ImageFile {
    return this.wallImage(this.selectedTable?.eastWallImageIdentifier);
  }
  get tableSouthWallImage(): ImageFile {
    return this.wallImage(this.selectedTable?.southWallImageIdentifier);
  }
  get tableWestWallImage(): ImageFile {
    return this.wallImage(this.selectedTable?.westWallImageIdentifier);
  }

  get tableShowNorthWall(): boolean {
    return this.selectedTable?.showNorthWall ?? false;
  }
  set tableShowNorthWall(value: boolean) {
    if (this.isEditable && this.selectedTable) this.selectedTable.showNorthWall = value;
  }
  get tableShowEastWall(): boolean {
    return this.selectedTable?.showEastWall ?? false;
  }
  set tableShowEastWall(value: boolean) {
    if (this.isEditable && this.selectedTable) this.selectedTable.showEastWall = value;
  }
  get tableShowSouthWall(): boolean {
    return this.selectedTable?.showSouthWall ?? false;
  }
  set tableShowSouthWall(value: boolean) {
    if (this.isEditable && this.selectedTable) this.selectedTable.showSouthWall = value;
  }
  get tableShowWestWall(): boolean {
    return this.selectedTable?.showWestWall ?? false;
  }
  set tableShowWestWall(value: boolean) {
    if (this.isEditable && this.selectedTable) this.selectedTable.showWestWall = value;
  }

  get tableGridSnapStyle(): GridSnapStyle {
    return this.selectedTable?.gridSnapStyle ?? GridSnapStyle.CENTER;
  }
  set tableGridSnapStyle(snapStyle: GridSnapStyle) {
    if (this.isEditable && this.selectedTable) this.selectedTable.gridSnapStyle = Number(snapStyle);
  }

  get tableSnapMode(): string {
    if (!this.tableGridSnap) return 'off';
    switch (this.tableGridSnapStyle) {
      case GridSnapStyle.VERTEX:
        return 'vertex';
      case GridSnapStyle.BOTH:
        return 'both';
      case GridSnapStyle.ALL:
        return 'all';
      default:
        return 'center';
    }
  }
  set tableSnapMode(mode: string) {
    if (!this.selectedTable) return;
    if (mode === 'off') {
      this.selectedTable.gridSnap = false;
    } else {
      this.selectedTable.gridSnap = true;
      this.selectedTable.gridSnapStyle =
        mode === 'vertex'
          ? GridSnapStyle.VERTEX
          : mode === 'both'
            ? GridSnapStyle.BOTH
            : mode === 'all'
              ? GridSnapStyle.ALL
              : GridSnapStyle.CENTER;
    }
  }

  get tableGridType(): GridType {
    return this.selectedTable?.gridType ?? 0;
  }
  set tableGridType(gridType: GridType) {
    if (this.isEditable && this.selectedTable) this.selectedTable.gridType = Number(gridType);
  }

  get tableDistanceviewFilter(): FilterType {
    return this.selectedTable?.backgroundFilterType ?? FilterType.NONE;
  }
  set tableDistanceviewFilter(filterType: FilterType) {
    if (this.isEditable && this.selectedTable) this.selectedTable.backgroundFilterType = filterType;
  }

  selectedTable: GameTable | null = null;
  selectedTableXml: string = '';

  get isEmpty(): boolean {
    return this.tableSelecter ? (this.tableSelecter.viewTable ? false : true) : true;
  }
  get isDeleted(): boolean {
    this.objectChange.collectionOf('game-table')();
    if (!this.selectedTable) return true;
    return this.objectStore.get<GameTable>(this.selectedTable.identifier) == null;
  }
  get isEditable(): boolean {
    return !this.isEmpty && !this.isDeleted;
  }

  readonly isSaving = signal(false);
  readonly progressPercent = signal(0);

  constructor() {
    queueMicrotask(
      () => (this.modalService.title = this.panelService.title = this.t('feature.tabletop.tableSetting.title'))
    );
    this.selectedTable = this.tableSelecter.viewTable;
    this.objectChange.objectDeleted$.subscribe((e) => {
      if (!this.selectedTable || e.identifier !== this.selectedTable.identifier) return;
      const object = this.objectStore.get(e.identifier);
      if (object !== null) {
        this.selectedTableXml = object.toXml();
      }
    }, this.destroyRef);
  }

  /**
   * Chosen from the list, which is the one moment a cut-in belongs.
   * Creating, restoring and loading a room go through selectGameTable() and stay quiet.
   */
  chooseGameTable(identifier: string): void {
    const wasShowing = this.tableSelecter.viewTableIdentifier;
    this.selectGameTable(identifier);
    if (identifier === wasShowing) return;

    const table = this.objectStore.get<GameTable>(identifier);
    if (table) this.cutInService.launchForTable(table);
  }

  selectGameTable(identifier: string) {
    emitSelectGameTable({ identifier });
    this.selectedTable = this.objectStore.get<GameTable>(identifier);
    this.selectedTableXml = '';
  }

  getCutIns(): CutIn[] {
    this.objectChange.collectionOf(CutIn.aliasName)();
    return this.objectStore.getObjects(CutIn);
  }

  private cutInIdentifiersRaw = '';
  private cutInIdentifiers: string[] = [];

  get tableCutIns(): string[] {
    const raw = this.selectedTable?.cutInIdentifiers ?? '';
    if (raw !== this.cutInIdentifiersRaw) {
      this.cutInIdentifiersRaw = raw;
      this.cutInIdentifiers = parseCutInIdentifiers(raw);
    }
    return this.cutInIdentifiers;
  }
  set tableCutIns(identifiers: string[]) {
    if (!this.isEditable || !this.selectedTable) return;
    this.selectedTable.cutInIdentifiers = encodeCutInIdentifiers(identifiers ?? []);
  }

  getGameTables(): GameTable[] {
    return this.objectStore.getObjects(GameTable);
  }

  createGameTable() {
    if (!this.rolePermission.canEditTabletop) return;
    const gameTable = new GameTable();
    gameTable.name = this.t('feature.tabletop.tableSetting.defaultName');
    gameTable.imageIdentifier = ImageFile.Empty.identifier;
    gameTable.gridShow = true;
    gameTable.initialize();
    this.selectGameTable(gameTable.identifier);
  }

  async save() {
    if (!this.selectedTable || this.isSaving()) return;
    this.isSaving.set(true);
    this.progressPercent.set(0);

    this.selectedTable.selected = true;
    await this.saveDataService.saveGameObjectAsync(this.selectedTable, 'map_' + this.selectedTable.name, (percent) => {
      this.progressPercent.set(percent);
    });

    setTimeout(() => {
      this.isSaving.set(false);
      this.progressPercent.set(0);
    }, 500);
  }

  delete() {
    if (!this.rolePermission.canEditTabletop) return;
    if (!this.isEmpty && this.selectedTable) {
      this.selectedTableXml = this.selectedTable.toXml();
      this.selectedTable.destroy();
    }
  }

  restore() {
    if (!this.rolePermission.canEditTabletop) return;
    if (this.selectedTable && this.selectedTableXml) {
      const restoreTable = this.objectSerializer.parseXml(this.selectedTableXml)!;
      this.selectGameTable(restoreTable.identifier);
      this.selectedTableXml = '';
    }
  }

  openBgImageModal() {
    if (this.isDeleted) return;
    this.modalService.open<string>(FileSelecterComponent, { isAllowedEmpty: true }).then((value) => {
      if (!this.selectedTable || !value) return;
      this.selectedTable.imageIdentifier = value;
    });
  }

  openBgImageGridAdjust() {
    if (this.isDeleted) return;
    this.modalService.open<string>(FileSelecterComponent, { isAllowedEmpty: false }).then((imageIdentifier) => {
      if (!this.selectedTable || !imageIdentifier) return;
      const gridSize = this.selectedTable.gridSize;
      const gridColor = this.selectedTable.gridColor;
      this.modalService
        .open<MapImageGridAdjusterResult | null>(MapImageGridAdjusterComponent, {
          imageIdentifier,
          gridSize,
          gridColor,
          fitWidth: true,
          gridType: this.selectedTable.gridType,
        })
        .then((res) => {
          const table = this.selectedTable;
          if (!table || !res) return;
          table.imageIdentifier = res.imageIdentifier;
          table.width = res.width;
          table.height = res.height;
          table.gridType = res.gridType;
        });
    });
  }

  openDistanceViewImageModal() {
    if (this.isDeleted) return;
    this.modalService.open<string>(FileSelecterComponent, { isAllowedEmpty: true }).then((value) => {
      if (!this.selectedTable || !value) return;
      this.selectedTable.backgroundImageIdentifier = value;
    });
  }

  private openWallImageModal(apply: (table: GameTable, value: string) => void) {
    if (this.isDeleted) return;
    this.modalService.open<string>(FileSelecterComponent, { isAllowedEmpty: true }).then((value) => {
      if (!this.selectedTable || !value) return;
      apply(this.selectedTable, value);
    });
  }
  openNorthWallImageModal() {
    this.openWallImageModal((t, v) => (t.northWallImageIdentifier = v));
  }
  openEastWallImageModal() {
    this.openWallImageModal((t, v) => (t.eastWallImageIdentifier = v));
  }
  openSouthWallImageModal() {
    this.openWallImageModal((t, v) => (t.southWallImageIdentifier = v));
  }
  openWestWallImageModal() {
    this.openWallImageModal((t, v) => (t.westWallImageIdentifier = v));
  }

  onSelectGameTable(event: Event): void {
    this.chooseGameTable((event.target as HTMLInputElement).value);
  }
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
