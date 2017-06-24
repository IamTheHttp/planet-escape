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

  it('should dispatch an action when click happens', () => {
    let dispatch = jest.fn();
    let wrapper = mount(<CanvasMap
      dispatch={dispatch}
    ></CanvasMap>);

    wrapper.find('canvas').simulate('click');
    expect(dispatch.mock.calls.length).toBeGreaterThan(0);
  });
});