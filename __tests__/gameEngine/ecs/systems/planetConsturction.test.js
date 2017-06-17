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
import Player from 'gameEngine/ecs/entities/Player';
import {GOLD_RESOURCE,BUILDINGS_COMP,TREASURY_COMP} from 'gameEngine/constants';
describe('Tests the construction system', function () {

  beforeEach(function () {
    //setup the test
  });

  it('test no costs components - means we can afford it', function () {
    let player = new Player();

    let canAff = canAfford(player);
    expect(canAff).toBe(true);
  });

  it('test canAfford', function () {
    let player = new Player();

    let costs = new CostsComponent({[GOLD_RESOURCE]:5});
    player[TREASURY_COMP].items[GOLD_RESOURCE] = 10;

    let canAff = canAfford(player,costs);
    expect(canAff).toBe(true);

    canAff = canAfford(player,costs,true);//spend == true
    expect(player[TREASURY_COMP].items[GOLD_RESOURCE]).toBe(5);
    expect(canAff).toBe(true);
  });

  it('tests cannot afford', function () {
    let player = new Player();

    let costs = new CostsComponent({[GOLD_RESOURCE]:10});
    player[TREASURY_COMP].items[GOLD_RESOURCE] = 5;


    let canAff = canAfford(player,costs);
    expect(canAff).toBe(false);

    canAff = canAfford(player,costs,true);//spend == true
    expect(player[TREASURY_COMP].items[GOLD_RESOURCE]).toBe(5); //no change, since we can't afford
    expect(canAff).toBe(false);
  });

  it('tests planetConstructionSystem',function(){
    let player = new Player();
    let planet = new EarthLike('p',1);

    player[TREASURY_COMP].items[GOLD_RESOURCE] = 9999999999;
    planet.components[BUILDINGS_COMP].inProgress.push(new Farm());

    let entities = {
      0 : player,
      1 : planet
    };

    planetConstructionSystem(entities);
    expect(planet.components[BUILDINGS_COMP].inProgress.length).toBe(0);
    expect(planet.components[BUILDINGS_COMP].built.length).toBe(1);
  });

  it('tests planetConstructionSystem',function(){
    let player = new Player();
    let planet = new EarthLike('p',1);

    player[TREASURY_COMP].items[GOLD_RESOURCE] = 0;
    planet.components[BUILDINGS_COMP].inProgress.push(new Farm());

    let entities = {
      0 : player,
      1 : planet
    };

    planetConstructionSystem(entities);
    expect(planet[BUILDINGS_COMP].inProgress.length).toBe(0);
    expect(planet[BUILDINGS_COMP].built.length).toBe(0);
  });
});