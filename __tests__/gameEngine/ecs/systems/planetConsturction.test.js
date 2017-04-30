/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import planetConstructionSystem from 'gameEngine/ecs/systems/planetConstructionSystem';
import {canAfford,buildQueue} from 'gameEngine/ecs/systems/planetConstructionSystem';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import Farm from 'gameEngine/ecs/entities/planetBuildings/Farm';
import CostsComponent from 'gameEngine/ecs/components/CostsComponent'
import Treasury from 'gameEngine/ecs/entities/Treasury';
import {GOLD_COMP,BUILDINGS_COMP} from 'gameEngine/constants';
describe('Tests the construction system', function () {

  beforeEach(function () {
    //setup the test
  });

  it('test no costs components - means we can afford it', function () {
    let treasury = new Treasury();

    let canAff = canAfford(treasury);
    expect(canAff).toBe(true);
  });

  it('test canAfford', function () {
    let treasury = new Treasury();

    let costs = new CostsComponent({[GOLD_COMP]:5});
    treasury.components[GOLD_COMP].value = 10;

    let canAff = canAfford(treasury,costs);
    expect(canAff).toBe(true);

    canAff = canAfford(treasury,costs,true);//spend == true
    expect(treasury.components[GOLD_COMP].value).toBe(5);
    expect(canAff).toBe(true);
  });

  it('tests cannot afford', function () {
    let treasury = new Treasury();

    let costs = new CostsComponent({[GOLD_COMP]:10});
    treasury.components[GOLD_COMP].value = 5;

    let canAff = canAfford(treasury,costs);
    expect(canAff).toBe(false);

    canAff = canAfford(treasury,costs,true);//spend == true
    expect(treasury.components[GOLD_COMP].value).toBe(5); //no change, since we can't afford
    expect(canAff).toBe(false);
  });

  it('tests planetConstructionSystem',function(){
    let treasury = new Treasury();
    let planet = new EarthLike('p',1);

    treasury.components[GOLD_COMP].value = 9999999;
    planet.components[BUILDINGS_COMP].inProgress.push(new Farm());

    let entities = {
      0 : treasury,
      1 : planet
    };

    planetConstructionSystem(entities);
    expect(planet.components[BUILDINGS_COMP].inProgress.length).toBe(0);
    expect(planet.components[BUILDINGS_COMP].built.length).toBe(1);
  });

  it('tests planetConstructionSystem',function(){
    let treasury = new Treasury();
    let planet = new EarthLike('p',1);

    treasury.components[GOLD_COMP].value = 0;
    planet.components[BUILDINGS_COMP].inProgress.push(new Farm());

    let entities = {
      0 : treasury,
      1 : planet
    };

    planetConstructionSystem(entities);
    expect(planet[BUILDINGS_COMP].inProgress.length).toBe(0);
    expect(planet[BUILDINGS_COMP].built.length).toBe(0);
  });
});