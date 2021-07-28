
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import playerService, {PlayerService} from 'services/PlayerService';
import ls from 'lib/Storage/LocalStorage';


describe('Tests the playerService', () => {
  beforeEach(() => {
    playerService.reset();
  });

  it('Adds a player', () => {
    playerService.createPlayer('patrick');
    playerService.createPlayer('patrick2');
    playerService.createPlayer('patrick3');
    let player;

    player = playerService.getPlayer('patrick3');
    expect(player.userName).toBe('patrick3');

    expect(playerService.data.players[0].userName).toBe('patrick');
    expect(Object.keys(player.levelsPassed).length).toBe(0);
  });

  it('Selects a player', () => {
    playerService.createPlayer('patrick');
    playerService.selectPlayer('patrick');

    expect(playerService.getSelectedPlayer().userName).toBe('patrick');
  });

  it('Allows a user to finish a level, but only once, obviously', () => {
    expect(playerService.finishLevel('first_level')).toBe(false);
    playerService.createPlayer('patrick');
    playerService.selectPlayer('patrick');

    expect(playerService.finishLevel('first_level')).toBe(true);
    playerService.finishLevel('first_level');
    playerService.finishLevel('first_level');
    playerService.finishLevel('first_level');

    expect(Object.keys(playerService.getSelectedPlayer().levelsPassed).length).toBe(1);
    expect(Object.keys(playerService.getPlayer('patrick').levelsPassed).length).toBe(1);
  });

  it('Deletes a user, and also even when selected', () => {
    playerService.createPlayer('patrick');

    playerService.deletePlayer('patrick');
    expect(playerService.getPlayer('patrick')).toBeFalsy();

    playerService.createPlayer('patrick');
    playerService.createPlayer('patrick2');
    playerService.selectPlayer('patrick');
    playerService.deletePlayer('patrick');
    expect(playerService.getPlayer('patrick')).toBeFalsy();
    expect(playerService.getSelectedPlayer()).toBeFalsy();

    expect(playerService.getPlayer('patrick2')).not.toBeFalsy();
  });

  it('Does not select a user that does not exist', () => {
    expect(playerService.selectPlayer('patrick')).toBe(false);
  });


  it('loads correctly from localStorage', () => {
    let user = {
      userName : 'patrick',
      levelsPassed : []
    };

    ls.setJSON('PE', {
      selectedPlayer : user,
      players : [user]
    });

    let playerService = new PlayerService();
    expect(playerService.getSelectedPlayer().userName).toBe('patrick');
  });
});