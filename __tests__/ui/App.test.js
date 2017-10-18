/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import App from 'ui/App';
import {
  GAME_STATE,
  GAME_LOST,
  GAME_WON
} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
        // setup the test
    jest.clearAllTimers();
  });

  jest.useFakeTimers();

  it('Expects to run without issues', (done) => {
    let wrapper = mount(<App></App>);
    wrapper.setState({
      // gameEnt : {
      //   [GAME_STATE] : {
      //     status : GAME_WON
      //   }
      // },
      // isMenuOpen : false
    }, () => {
      wrapper.instance().startGame();
      jest.runOnlyPendingTimers();
      done();
    });
  });

  it('Expects the popup to open as the game is lost..', () => {
    let wrapper = mount(<App></App>);
    wrapper.setState({
      gameEnt : {
        [GAME_STATE] : {
          status : GAME_LOST
        }
      },
      isMenuOpen : false
    });

    let inst = wrapper.instance();
    expect(wrapper.find('.modal-dialog').length).toBe(1);
  });

  it('Expects the popup to open as the game is lost..', () => {
    let wrapper = mount(<App></App>);
    wrapper.setState({
      gameEnt : {
        [GAME_STATE] : {
          status : GAME_WON
        }
      },
      isMenuOpen : false
    });

    let inst = wrapper.instance();
    expect(wrapper.find('.modal-dialog').length).toBe(1);
  });
});