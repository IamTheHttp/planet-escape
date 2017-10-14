/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Entity from 'gameEngine/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import {loadImages, oneOutOf} from 'shared/utils';
import fighter from 'assets/fighter.png';
import planets from 'assets/planets.png';

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('loads images and runs callback after images are loaded..', (done) => {
    loadImages([fighter, planets], () => {
      done();
    });
  });

  it('triggers the function one out of...', () => {
    global.Math.random = () => {
      return 0.99; // any number from 0.9 to 0.99 will do
    };
    expect(oneOutOf(10, () => {})).toBe(true);

    global.Math.random = () => {
      return 0.89; // any number from 0.9 to 0.99 will do
    };
    expect(oneOutOf(10, () => {})).toBe(false);
  });
});