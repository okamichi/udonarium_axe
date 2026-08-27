import { TestBed } from '@angular/core/testing';
import { GameTableGestureService } from '@axe/features/tabletop/game-table/game-table-gesture.service';
import { TEST_PROVIDERS } from '@axe/testing/test-providers';

describe('GameTableGestureService', () => {
  let service: GameTableGestureService;
  let gameTableEl: HTMLElement;

  const callSetTransform = (rX: number, rY: number, rZ: number): void => {
    service.setTransform(0, 0, 0, rX, rY, rZ);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...TEST_PROVIDERS, GameTableGestureService],
    });
    service = TestBed.inject(GameTableGestureService);
    gameTableEl = document.createElement('div');
    (service as unknown as { gameTableEl: HTMLElement }).gameTableEl = gameTableEl;
  });

  describe('tiltLocked', () => {
    it('adds the tilt while it is unlocked', () => {
      service.viewRotateX = 50;
      service.tiltLocked = false;
      callSetTransform(10, 0, 0);
      expect(service.viewRotateX).toBe(60);
    });

    it('ignores the tilt and holds the view flat while it is locked', () => {
      service.viewRotateX = 50;
      service.tiltLocked = true;
      callSetTransform(10, 0, 0);
      expect(service.viewRotateX).toBe(0);
    });

    it('snaps the tilt back to nothing when the view is reset while locked', () => {
      service.viewRotateX = 35;
      service.viewRotateY = 12;
      service.tiltLocked = true;
      callSetTransform(0, 0, 0);
      expect(service.viewRotateX).toBe(0);
      expect(service.viewRotateY).toBe(0);
    });

    it('still turns about the vertical while locked', () => {
      service.viewRotateZ = 10;
      service.tiltLocked = true;
      callSetTransform(0, 0, 30);
      expect(service.viewRotateZ).toBe(40);
    });
  });

  describe('orthographicProjection', () => {
    it('keeps the perspective transform unchanged by default', () => {
      service.viewPositionZ = -3000;
      callSetTransform(0, 0, 0);

      expect(gameTableEl.style.transform).not.toContain('scale(');
      expect(gameTableEl.style.transform).toContain('translateZ(-3000.0000px)');
    });

    it('replaces perspective zoom with an equivalent scale', () => {
      service.viewPositionZ = -3000;
      service.orthographicProjection = true;
      callSetTransform(0, 0, 0);

      expect(gameTableEl.style.transform).toContain('scale(0.500000)');
      expect(gameTableEl.style.transform).toContain('translateZ(-3000.0000px)');
    });
  });
});
