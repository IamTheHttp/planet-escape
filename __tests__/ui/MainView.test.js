/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import App from 'ui/App';
describe('Tests a component', () => {
  beforeEach(() => {
        // setup the test
    jest.clearAllTimers();
  });

  jest.useFakeTimers();

  it('expects by default that the player has no planets', () => {
    let wrapper = mount(<App></App>);
    jest.runOnlyPendingTimers();
    // expect(Object.keys(wrapper.state().planetSection).length).toBeGreaterThan(0);
    //
    // wrapper.instance().selectPlanet(5);
    // expect(wrapper.state().selectedEntity).toBe(5);
  });
});