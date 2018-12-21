/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlayerSelection from 'ui/components/PlayerSelection/PlayerSelection';
import CreateNewPlayer from 'ui/components/PlayerSelection/CreateNewPlayer';


describe('Tests a component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<PlayerSelection
    ></PlayerSelection>);
  });

  it('Shows the selection option', () => {
    expect(wrapper.find('.createUserBtn').length).toBe(1);
    expect(wrapper.find(CreateNewPlayer).length).toBe(0);

    wrapper.find('.createUserBtn').simulate('click');
    expect(wrapper.find(CreateNewPlayer).length).toBe(1);
  });
});