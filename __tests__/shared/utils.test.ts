import {loadImages, oneOutOf, generateMap} from 'shared/utils';
import fighter from '../../src/assets/fighter.png';
import planets from '../../src/assets/planets.png';
import {
  POSITION
} from 'gameEngine/constants.js';
import {Entity, entityLoop} from "game-platform";
import {BaseEntity} from "../../src/gameEngine/BaseEntity";
import {ILevelData} from "../../src/interfaces/interfaces";

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
    let levelData:ILevelData = {
      order: null,
      hints: null,
      key: null,
      mapScale:null,
      planetsInMap: null,
      width : 100,
      height: 200,
      buffer : 2,
      planets: [
        {
          player: 'guest',
          type : 'earthLike',
          position : {
            angle:null,
            name: null,
            destX: null,
            destY: null,
            radius: null,
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
    let levelData: ILevelData = {
      order: null,
      key: null,
      planets: null,
      hints: null,
      buffer: 2,
      height: 540,
      mapScale: 0.5,
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
    // @ts-ignore
    expect(generateMap({})).toBe(false);
    expect(generateMap(null)).toBe(false);
  });
});