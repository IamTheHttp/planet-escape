/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import MainView from 'ui/MainView';
describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
      jest.clearAllTimers()
    });

  jest.useFakeTimers();

  it('renders the main view and bootstraps the game', function () {
      let wrapper = mount(<MainView></MainView>);
      jest.runOnlyPendingTimers();
      expect(Object.keys(wrapper.state().planetSection).length).toBe(1);

      wrapper.instance().selectPlanet(5);
      expect(wrapper.state().selectedEntity).toBe(5);
    });
});