/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import GameCanvas from 'lib/GameCanvas/GameCanvas';
import CanvasAPI from 'lib/CanvasAPI/CanvasAPI';
describe('Tests Game canvas', () => {
  let gameCanvas;
  beforeEach(() => {
    let onViewMapClick = jest.fn();
    let onViewMapMove = jest.fn();
    let onMiniMapClick = jest.fn();

    gameCanvas = new GameCanvas({
      mapHeight: 100,
      mapWidth: 100,
      viewHeight: 50,
      viewWidth: 50,
      onViewMapClick,
      onViewMapMove,
      onMiniMapClick
    });
  });

  it('renders', () => {
    let result = gameCanvas.getNewCanvasPairs({});
    expect(result.map.type).toBe('canvas');
    expect(result.minimap.type).toBe('canvas');
  });
});