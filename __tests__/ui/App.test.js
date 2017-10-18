/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import App from 'ui/App';
import {
  GAME_STATE,
  IN_PROGRESS,
  GAME_LOST,
  GAME_WON,
  MAP_SIZE,
  TINY
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';
describe('Tests a component', () => {
  jest.useFakeTimers();
  beforeEach(() => {
        // setup the test
    jest.clearAllTimers();
  });

  it('Expects to run without issues', (done) => {
    let wrapper = mount(<App></App>);
    wrapper.instance().mapSize = gameConfig[MAP_SIZE][TINY];
    wrapper.setState({
      isMenuOpen : false
    }, () => {
      wrapper.instance().startGame(gameConfig[MAP_SIZE][TINY]);
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      done();
    });
  });

  it('Expects the popup to open as the game is lost..', () => {
    let wrapper = mount(<App></App>);
    wrapper.instance().mapSize = gameConfig[MAP_SIZE][TINY];
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
    wrapper.instance().mapSize = gameConfig[MAP_SIZE][TINY];
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