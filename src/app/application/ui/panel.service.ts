import { ComponentRef, Injectable, signal, ViewContainerRef } from '@angular/core';
import { EventChannel } from '@axe/core/event/event-channel';
import { CardStack } from '@axe/domain/card/card-stack';
import { ChatTab } from '@axe/domain/chat/chat-tab';

declare const Type: FunctionConstructor;
interface Type<T> {
  new (...args: unknown[]): T;
}

export type PanelRotationDegrees = 0 | 90 | 180 | 270;

export interface PanelOption {
  title?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  rotationDegrees?: PanelRotationDegrees;

  isCutIn?: boolean;
  cutInIdentifier?: string;
  invisible?: boolean;
  minimizeToContent?: boolean;
  frameless?: boolean;
}

interface UIPanelInstance {
  content: () => ViewContainerRef;
  setInitialRotation: (degrees: PanelRotationDegrees) => void;
}

type PanelServiceAssignableKey =
  | 'title'
  | 'top'
  | 'left'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'minHeight'
  | 'isCutIn'
  | 'cutInIdentifier'
  | 'invisible'
  | 'minimizeToContent'
  | 'frameless';

@Injectable()
export class PanelService {
  static defaultParentViewContainerRef: ViewContainerRef;
  static UIPanelComponentClass: { new (...args: unknown[]): UIPanelInstance } = null!;
  static chatPortraitComponentClass: Type<unknown> | null = null;
  static cardStackListComponentClass: Type<unknown> | null = null;
  private panelComponentRef: ComponentRef<UIPanelInstance> | null = null;
  private actionRotationDegrees: PanelRotationDegrees = 0;
  title: string = '';
  titleTooltip: string = '';
  left: number = 0;
  top: number = 0;
  width: number = 100;
  height: number = 100;
  minWidth: number = 100;
  minHeight: number = 100;
  isCutIn: boolean = false;
  cutInIdentifier: string = '';
  invisible: boolean = false;
  minimizeToContent: boolean = false;
  frameless: boolean = false;
  readonly isMinimized = signal(false);
  chatTab: ChatTab | null = null;
  cardStack: CardStack | null = null;
  scrollablePanel: HTMLDivElement | null = null;
  private isScrollablePanelClaimed = false;
  readonly scrollToBottom$ = new EventChannel<void>();
  get isShow(): boolean {
    return this.panelComponentRef !== null;
  }

  setDefaultScrollablePanel(panel: HTMLDivElement): void {
    if (this.isScrollablePanelClaimed) return;
    this.scrollablePanel = panel;
  }

  claimScrollablePanel(panel: HTMLDivElement): void {
    this.isScrollablePanelClaimed = true;
    this.scrollablePanel = panel;
  }

  open<T>(childComponent: Type<T>, option?: PanelOption, parentViewContainerRef?: ViewContainerRef): T {
    if (!parentViewContainerRef) {
      parentViewContainerRef = PanelService.defaultParentViewContainerRef;
    }
    const injector = parentViewContainerRef.injector;

    const panelComponentRef = parentViewContainerRef.createComponent(PanelService.UIPanelComponentClass, {
      index: parentViewContainerRef.length,
      injector,
    });
    const bodyComponentRef: ComponentRef<T> = panelComponentRef.instance.content().createComponent(childComponent);

    const childPanelService: PanelService = panelComponentRef.injector.get(PanelService);

    childPanelService.panelComponentRef = panelComponentRef;
    const inheritedOption = this.withInheritedRotation(option, this.actionRotationDegrees);
    if (inheritedOption) this.applyPanelOption(panelComponentRef, childPanelService, inheritedOption);
    panelComponentRef.onDestroy(() => {
      childPanelService.panelComponentRef = null;
    });

    return bodyComponentRef.instance as T;
  }

  openLazy<T>(
    factory: () => Promise<Type<T>>,
    option?: PanelOption,
    setup?: (instance: T) => void,
    parentViewContainerRef?: ViewContainerRef
  ): void {
    const inheritedOption = this.withInheritedRotation(option, this.actionRotationDegrees);
    factory().then((childComponent) => {
      const instance = this.open(childComponent, inheritedOption, parentViewContainerRef);
      setup?.(instance);
    });
  }

  runWithInitialRotation<T>(rotationDegrees: PanelRotationDegrees, action: () => T): T {
    const previous = this.actionRotationDegrees;
    this.actionRotationDegrees = rotationDegrees;
    try {
      return action();
    } finally {
      this.actionRotationDegrees = previous;
    }
  }

  private applyPanelOption(
    panelComponentRef: ComponentRef<UIPanelInstance>,
    childPanelService: PanelService,
    option: PanelOption
  ) {
    const adjusted = PanelService.clampPanelOptionToViewport(option, childPanelService);
    const withInput = ['title', 'top', 'left', 'width', 'height', 'minWidth', 'minHeight'] as const;
    for (const key of withInput) {
      const value = adjusted[key];
      if (value === undefined) continue;
      this.setPanelServiceValue(childPanelService, key, value);
      panelComponentRef.setInput(key, value);
    }

    const serviceOnly = ['isCutIn', 'cutInIdentifier', 'invisible', 'minimizeToContent', 'frameless'] as const;
    for (const key of serviceOnly) {
      const value = adjusted[key];
      if (value === undefined) continue;
      this.setPanelServiceValue(childPanelService, key, value);
    }
    if (adjusted.rotationDegrees !== undefined) {
      panelComponentRef.instance.setInitialRotation(adjusted.rotationDegrees);
    }
  }

  private withInheritedRotation(
    option: PanelOption | undefined,
    rotationDegrees: PanelRotationDegrees
  ): PanelOption | undefined {
    if (option?.rotationDegrees !== undefined || rotationDegrees === 0) return option;
    return { ...option, rotationDegrees };
  }

  static clampPanelOptionToViewport(option: PanelOption, fallback: PanelService): PanelOption {
    if (typeof window === 'undefined') return option;
    const width = option.width ?? fallback.width;
    const height = option.height ?? fallback.height;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const adjusted: PanelOption = { ...option };
    if (option.left !== undefined) {
      const maxLeft = Math.max(0, viewportW - width);
      adjusted.left = Math.max(0, Math.min(option.left, maxLeft));
    }
    if (option.top !== undefined) {
      const maxTop = Math.max(0, viewportH - height);
      adjusted.top = Math.max(0, Math.min(option.top, maxTop));
    }
    return adjusted;
  }

  private setPanelServiceValue<K extends PanelServiceAssignableKey>(
    panelService: PanelService,
    key: K,
    value: PanelService[K]
  ) {
    panelService[key] = value;
  }

  close() {
    if (this.panelComponentRef) {
      this.panelComponentRef.destroy();
      this.panelComponentRef = null;
    }
  }
}
