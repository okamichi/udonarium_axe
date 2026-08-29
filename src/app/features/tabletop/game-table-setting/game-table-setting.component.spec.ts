import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CutInService } from '@axe/application/media/cut-in.service';
import { ObjectChangeService } from '@axe/application/sync/object-change.service';
import { ObjectStore } from '@axe/core/sync/object-store';
import { CutIn } from '@axe/domain/media/cut-in';
import { Config } from '@axe/domain/peer/config';
import { FilterType, GameTable, GridSnapStyle, GridType } from '@axe/domain/tabletop/game-table';
import { GameTableSettingComponent } from '@axe/features/tabletop/game-table-setting/game-table-setting.component';
import { expectPanelDragRecovery, PanelDragTestHostComponent } from '@axe/testing/panel-drag-recovery';
import { TEST_PROVIDERS } from '@axe/testing/test-providers';
import { TextTooltipDirective } from '@axe/ui/directives/text-tooltip.directive';

describe('GameTableSettingComponent', () => {
  let component: GameTableSettingComponent;
  let fixture: ComponentFixture<GameTableSettingComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GameTableSettingComponent, PanelDragTestHostComponent],
      providers: [...TEST_PROVIDERS],
    }).compileComponents();
  });

  beforeEach(() => {
    // The component reads the config out of the store to find the default dice bot, so a
    // singleton has to be registered or a test run on its own dereferences nothing.
    if (!ObjectStore.instance.get('Config')) {
      const config = new Config('Config');
      config.initialize();
    }
    fixture = TestBed.createComponent(GameTableSettingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('asks for no change detector', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((component as any).changeDetector).toBeUndefined();
  });

  describe('with no table selected', () => {
    beforeEach(() => {
      component.selectedTable = null;
    });

    it('detects changes without throwing', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('returns the default', () => {
      expect(component.tableName).toBe('');
      expect(component.tableWidth).toBe(10);
      expect(component.tableHeight).toBe(10);
      expect(component.tableGridColor).toBe('#000000');
      expect(component.tableGridFontColor).toBe('#000000');
      expect(component.tableGridType).toBe(0 as GridType);
      expect(component.tableGridSnapStyle).toBe(GridSnapStyle.CENTER);
      expect(component.tableSnapMode).toBe('center');
      expect(component.tableDistanceviewFilter).toBe(FilterType.NONE);
    });

    it('sets without throwing', () => {
      expect(() => {
        component.tableName = 'test';
        component.tableWidth = 20;
        component.tableHeight = 20;
        component.tableGridColor = '#ffffff';
        component.tableGridFontColor = '#ff0000';
        component.tableGridType = 1 as GridType;
        component.tableGridSnapStyle = GridSnapStyle.VERTEX;
        component.tableDistanceviewFilter = FilterType.WHITE;
      }).not.toThrow();
    });
  });

  describe('signal-driven CD', () => {
    it('reads the deleted flag through a collection signal', () => {
      const objectChangeService = TestBed.inject(ObjectChangeService);
      const spy = vi.spyOn(objectChangeService, 'collectionOf');
      void component.isDeleted;
      expect(spy).toHaveBeenCalledWith('game-table');
    });

    it('reads the background image through a version signal', () => {
      const objectChangeService = TestBed.inject(ObjectChangeService);
      const spy = vi.spyOn(objectChangeService, 'versionOf');
      const table = new GameTable();
      table.initialize();
      component.selectedTable = table;
      void component.tableBackgroundImage;
      expect(spy).toHaveBeenCalledWith(table.identifier);
    });

    it('reads the distance view image through a version signal', () => {
      const objectChangeService = TestBed.inject(ObjectChangeService);
      const spy = vi.spyOn(objectChangeService, 'versionOf');
      const table = new GameTable();
      table.initialize();
      component.selectedTable = table;
      void component.tableDistanceviewImage;
      expect(spy).toHaveBeenCalledWith(table.identifier);
    });
  });

  it('stores and bounds the multi-angle motion settings', () => {
    const table = new GameTable();
    table.initialize();
    component.selectedTable = table;

    try {
      component.tableMultiAngleMotionMode = 'quarter-turn';
      component.tableMultiAngleRevolutionSeconds = 24;
      component.tableMultiAnglePauseSeconds = 3.5;
      component.tableMultiAnglePieceRevolutionSeconds = 90;

      expect(table.multiAngleMotionMode).toBe('quarter-turn');
      expect(table.multiAngleRevolutionSeconds).toBe(24);
      expect(table.multiAnglePauseSeconds).toBe(3.5);
      expect(table.multiAnglePieceRevolutionSeconds).toBe(90);

      expect(component.tableMultiAngleResourceBuffEnabled).toBe(false);
      component.tableMultiAngleResourceBuffEnabled = true;
      expect(table.multiAngleResourceBuffEnabled).toBe(true);

      component.tableMultiAngleMotionMode = 'piece-quarter-turn';
      expect(component.tableMultiAngleMotionMode).toBe('piece-quarter-turn');
      expect(table.multiAngleMotionMode).toBe('piece-quarter-turn');

      component.tableMultiAngleRevolutionSeconds = 0;
      component.tableMultiAnglePauseSeconds = 99;
      component.tableMultiAnglePieceRevolutionSeconds = 1;
      expect(table.multiAngleRevolutionSeconds).toBe(1);
      expect(table.multiAnglePauseSeconds).toBe(30);
      expect(table.multiAnglePieceRevolutionSeconds).toBe(5);
    } finally {
      table.destroy();
    }
  });

  it('offers piece-only quarter turns and their pause setting', async () => {
    const table = new GameTable();
    table.initialize();
    table.mode2d = true;
    table.multiAngleEnabled = true;
    table.multiAngleMotionMode = 'piece-quarter-turn';
    component.selectedTable = table;

    try {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const option = fixture.nativeElement.querySelector(
        'option[value="piece-quarter-turn"]'
      ) as HTMLOptionElement | null;
      expect(option?.textContent).toContain('コマだけ90°回転して停止');
      expect(fixture.nativeElement.querySelector('input[name="tableMultiAnglePauseSeconds"]')).toBeTruthy();
      const resourceBuff = fixture.nativeElement.querySelector(
        'input[name="tableMultiAngleResourceBuffEnabled"]'
      ) as HTMLInputElement | null;
      expect(resourceBuff?.checked).toBe(false);
      expect(resourceBuff?.closest('label')?.textContent).toContain('リソースバフ回転表示（最大4つまで）');
    } finally {
      table.destroy();
    }
  });

  it('stores the radial menu setting on the table', () => {
    const table = new GameTable();
    table.initialize();
    component.selectedTable = table;

    try {
      expect(component.tableRadialMenuEnabled).toBe(false);
      expect(component.tableRadialMenuRotationSpeed).toBe(5);
      component.tableRadialMenuEnabled = true;
      component.tableRadialMenuRotationSpeed = 9;
      expect(table.radialMenuEnabled).toBe(true);
      expect(table.radialMenuRotationSpeed).toBe(9);

      component.tableRadialMenuRotationSpeed = 99;
      expect(table.radialMenuRotationSpeed).toBe(24);
    } finally {
      table.destroy();
    }
  });

  it('stores the orthographic projection setting on the table', () => {
    const table = new GameTable();
    table.initialize();
    component.selectedTable = table;

    try {
      expect(component.tableOrthographicProjection).toBe(false);
      component.tableOrthographicProjection = true;
      expect(table.orthographicProjection).toBe(true);
    } finally {
      table.destroy();
    }
  });

  it('shows projection and rotating menu checkboxes inside 2D mode settings', async () => {
    const table = new GameTable();
    table.initialize();
    table.mode2d = true;
    component.selectedTable = table;

    try {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const projection = fixture.nativeElement.querySelector(
        'input[name="tableOrthographicProjection"]'
      ) as HTMLInputElement;
      expect(projection).toBeTruthy();
      expect(projection.checked).toBe(false);
      expect(projection.closest('label')?.textContent).toContain('平行投影');
      const checkbox = fixture.nativeElement.querySelector('input[name="tableRadialMenuEnabled"]') as HTMLInputElement;
      expect(checkbox).toBeTruthy();
      expect(checkbox.checked).toBe(false);
      expect(checkbox.closest('label')?.textContent).toContain('回転メニュー表示');
      const menuTooltip = fixture.debugElement
        .query(By.css('[data-testid="radial-menu-label"]'))
        .injector.get(TextTooltipDirective);
      expect(menuTooltip.appTextTooltip()).toBe(
        '選択したメニューの向きにウィンドウが開くので、コマの右クリック連続で強制回転し、コマの真下での選択クリックしてください。混み合ってる場所でのメニュー表示は、右ドラッグすれば任意の場所に表示可能です。'
      );
      const speed = fixture.nativeElement.querySelector(
        'input[name="tableRadialMenuRotationSpeed"]'
      ) as HTMLInputElement;
      expect(speed).toBeTruthy();
      expect(speed.value).toBe('5');
      expect(speed.max).toBe('24');
      expect(speed.disabled).toBe(true);
      const speedTooltip = fixture.debugElement
        .query(By.css('[data-testid="radial-menu-speed-label"]'))
        .injector.get(TextTooltipDirective);
      expect(speedTooltip.appTextTooltip()).toBe(
        '回転メニューの回転速度を1～24°/秒で設定します。値が大きいほど速く回転します。'
      );
    } finally {
      table.destroy();
    }
  });

  describe('choosing a table from the list', () => {
    let table: GameTable;

    function watchLaunch() {
      return vi.spyOn(TestBed.inject(CutInService), 'launchForTable').mockReturnValue(true);
    }

    beforeEach(() => {
      table = new GameTable();
      table.initialize();
    });

    it('plays what the table asks for', () => {
      const launchForTable = watchLaunch();

      component.chooseGameTable(table.identifier);

      expect(launchForTable).toHaveBeenCalledWith(table);
    });

    it('stays quiet on the table already showing', () => {
      const launchForTable = watchLaunch();
      component.chooseGameTable(table.identifier);
      launchForTable.mockClear();

      component.chooseGameTable(table.identifier);

      expect(launchForTable).not.toHaveBeenCalled();
    });

    it('stays quiet when a table is only created', () => {
      const launchForTable = watchLaunch();

      component.selectGameTable(table.identifier);

      expect(launchForTable).not.toHaveBeenCalled();
    });

    it('reads and writes the cut-ins the table names', () => {
      component.selectedTable = table;
      component.tableCutIns = ['cut-1', 'cut-2'];

      expect(table.cutInIdentifiers).toBe('cut-1,cut-2');
      expect(component.tableCutIns).toEqual(['cut-1', 'cut-2']);
    });

    it('names the cut-ins it shows as chips', async () => {
      const cutIn = new CutIn();
      cutIn.initialize();
      cutIn.name = 'オープニング';
      table.cutInIdentifiers = cutIn.identifier;
      component.selectedTable = table;

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const labels = [...fixture.nativeElement.querySelectorAll('.ng-value-label')].map(
        (node: Element) => node.textContent
      );
      expect(labels).toContain('オープニング');
    });

    it('hands back the same list until the table names other cut-ins', () => {
      component.selectedTable = table;
      component.tableCutIns = ['cut-1', 'cut-2'];
      const list = component.tableCutIns;

      expect(component.tableCutIns).toBe(list);

      component.tableCutIns = ['cut-1'];

      expect(component.tableCutIns).not.toBe(list);
      expect(component.tableCutIns).toEqual(['cut-1']);
    });
  });

  it('lets the panel take the pointer again once the drag ends', async () => {
    await expectPanelDragRecovery(GameTableSettingComponent);
  });
});
