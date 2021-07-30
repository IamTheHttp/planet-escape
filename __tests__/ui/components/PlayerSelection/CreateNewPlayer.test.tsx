import {mount, ReactWrapper, shallow} from 'enzyme';
import React from 'react';
import CreateNewPlayer from 'ui/components/PlayerSelection/CreateNewPlayer';
import {playerService} from 'services/PlayerService';

describe('Tests a component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    playerService.reset();
    wrapper = mount(<CreateNewPlayer
        onSubmit={null}
      />
    );
  });

  it('Changes the input and submits the form', (done) => {
    wrapper = mount(<CreateNewPlayer
        onSubmit={(userName) => {
          expect(userName).toBe('abcdefg');
          done();
        }}
      />
    );

    wrapper.find('input').simulate('change', {
      target: {
        value: 'abcdefg'
      }
    });

    wrapper.find('button').simulate('click');
  });

  it('Shows proper errors if validation does not work', () => {
    wrapper = mount(<CreateNewPlayer
      onSubmit={null}
      />
    );

    // short input
    wrapper.find('input').simulate('change', {
      target: {
        value: 'a'
      }
    });

    // we expect to get the error
    expect(wrapper.find('.tooShort').length).toBe(1);

    // better input
    wrapper.find('input').simulate('change', {
      target: {
        value: 'aaaa'
      }
    });
    expect(wrapper.find('.tooShort').length).toBe(0);
  });

  it('fails when the player name is already taken', () => {
    playerService.createPlayer('patrick');

    wrapper.find('input').simulate('change', {
      target: {
        value: 'patrick'
      }
    });

    expect(wrapper.find('.tooShort').length).toBe(1);
  });

  it('Does not submit when input is too short', () => {
    let onSubmit = jest.fn();

    wrapper = mount(<CreateNewPlayer
        onSubmit={onSubmit}
      />
    );

    wrapper.find('input').simulate('change', {
      target: {
        value: 'a'
      }
    });

    wrapper.find('.createPLayerBtn').simulate('click');
    expect(onSubmit.mock.calls.length).toBe(0);

    wrapper.find('input').simulate('change', {
      target: {
        value: 'aaaaa'
      }
    });

    wrapper.find('.createPLayerBtn').simulate('click');
    expect(onSubmit.mock.calls.length).toBe(1);
  });
});