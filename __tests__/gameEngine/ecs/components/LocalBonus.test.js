/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import LocalBonus from 'gameEngine/ecs/components/LocalBonusComponent';
describe('Tests a component', function () {

  beforeEach(function () {
    //setup the test
  });

  it('init new component', function () {
    let p = new LocalBonus(5);
    expect(p.bonuses).toEqual({});
  });
});