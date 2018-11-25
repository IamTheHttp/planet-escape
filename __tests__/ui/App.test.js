/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import App from 'ui/App';
import {
  MAP_SIZE,
  TINY,
  DIFFICULTY,
  EASY
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
    wrapper.instance().difficulty = gameConfig[DIFFICULTY][EASY];
    wrapper.setState({
      isMenuOpen : false,
      gameStarted : true
    }, () => {
      wrapper.instance().startGame(gameConfig[MAP_SIZE][TINY], gameConfig[DIFFICULTY][EASY]);
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      done();
    });
  });

  it('Expects the popup to open as the game is lost..', () => {
    let wrapper = mount(<App></App>);
    let inst = wrapper.instance();

    inst.mapSize = gameConfig[MAP_SIZE][TINY];
    inst.difficulty = gameConfig[DIFFICULTY][EASY];
    inst.game = {
      stop : () => {}
    };

    wrapper.setState({
      isMenuOpen : false,
      gameStarted : true,
      gameWon : false,
      gameReport : {}
    });

    expect(wrapper.find('.modal-dialog').length).toBe(1);
  });

  it('Expects the popup to open as the game is won..', () => {
    let wrapper = mount(<App></App>);
    let inst = wrapper.instance();

    inst.mapSize = gameConfig[MAP_SIZE][TINY];
    inst.difficulty = gameConfig[DIFFICULTY][EASY];
    inst.game = {
      stop : () => {}
    };

    wrapper.setState({
      isMenuOpen: false,
      gameStarted: true,
      gameWon: true,
      gameReport: {}
    });

    expect(wrapper.find('.modal-dialog').length).toBe(1);
  });
});