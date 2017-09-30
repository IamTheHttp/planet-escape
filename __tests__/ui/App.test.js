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

  it('Expects to run without issues', () => {
    let wrapper = mount(<App></App>);
    jest.runOnlyPendingTimers();
  });
});