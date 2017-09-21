/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {
  drawMouseSelection
} from 'ui/components/CanvasMap/utils/drawMouseSelection';

describe('Tests the drawMouseSelection', () => {
  let getMock = () => {
    return {
      moveTo : jest.fn(),
      beginPath : jest.fn(),
      arc : jest.fn(),
      stroke : jest.fn(),
      fill : jest.fn(),
      closePath : jest.fn(),
      setLineDash : jest.fn(),
      rect : jest.fn()
    };
  };

  beforeEach(() => {
    // setup the test
  });

  it('draws the entity', () => {
    let mockCtx = getMock();
    let selection = {
      start : {x:100, y:100},
      end : {x:200, y:200}
    };

    drawMouseSelection(mockCtx, selection);
    expect(mockCtx.rect.mock.calls.length).toBe(1);
    expect(mockCtx.rect.mock.calls[0]).toEqual([100, 100, 100, 100]);
  });
});