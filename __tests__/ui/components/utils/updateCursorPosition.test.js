/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import updateCursorPosition from 'ui/components/CanvasMap/utils/updateCursorPosition';
describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('runs the function', function () {

      let obj = {
        canvas : {
          height:100,
          width:100,
          offsetWidth : 100,
          offsetHeight:100,
          getBoundingClientRect : () => {
            return {
              left: 0,
              top: 0
            }
          }
        }
      };
      let fn = updateCursorPosition(obj);
      let event = {
        clientX : 20,
        clientY : 50
      };
      fn(event);
      expect(obj.x).toBe(20);
      expect(obj.y).toBe(50);
    });
});