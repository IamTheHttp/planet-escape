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
import levels from 'levels/levels.json';
import playerService from 'services/PlayerService';
import i18n from 'ui/i18n';

describe('Tests a component', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    playerService.reset();
    jest.clearAllTimers();
  });

  it('Expects to run without issues', (done) => {
    let wrapper = mount(<App></App>);
    wrapper.instance().currentLevel = levels.random;
    wrapper.instance().difficulty = gameConfig[DIFFICULTY][EASY];
    wrapper.setState({
      isMenuOpen : false,
      gameStarted : true,
      selectedPlayer: true
    }, () => {
      wrapper.instance().startGame(levels.random, gameConfig[DIFFICULTY][EASY]);
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      done();
    });
  });

  it('Expects the popup to open as the game is lost..', () => {
    let wrapper = mount(<App></App>);
    let inst = wrapper.instance();

    inst.difficulty = gameConfig[DIFFICULTY][EASY];
    inst.game = {
      stop : () => {}
    };

    wrapper.setState({
      isMenuOpen : false,
      gameStarted : true,
      gameWon : false,
      selectedPlayer: true,
      gameReport : {}
    });

    expect(wrapper.find('.endGame').length).toBe(1);
  });

  it('Expects the popup to open as the game is won..', () => {
    let wrapper = mount(<App></App>);
    let inst = wrapper.instance();

    inst.difficulty = gameConfig[DIFFICULTY][EASY];
    inst.game = {
      stop : () => {}
    };

    wrapper.setState({
      isMenuOpen: false,
      gameStarted: true,
      gameWon: true,
      selectedPlayer: true,
      gameReport: {}
    });

    expect(wrapper.find('.endGame').length).toBe(1);
  });

  it('Expected game modal without proper state to return null', () => {
    let wrapper = mount(<App></App>);
    let inst = wrapper.instance();

    expect(inst.getGameEndModal()).toBe(null);
  });


  it('Expect the full create new player journey to work', () => {
    // app loads into the create user journey.
    // after user is created, we reidrect to home page.
    // user goes into the players list.
    // his name appears there as selected
    let wrapper = mount(<App></App>);

    // automaticall show the create user flow
    expect(wrapper.find('.createNewPlayer').length).toBe(1);

    wrapper.find('.playerUserName').simulate('change', {
      target: {
        value: 'patrick'
      }
    });

    wrapper.find('.createPLayerBtn').simulate('click');

    expect(wrapper.find('.mainMenu').length).toBe(1);

    wrapper.find('.goToPlayerSelection').simulate('click');

    expect(wrapper.find('.selectedUser').html().indexOf('patrick') >= 0).toBe(true);
    expect(wrapper.find('.selectedUser').find('.isActive').html().indexOf(i18n.selected) >= 0).toBe(true);
  });
});