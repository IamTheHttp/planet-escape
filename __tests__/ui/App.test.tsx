import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {
  MAP_SIZE,
  TINY,
  DIFFICULTY,
  EASY
} from 'gameEngine/constants';

import {gameConfig} from 'gameEngine/config';
import levels from 'levels/levels.json';
import {playerService} from 'services/PlayerService';
import i18n from 'ui/i18n';
import App from "../../src/ui/App";
import {ILevelData} from "../../src/interfaces/interfaces";

describe('Tests a component', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    playerService.reset();
    jest.clearAllTimers();
  });

  it('Expects to run without issues', (done) => {
    let wrapper = mount<App>(<App/>);
    wrapper.instance().difficulty = gameConfig[DIFFICULTY][EASY];
    wrapper.setState({
      currentLevel: levels.random,
      isMenuOpen: false,
      selectedPlayer: null
    }, () => {
      wrapper.instance().startGame(levels.random, gameConfig[DIFFICULTY][EASY]);
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      done();
    });
  });

  it('Expects the popup to open as the game is lost', () => {
    let wrapper = mount<App>(<App/>);
    let inst = wrapper.instance();

    inst.difficulty = gameConfig[DIFFICULTY][EASY];

    wrapper.setState({
      isMenuOpen: false,
      gameWon: false,
      selectedPlayer: {
        userName: 'foo',
        levelsPassed: {}
      },
      gameReport: {}
    });

    expect(wrapper.find('.endGame').length).toBe(1);
  });

  it('Expects the popup to open as the game is won..', () => {
    let wrapper = mount<App>(<App/>);
    let inst = wrapper.instance();

    inst.difficulty = gameConfig[DIFFICULTY][EASY];

    wrapper.setState({
      isMenuOpen: false,
      gameWon: true,
      selectedPlayer: {
        userName: 'foo',
        levelsPassed: {}
      },
      gameReport: {}
    });

    expect(wrapper.find('.endGame').length).toBe(1);
  });

  it('Expected game modal without proper state to return null', () => {
    let wrapper = mount<App>(<App/>);
    let inst = wrapper.instance();

    expect(inst.getGameEndModal()).toBe(null);
  });


  it('Shows the help module when the state is right', () => {
    playerService.createPlayer('Foo');
    let wrapper = mount<App>(<App/>);
    let inst = wrapper.instance();

    inst.setState({
      showHelp: true,
      currentLevel: {
        hints: []
      } as ILevelData,
      selectedPlayer: {
        userName: 'foo',
        levelsPassed: {}
      }
    });

    wrapper.update();
    expect(wrapper.find('.showHelp').length).toBe(1);
  });

  it('Show the paused menu with the right state', () => {
    playerService.createPlayer('Foo');
    let wrapper = mount<App>(<App/>);
    let inst = wrapper.instance();

    inst.setState({
      gamePaused: true,
      selectedPlayer: {
        userName: 'foo',
        levelsPassed: {}
      },
      currentLevel: null,
      isMenuOpen: false
    });

    wrapper.update();
    expect(wrapper.find('.gamePausedMenu').length).toBe(1);
  });

  it('Can stop and resume a game', (done) => {
    playerService.createPlayer('Foo');
    let wrapper = mount<App>(<App/>);
    let inst = wrapper.instance();

    inst.setState({
      gamePaused: true,
      selectedPlayer: null,
      currentLevel: null,
      isMenuOpen: false
    });


    inst.startGame(levels.random, gameConfig[DIFFICULTY][EASY]).then((game) => {
      inst.game = game; // this is usually done from the modal
      inst.pauseGame();

      expect(inst.state.gamePaused).toBe(true);
      expect(inst.state.showLevelHints).toBe(false);
      expect(inst.state.isMenuOpen).toBe(false);

      inst.stopGame();
      expect(inst.state.gameWon).toBe(null);
      expect(inst.state.isMenuOpen).toBe(true);
      expect(inst.state.gamePaused).toBe(false);
      expect(inst.state.gameEnded).toBe(true);
      expect(inst.state.showHelp).toBe(false);
      done();
    });
    jest.runOnlyPendingTimers();
  });

  it('Expect the full create new player journey to work', () => {
    // app loads into the create user journey.
    // after user is created, we reidrect to home page.
    // user goes into the players list.
    // his name appears there as selected
    let wrapper = mount<App>(<App/>);

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