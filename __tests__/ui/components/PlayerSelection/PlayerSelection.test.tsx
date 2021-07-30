
import {mount, ReactWrapper, shallow} from 'enzyme';
import React from 'react';
import PlayerSelection from 'ui/components/PlayerSelection/PlayerSelection';
import CreateNewPlayer from 'ui/components/PlayerSelection/CreateNewPlayer';
import {playerService} from 'services/PlayerService';

describe('Tests a component', () => {
  let wrapper: ReactWrapper<PlayerSelection>;

  beforeEach(() => {
    playerService.reset();
    wrapper = mount(<PlayerSelection
      onPlayerDelete={null}
      onPlayerSelect={null}
    />);
  });

  it('Shows the create player dialog', () => {
    expect(wrapper.find('input').length).toBe(1);

    playerService.createPlayer('Foo');

    wrapper = mount(<PlayerSelection
      onPlayerDelete={null}
      onPlayerSelect={null}
    />);
    expect(wrapper.find('input').length).toBe(0);
  });

  it('call the right callback when selecting a user', (done) => {
    playerService.createPlayer('foo');
    playerService.createPlayer('bar');

    wrapper = mount(<PlayerSelection
      onPlayerDelete={null}
      onPlayerSelect={(player) => {
        expect(player.userName).toBe('foo');
        done();
      }}
    />);

    wrapper.find('.nonSelectedUser').first().simulate('click');
  });

  it('Rendering without a player selected allows and delete a player', (done) => {
    playerService.createPlayer('foo');
    playerService.createPlayer('bar');
    playerService.deletePlayer('bar');

    expect(playerService.getSelectedPlayer()).toBeFalsy();
    wrapper = mount(<PlayerSelection
      onPlayerSelect={null}
      onPlayerDelete={() => {
        expect(playerService.getPlayer('foo')).toBeFalsy();
        done();
      }}
    />);

    wrapper.find('.delete').first().simulate('click');
  });

  it('Rendering without a player selected allows and delete a player', () => {
    playerService.createPlayer('foo');
    const wrapper = mount<PlayerSelection>(<PlayerSelection

      onPlayerDelete={null}
      onPlayerSelect={null}
    />);

    expect(wrapper.instance().state.createUser).toBe(false);
    wrapper.find('.createPlayerBtn').first().simulate('click');
    expect(wrapper.find(CreateNewPlayer).length).toBe(1);
    expect(wrapper.instance().state.createUser).toBe(true);
  });
});