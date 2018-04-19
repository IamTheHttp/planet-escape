/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import CanvasMap from 'ui/components/CanvasMap/CanvasMap';
import gameConfig from 'gameEngine/config';
import {
  MEDIUM,
  MAP_SIZE
} from 'gameEngine/constants';
describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
  });

  it('should dispatch an action when mouseUp happens', () => {
    let dispatch = jest.fn();
    let wrapper = mount(<CanvasMap
      dispatch={dispatch}
      mapSize={gameConfig[MAP_SIZE][MEDIUM]}
    ></CanvasMap>);

    wrapper.find('canvas').simulate('mouseDown');
    wrapper.find('canvas').simulate('mouseUp');
    expect(dispatch.mock.calls.length).toBeGreaterThan(0);
  });

  it('Tests nothing happens on mouseMove without mouseDown', () => {
    let dispatch = jest.fn();
    let wrapper = mount(<CanvasMap
      dispatch={dispatch}
      mapSize={gameConfig[MAP_SIZE][MEDIUM]}
    ></CanvasMap>);

    wrapper.find('canvas').simulate('mouseMove');
    expect(wrapper.instance().onMouseMove()).toBe(false);
  });


  it('should calculate the select box properly', () => {
    let wrapper = mount(<CanvasMap
      dispatch={() => {

      }}
      mapSize={gameConfig[MAP_SIZE][MEDIUM]}
    ></CanvasMap>);

    let instance = wrapper.instance();
    instance.x = 200;
    instance.y = 500;
    instance.onMouseDown();

    expect(instance.isMouseDown).toBe(true);
    let selectBox = instance.selectedBox;
    expect(selectBox.start.x).toBe(200);
    expect(selectBox.start.y).toBe(500);
    expect(selectBox.end.x).toBe(200);
    expect(selectBox.end.y).toBe(500);

    instance.x = 55;
    instance.y = 25;

    instance.onMouseMove();
    expect(instance.isMouseDown).toBe(true);
    expect(selectBox.start.x).toBe(200);
    expect(selectBox.start.y).toBe(500);
    expect(selectBox.end.x).toBe(55);
    expect(selectBox.end.y).toBe(25);

    instance.onMouseUp();
    expect(instance.isMouseDown).toBe(false);
  });

  it('should calculate the select box properly', () => {
    let wrapper = mount(<CanvasMap
      dispatch={() => {

      }}
      mapSize={gameConfig[MAP_SIZE][MEDIUM]}
    ></CanvasMap>);

    let instance = wrapper.instance();
    instance.x = 200;
    instance.y = 500;
    instance.onMouseDown();

    expect(instance.isMouseDown).toBe(true);
    let selectBox = instance.selectedBox;
    expect(selectBox.start.x).toBe(200);
    expect(selectBox.start.y).toBe(500);
    expect(selectBox.end.x).toBe(200);
    expect(selectBox.end.y).toBe(500);

    instance.x = 55;
    instance.y = 25;

    instance.onMouseMove();
    expect(instance.isMouseDown).toBe(true);
    expect(selectBox.start.x).toBe(200);
    expect(selectBox.start.y).toBe(500);
    expect(selectBox.end.x).toBe(55);
    expect(selectBox.end.y).toBe(25);

    instance.onMouseLeave();
    expect(instance.isMouseDown).toBe(false);
  });

  it('Should test updateCursorPosition', () => {
    let wrapper = mount(<CanvasMap
      dispatch={() => {

      }}
      mapSize={gameConfig[MAP_SIZE][MEDIUM]}
    ></CanvasMap>);

    let instance = wrapper.instance();
    // we have some requirements...
    // a canvas with a px based height,width
    // and a boundingRect that's twice as big, for scaling..
    instance.canvas = {
      width: 100,
      height : 100,
      offsetWidth : 0,
      offsetHeight : 0,
      getBoundingClientRect() {
        return {
          width: 200,
          height : 200,
          left: 0,
          top: 0
        };
      }
    };

    instance.canvasAPI = {
      getPan() {
        return {
          panX: 0,
          panY: 0
        };
      }
    };

    // simulate a click on 15/15
    let event = {
      clientX : 20,
      clientY : 20
    };

    instance.updateCursorPosition(event);
    // we clicked on 20,20 on the client, however the canvas is actually scaled.
    // this means that while the canvas is 100/100, it's size on the screen is 200/200
    // since the canvas is bigger, every "real" pixel counts "less"
    // the exact math is handled in this function, and it scales the X and Y
    // s
    expect(instance.x).toBe(10);
    expect(instance.y).toBe(10);
  });
});