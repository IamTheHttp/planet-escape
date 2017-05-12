/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Game from 'gameEngine/Game';
import Entity from 'gameEngine/ecs/Entity';
describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('should only pass UI comps to the callback', function () {

      jest.useFakeTimers();
      let cbMock = jest.fn();
      let sampleID = (new Entity()).id; //no UI_COMP here
      new Game(cbMock);
      jest.runOnlyPendingTimers();
      //expect(cbMock.mock.calls[0])
      expect(cbMock.mock.calls[0][0][sampleID]).toBeUndefined();
    });
});