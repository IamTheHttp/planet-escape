/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlayerSelection from 'ui/components/PlayerSelection/PlayerSelection';
import playerService from 'services/PlayerService';

describe('Tests a component', () => {
  let wrapper;

  beforeEach(() => {
    playerService.reset();
    wrapper = mount(<PlayerSelection
    ></PlayerSelection>);
  });

  it('Shows the create player dialog', () => {
    expect(wrapper.find('input').length).toBe(1);

    playerService.createPlayer('Foo');

    wrapper = mount(<PlayerSelection
    ></PlayerSelection>);
    expect(wrapper.find('input').length).toBe(0);
  });

  it('call the right callback when selecting a user', (done) => {
    playerService.createPlayer('foo');
    playerService.createPlayer('bar');

    wrapper = mount(<PlayerSelection
      onPlayerSelect={(player) => {
        expect(player.userName).toBe('foo');
        done();
      }}
    ></PlayerSelection>);

    wrapper.find('.nonSelectedUser').first().simulate('click');
  });
});