/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import treasuryUpdateSystem from 'gameEngine/ecs/systems/treasuryUpdateSystem';

import IncomeComponent from 'gameEngine/ecs/components/IncomeComponent';
import TreasuryComponent from 'gameEngine/ecs/components/TreasuryComponent';
import PopulationComponent from 'gameEngine/ecs/components/PopulationComponent';
import Entity from 'gameEngine/ecs/Entity';
import {
  TREASURY_COMP,
  GOLD_RESOURCE,
  INCOME_COMP
} from 'gameEngine/constants';

describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('reflects income correctly', function () {

      let ent1 = new Entity();
      let ent2 = new Entity();
      ent1.addComponent(new TreasuryComponent());
      ent1.addComponent(new PopulationComponent());
      ent1.addComponent(new IncomeComponent());
      ent2.addComponent(new IncomeComponent());

      ent2[INCOME_COMP].value = 1000;
      let ents = {
        [ent1.id] : ent1,
        [ent2.id] : ent2,
      };
      treasuryUpdateSystem(ents);

      expect(ent1[INCOME_COMP].value).toBe(1000);

      let initialGold = ent1[TREASURY_COMP].items[GOLD_RESOURCE];

      //now we need 200 loops so we can accurately collect the gold
      //this loops without needing the number 200.
      while(initialGold === ent1[TREASURY_COMP].items[GOLD_RESOURCE]){
        treasuryUpdateSystem(ents);
      }
      expect(ent1[TREASURY_COMP].items[GOLD_RESOURCE]).toBe(1000);
    });
});