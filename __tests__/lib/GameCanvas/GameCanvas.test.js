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

  it('tests updateCursorPosition', () => {
    let event = {
      clientX : 10,
      clientY : 10
    };
    let canvas = {
      width: 100,
      height : 100,
      getBoundingClientRect() {
        return {
          left : 0,
          top : 0,
          width: 100,
          height: 100
        };
      }
    };
    let canvasAPI = {
      getPan() {
        return {
          panX : 0,
          panY : 0
        };
      }
    };

    let result = gameCanvas.updateCursorPosition(event, canvas, canvasAPI);
    expect(result.x).toBe(10);
    expect(result.y).toBe(10);
  });

  it('tests handleMapMouseMove', () => {
    gameCanvas.isMouseDown = true;
    gameCanvas.viewMapX = 10;
    gameCanvas.viewMapY = 15;
    gameCanvas.handleMapMouseMove();
    let fnArg = gameCanvas.onViewMapMove.mock.calls[0][0];
    expect(fnArg.x).toBe(10);
    expect(fnArg.y).toBe(15);
    expect(fnArg.isMouseDown).toBe(true);

    gameCanvas.isMouseDown = false;
    gameCanvas.handleMapMouseMove();
    fnArg = gameCanvas.onViewMapMove.mock.calls[1][0];
    expect(fnArg.isMouseDown).toBe(false);
  });

  it('tests handleMapMouseUp', () => {
    gameCanvas.viewMapX = 10;
    gameCanvas.viewMapY = 15;
    gameCanvas.lastTap = true;
    gameCanvas.handleMapMouseUp();
    expect(gameCanvas.onViewMapClick.mock.calls.length).toBe(0);

    gameCanvas.lastTap = false;
    gameCanvas.handleMapMouseUp();
    let fnArg = gameCanvas.onViewMapClick.mock.calls[0][0];
    expect(fnArg.x).toBe(10);
    expect(fnArg.y).toBe(15);
  });
});