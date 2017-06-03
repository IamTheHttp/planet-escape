/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import dispatchMove from 'ui/components/CanvasMap/utils/dispatchMove'
describe('Tests a component', function () {
    beforeEach(function () {
        //setup the test
    });
    it('runs the function', function () {
      let obj = {
        props : {
          dispatch: jest.fn()
        },
        x : 500,
        y : 500
      };
      let result = dispatchMove(obj);
      let event = {
        key : 'm'
      };
      result(event);
      expect(obj.props.dispatch.mock.calls.length).toBe(1);

      event = {
        key : 'mxx'
      };
      result(event);
      // still 1
      expect(obj.props.dispatch.mock.calls.length).toBe(1);

    });
});