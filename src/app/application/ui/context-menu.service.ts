import { ComponentRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import { RolePermissionService } from '@axe/application/permission/role-permission.service';
import { PanelRotationDegrees } from '@axe/application/ui/panel.service';
import { DEFAULT_RADIAL_MENU_ROTATION_SPEED } from '@axe/domain/tabletop/game-table';
import { TabletopObject } from '@axe/domain/tabletop/tabletop-object';

interface ContextMenuPoint {
  x: number;
  y: number;
}

export enum ContextMenuType {
  ACTION = 'action',
  SEPARATOR = 'separator',
}

export const ContextMenuSeparator: ContextMenuAction = {
  name: '',
  enabled: true,
  type: ContextMenuType.SEPARATOR,
};

export interface ContextMenuAction {
  name: string;
  action?: () => void;
  enabled?: boolean;
  altitudeHandle?: TabletopObject;
  type?: ContextMenuType;
  subActions?: ContextMenuAction[];
}

export interface ContextMenuRadialGroup {
  name: string;
  icon: string;
  actions: ContextMenuAction[];
}

type ContextMenuComponentClass = { new (...args: unknown[]): unknown };

@Injectable()
export class ContextMenuService {
  static defaultParentViewContainerRef: ViewContainerRef;
  static ContextMenuComponentClass: ContextMenuComponentClass = null!;
  static FourWayRadialMenuComponentClass: ContextMenuComponentClass = null!;
  private readonly rolePermission = inject(RolePermissionService);
  private panelComponentRef: ComponentRef<unknown> | null = null;

  title: string = '';
  actions: ContextMenuAction[] = [];
  radialGroups: ContextMenuRadialGroup[] = [];
  radialMenuEnabled: boolean = false;
  radialMenuRotationSpeed: number = DEFAULT_RADIAL_MENU_ROTATION_SPEED;
  radialMenuClearanceRadius: number = 0;
  rotationDegrees: PanelRotationDegrees = 0;
  position: ContextMenuPoint = { x: 0, y: 0 };

  get isShow(): boolean {
    return this.panelComponentRef !== null;
  }

  open(
    position: ContextMenuPoint,
    actions: ContextMenuAction[],
    title?: string,
    parentViewContainerRef?: ViewContainerRef
  ) {
    this.openComponent(
      ContextMenuService.ContextMenuComponentClass,
      position,
      actions,
      [],
      0,
      true,
      DEFAULT_RADIAL_MENU_ROTATION_SPEED,
      0,
      title,
      parentViewContainerRef
    );
  }

  openDirectional(
    position: ContextMenuPoint,
    actions: ContextMenuAction[],
    rotationDegrees: PanelRotationDegrees,
    title?: string,
    parentViewContainerRef?: ViewContainerRef
  ) {
    this.openComponent(
      ContextMenuService.ContextMenuComponentClass,
      position,
      actions,
      [],
      rotationDegrees,
      true,
      DEFAULT_RADIAL_MENU_ROTATION_SPEED,
      0,
      title,
      parentViewContainerRef
    );
  }

  openRadial(
    position: ContextMenuPoint,
    actions: ContextMenuAction[],
    radialGroups: ContextMenuRadialGroup[],
    title?: string,
    radialMenuEnabled = false,
    radialMenuRotationSpeed = DEFAULT_RADIAL_MENU_ROTATION_SPEED,
    radialMenuClearanceRadius = 0,
    parentViewContainerRef?: ViewContainerRef
  ) {
    this.openComponent(
      ContextMenuService.FourWayRadialMenuComponentClass,
      position,
      actions,
      radialGroups,
      0,
      radialMenuEnabled,
      radialMenuRotationSpeed,
      radialMenuClearanceRadius,
      title,
      parentViewContainerRef
    );
  }

  private openComponent(
    componentClass: ContextMenuComponentClass,
    position: ContextMenuPoint,
    actions: ContextMenuAction[],
    radialGroups: ContextMenuRadialGroup[],
    rotationDegrees: PanelRotationDegrees,
    radialMenuEnabled: boolean,
    radialMenuRotationSpeed: number,
    radialMenuClearanceRadius: number,
    title?: string,
    parentViewContainerRef?: ViewContainerRef
  ) {
    this.close();
    if (!this.rolePermission.canEditTabletop) return;
    if (!parentViewContainerRef) {
      parentViewContainerRef = ContextMenuService.defaultParentViewContainerRef;
    }
    const injector = parentViewContainerRef.injector;

    const panelComponentRef = parentViewContainerRef.createComponent(componentClass, {
      index: parentViewContainerRef.length,
      injector,
    });

    const childPanelService: ContextMenuService = panelComponentRef.injector.get(ContextMenuService);

    childPanelService.panelComponentRef = panelComponentRef;
    if (actions) {
      childPanelService.actions = actions;
    }
    childPanelService.radialGroups = radialGroups;
    childPanelService.radialMenuEnabled = radialMenuEnabled;
    childPanelService.radialMenuRotationSpeed = radialMenuRotationSpeed;
    childPanelService.radialMenuClearanceRadius = radialMenuClearanceRadius;
    childPanelService.rotationDegrees = rotationDegrees;
    if (position) {
      childPanelService.position.x = position.x;
      childPanelService.position.y = position.y;
    }

    childPanelService.title = title != null ? title : '';

    panelComponentRef.onDestroy(() => {
      childPanelService.panelComponentRef = null;
    });
  }

  close() {
    if (this.panelComponentRef) {
      this.panelComponentRef.destroy();
      this.panelComponentRef = null;
    }
  }
}
