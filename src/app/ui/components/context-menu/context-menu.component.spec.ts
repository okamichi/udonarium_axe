import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '@axe/application/ui/modal.service';
import { PanelService } from '@axe/application/ui/panel.service';
import { ContextMenuComponent } from '@axe/ui/components/context-menu/context-menu.component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ContextMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rotates the complete vertical menu toward the selected side', () => {
    component.contextMenuService.rotationDegrees = 90;
    fixture.detectChanges();

    const root = component.rootElementRef().nativeElement;
    expect(root.style.rotate).toBe('90deg');
    expect(root.style.transformOrigin).toBe('top left');
    expect(root.dataset['menuRotation']).toBe('90');
  });

  it('passes the menu direction to panels and modals opened by an action', () => {
    const action = vi.fn();
    const runPanelWithRotation = vi
      .spyOn(TestBed.inject(PanelService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    const runModalWithRotation = vi
      .spyOn(TestBed.inject(ModalService), 'runWithInitialRotation')
      .mockImplementation((_degrees, callback) => callback());
    component.contextMenuService.rotationDegrees = 270;

    component.doAction({ name: 'Open panel', action });

    expect(runPanelWithRotation).toHaveBeenCalledWith(270, expect.any(Function));
    expect(runModalWithRotation).toHaveBeenCalledWith(270, action);
    expect(action).toHaveBeenCalledOnce();
  });

  it('opens a submenu immediately when its parent is clicked', () => {
    const leafAction = vi.fn();
    const parent = {
      name: 'Display',
      subActions: [{ name: 'Hide name', action: leafAction }],
    };
    component.contextMenuService.actions = [parent];
    component.contextMenuService.rotationDegrees = 180;
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('li') as HTMLLIElement;
    item.click();
    fixture.detectChanges();

    expect(component.subMenu()).toEqual(parent.subActions);
    const submenu = fixture.nativeElement.querySelector('context-menu');
    expect(submenu).toBeTruthy();
    expect(submenu.textContent).toContain('Hide name');

    const outerAction = vi.spyOn(component, 'doAction');
    const submenuItem = submenu.querySelector('li') as HTMLLIElement;
    submenuItem.click();
    expect(leafAction).toHaveBeenCalledOnce();
    expect(outerAction).not.toHaveBeenCalled();
  });
});
