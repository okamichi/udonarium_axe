import { emitSelectGameTable } from '@axe/core/event/domain-events';
import { SyncObject, SyncVar } from '@axe/core/sync/decorator';
import { ObjectNode } from '@axe/core/sync/object-node';
import { DEFAULT_AMBIENCE_DENSITY } from '@axe/domain/effect/ambience/ambience-kind';
import {
  CutInMultiDirectionMode,
  DEFAULT_CUT_IN_MULTI_DIRECTION_MODE,
} from '@axe/domain/tabletop/cut-in-multi-direction';
import { GameTableMask } from '@axe/domain/tabletop/game-table-mask';
import { GameTableScratchMask } from '@axe/domain/tabletop/game-table-scratch-mask';
import { DEFAULT_HOVER_DETAIL_PLACEMENT, HoverDetailPlacement } from '@axe/domain/tabletop/hover-detail-placement';
import { LightSource } from '@axe/domain/tabletop/light-source';
import {
  DEFAULT_MULTI_ANGLE_PAUSE_SECONDS,
  DEFAULT_MULTI_ANGLE_PIECE_REVOLUTION_SECONDS,
  DEFAULT_MULTI_ANGLE_REVOLUTION_SECONDS,
  DEFAULT_MULTI_ANGLE_TICKER_PIXELS_PER_SECOND,
  MultiAngleMotionMode,
} from '@axe/domain/tabletop/multi-angle';
import { DEFAULT_MULTI_ANGLE_FONT_SCALE, MultiAngleFontScale } from '@axe/domain/tabletop/multi-angle-font-scale';
import { TableAmbience } from '@axe/domain/tabletop/table-ambience';
import { DEFAULT_TABLE_FACING_MARK, TableFacingMark } from '@axe/domain/tabletop/table-facing-mark';
import { Terrain } from '@axe/domain/tabletop/terrain';
import { DEFAULT_AMBIENT_COLOR } from '@axe/domain/tabletop/vision-types';
import { WhiteBoard } from '@axe/domain/tabletop/white-board';

export enum GridType {
  NONE = -1,
  SQUARE = 0,
  HEX_VERTICAL = 1,
  HEX_HORIZONTAL = 2,
}

export enum GridSnapStyle {
  CENTER = 0,
  VERTEX = 1,
  BOTH = 2,
  ALL = 3,
}

export enum FilterType {
  NONE = '',
  WHITE = 'white',
  BLACK = 'black',
}

export const DEFAULT_RADIAL_MENU_ROTATION_SPEED = 5;
export const MIN_RADIAL_MENU_ROTATION_SPEED = 1;
export const MAX_RADIAL_MENU_ROTATION_SPEED = 24;

@SyncObject('game-table')
export class GameTable extends ObjectNode {
  @SyncVar() name: string = 'テーブル';
  @SyncVar() width: number = 20;
  @SyncVar() height: number = 20;
  @SyncVar() gridSize: number = 50;
  @SyncVar() imageIdentifier: string = 'imageIdentifier';
  @SyncVar() backgroundImageIdentifier: string = 'imageIdentifier';
  @SyncVar() backgroundFilterType: FilterType = FilterType.NONE;
  @SyncVar() selected: boolean = false;
  @SyncVar() gridType: GridType = GridType.SQUARE;
  @SyncVar() lightSnapToGrid: boolean = false;
  @SyncVar() gridColor: string = '#000000e6';
  @SyncVar() gridFontColor: string = '#000000e6';
  @SyncVar() gridShow: boolean = false;
  @SyncVar() gridSnap: boolean = true;
  @SyncVar() gridSnapStyle: GridSnapStyle = GridSnapStyle.CENTER;
  @SyncVar() imageBillboard: boolean = false;
  @SyncVar() mode2d: boolean = false;
  @SyncVar() orthographicProjection: boolean = false;
  @SyncVar() terrainRotationIn2dEnabled: boolean = false;
  @SyncVar() cutInMultiDirectionMode: CutInMultiDirectionMode = DEFAULT_CUT_IN_MULTI_DIRECTION_MODE;
  @SyncVar() radialMenuEnabled: boolean = false;
  @SyncVar() radialMenuRotationSpeed: number = DEFAULT_RADIAL_MENU_ROTATION_SPEED;
  @SyncVar() multiAngleEnabled: boolean = false;
  @SyncVar() multiAngleResourceBuffEnabled: boolean = false;
  @SyncVar() multiAngleMotionMode: MultiAngleMotionMode = 'continuous';
  @SyncVar() multiAngleRevolutionSeconds: number = DEFAULT_MULTI_ANGLE_REVOLUTION_SECONDS;
  @SyncVar() multiAnglePauseSeconds: number = DEFAULT_MULTI_ANGLE_PAUSE_SECONDS;
  @SyncVar() multiAnglePieceRevolutionSeconds: number = DEFAULT_MULTI_ANGLE_PIECE_REVOLUTION_SECONDS;
  @SyncVar() multiAngleTickerEnabled: boolean = false;
  @SyncVar() multiAngleTickerPixelsPerSecond: number = DEFAULT_MULTI_ANGLE_TICKER_PIXELS_PER_SECOND;
  /** Text size shared by the 2D menus and the edge ticker; see {@link MultiAngleFontScale}. */
  @SyncVar() multiAngleFontScale: MultiAngleFontScale = DEFAULT_MULTI_ANGLE_FONT_SCALE;
  /** Where a hovered piece shows its detail in 2D mode; see {@link HoverDetailPlacement}. */
  @SyncVar() hoverDetailPlacement: HoverDetailPlacement = DEFAULT_HOVER_DETAIL_PLACEMENT;
  /** How a piece shows which way it faces; see {@link TableFacingMark}. */
  @SyncVar() facingMark: TableFacingMark = DEFAULT_TABLE_FACING_MARK;
  @SyncVar() wallHeight: number = 10;
  @SyncVar() northWallImageIdentifier: string = 'imageIdentifier';
  @SyncVar() eastWallImageIdentifier: string = 'imageIdentifier';
  @SyncVar() southWallImageIdentifier: string = 'imageIdentifier';
  @SyncVar() westWallImageIdentifier: string = 'imageIdentifier';
  @SyncVar() showNorthWall: boolean = false;
  @SyncVar() showEastWall: boolean = false;
  @SyncVar() showSouthWall: boolean = false;
  @SyncVar() showWestWall: boolean = false;

  @SyncVar() darknessEnabled: boolean = false;
  @SyncVar() darknessLevel: number = 0.92;
  @SyncVar() ambientColor: string = DEFAULT_AMBIENT_COLOR;
  @SyncVar() globalIllumination: number = 0;

  /** The weather over the whole map. Empty for none. */
  @SyncVar() weatherKind: string = '';
  @SyncVar() weatherColor: string = '';
  @SyncVar() weatherDensity: number = DEFAULT_AMBIENCE_DENSITY;

  /** Cut-ins to play when this table is chosen. Several are separated by commas, and one is drawn. */
  @SyncVar() cutInIdentifiers: string = '';

  gridClipRect: { top: number; right: number; bottom: number; left: number } | null = null;
  get terrains(): Terrain[] {
    return this.children.filter((o): o is Terrain => o instanceof Terrain);
  }

  get lightSources(): LightSource[] {
    return this.children.filter((o): o is LightSource => o instanceof LightSource);
  }

  get whiteBoards(): WhiteBoard[] {
    return this.children.filter((o): o is WhiteBoard => o instanceof WhiteBoard);
  }

  get ambiences(): TableAmbience[] {
    return this.children.filter((o): o is TableAmbience => o instanceof TableAmbience);
  }

  get masks(): GameTableMask[] {
    return this.children.filter((o): o is GameTableMask => o instanceof GameTableMask);
  }

  get scratchMasks(): GameTableScratchMask[] {
    return this.children.filter((o): o is GameTableScratchMask => o instanceof GameTableScratchMask);
  }

  // GameObject Lifecycle
  override onStoreAdded() {
    super.onStoreAdded();
    if (this.selected) emitSelectGameTable({ identifier: this.identifier });
  }
}
