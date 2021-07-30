
import Entity from '../../src/lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import {loadImages, oneOutOf, generateMap} from 'shared/utils';
import fighter from '../../src/assets/fighter.png';
import planets from '../../src/assets/planets.png';
import entityLoop from 'lib/ECS/util/entityLoop';
import {
  POSITION
} from 'gameEngine/constants.js';

describe('Tests a component', () => {
  let rand = global.Math.random;

  beforeEach(() => {
    Entity.reset();
    global.Math.random = rand;
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

  it ('generateMap works as expected with planets in levelData', () => {
    let levelData = {
      width : 100,
      height: 200,
      buffer : 2,
      planets: [
        {
          type : 'earthLike',
          player : 1,
          position : {
            x: 100,
            y: 100
          },
          fighters: 100
        }
      ]
    };

    generateMap(levelData);

    let entsWithPos = entityLoop(Entity.entities, (ent:BaseEntity) => {
      return ent[POSITION] && ent[POSITION].x > 0;
    });

    expect(entsWithPos.length).toBe(101); // like the planets + fighters
  });

  it('generateMap works as expected with planetsInMap in levelData', () => {
    let levelData = {
      buffer: 2,
      height: 540,
      mapScale: '0.5',
      planetsInMap: 4,
      width: 960
    };

    generateMap(levelData);

    let entsWithPos = entityLoop(Entity.entities, (ent:BaseEntity) => {
      return ent[POSITION] && ent[POSITION].x > 0;
    });

    expect(entsWithPos.length).toBe(4); // like the planets
  });

  it ('fails validation with invalid data levelData', () => {
    expect(generateMap({})).toBe(false);
    expect(generateMap(null)).toBe(false);
  });
});