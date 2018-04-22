/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Entity from '../../../src/lib/ECS/Entity';
import ai from 'gameEngine/systems/ai';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {getDest} from 'gameEngine/components/PositionComponent';
import {
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  AI_DECISION_RATE
} from 'gameEngine/constants';

describe('Tests a component', () => {
  let systemArguments;

  beforeEach(() => {
    // setup the test
    Entity.reset();
    systemArguments = {
      count : 0,
      difficulty : {
        [AI_DECISION_RATE] : 1
      }
    };
  });

  it('Tests that without enough fighters, the enemy planet does nothing', () => {
    let attacker = new EarthLike(80, 80, PLAYER_2);
    new Fighter(attacker);
    expect(ai(systemArguments)).toBe(false);
  });

  it('Tests that with enough fighters, the enemy planet tries to expand', () => {
    new EarthLike(100, 100, NEUTRAL);
    new EarthLike(50, 50, PLAYER_1);
    let attacker = new EarthLike(80, 80, PLAYER_2);

    let fighter1 = new Fighter(attacker);
    let fighter2 = new Fighter(attacker);
    let fighter3 = new Fighter(attacker);
    let fighter4 = new Fighter(attacker);
    let fighter5 = new Fighter(attacker);
    let fighter6 = new Fighter(attacker);

    ai(systemArguments);
    expect(getDest(fighter1).x).toBe(100);
    expect(getDest(fighter1).y).toBe(100);
    // expect(ai()).toBe(false);
  });

  it('Tests that with enough fighters and no neutrals, the enemy attacks', () => {
    new EarthLike(50, 50, PLAYER_1);
    let attacker = new EarthLike(80, 80, PLAYER_2);

    let fighter1 = new Fighter(attacker);
    let fighter2 = new Fighter(attacker);
    let fighter3 = new Fighter(attacker);
    let fighter4 = new Fighter(attacker);
    let fighter5 = new Fighter(attacker);
    let fighter6 = new Fighter(attacker);
    ai(systemArguments);
    expect(getDest(fighter1).x).toBe(50);
    expect(getDest(fighter1).y).toBe(50);
  });

  it('Tests that with enough fighters and two neutrals, enemy expands to closest', () => {
    new EarthLike(50, 50, PLAYER_1);

    new EarthLike(0, 0, NEUTRAL);
    new EarthLike(100, 100, NEUTRAL);
    new EarthLike(1000, 1000, NEUTRAL);
    let attacker = new EarthLike(80, 80, PLAYER_2);

    let fighter1 = new Fighter(attacker);
    let fighter2 = new Fighter(attacker);
    let fighter3 = new Fighter(attacker);
    let fighter4 = new Fighter(attacker);
    let fighter5 = new Fighter(attacker);
    let fighter6 = new Fighter(attacker);
    ai(systemArguments);
    expect(getDest(fighter1).x).toBe(100);
    expect(getDest(fighter1).y).toBe(100);
  });
});