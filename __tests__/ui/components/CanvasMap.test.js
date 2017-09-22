/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import CanvasMap from 'ui/components/CanvasMap/CanvasMap';
describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
  });

  it('should dispatch an action when mouseUp happens', () => {
    let dispatch = jest.fn();
    let wrapper = mount(<CanvasMap
      dispatch={dispatch}
    ></CanvasMap>);

    wrapper.find('canvas').simulate('mouseDown');
    wrapper.find('canvas').simulate('mouseUp');
    expect(dispatch.mock.calls.length).toBeGreaterThan(0);
  });

  it('should calculate the select box properly', () => {
    let wrapper = mount(<CanvasMap
      dispatch={() => {

      }}
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
});