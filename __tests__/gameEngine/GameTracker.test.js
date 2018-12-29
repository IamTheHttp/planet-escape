/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';

import {GameTracker} from 'gameEngine/GameTracker';

describe('Tests a component', () => {
  let gameTracker;

  beforeEach(() => {
    gameTracker = new GameTracker();
  });

  it('renders', () => {
    expect(gameTracker.actions).toEqual({});

    gameTracker.track('startGame');
    gameTracker.track('startGame');
    gameTracker.track('startGame');
    gameTracker.track('startGame');

    expect(gameTracker.getReport().startGame.count).toBe(4);

    gameTracker.reset();
    expect(gameTracker.actions.startGame).toBeUndefined();
  });
});