/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import MainView from 'ui/MainView';
describe('Tests a component', () => {
  beforeEach(() => {
        // setup the test
    jest.clearAllTimers();
  });

  jest.useFakeTimers();

  it('expects by default that the player hsa no planets', () => {
    let wrapper = mount(<MainView></MainView>);
    jest.runOnlyPendingTimers();
    expect(Object.keys(wrapper.state().planetSection).length).toBeGreaterThan(0);

    wrapper.instance().selectPlanet(5);
    expect(wrapper.state().selectedEntity).toBe(5);
  });
});