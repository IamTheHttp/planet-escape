import Mothership from 'gameEngine/entities/Ships/Mothership';
import Player from 'gameEngine/entities/Player';
import EarthLike from 'gameEngine/entities/planets/EarthLike';

import {
  PLAYER_1,
  PLAYER_2
} from 'gameEngine/constants';

import {
  entityPlacer
} from 'shared/placementUtil';

export function randFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateMap(planetCount) {
  let planetsToGenerate = planetCount >= 0 ? planetCount : 30;
  new Player(PLAYER_1);
  // 1200 x 1200 .. min distance is 45, heigt
  let count = 0;
  let planets = {};
  while (count < planetsToGenerate) {
    let player = count % 2 === 0 ? PLAYER_1 : PLAYER_2;
    let planet = new EarthLike('Braxis', 1, null, null, player);
    planets[planet.id] = planet;
    count++;
  }

  let area = {
    topLeftAreaX : 0,
    topLeftAreaY : 0,
    bottomRightAreaX: 1200,
    bottomRightAreaY : 1200
  };
  let motherShip = new Mothership(null, null, PLAYER_1);
  planets[motherShip.id] = motherShip;
  entityPlacer(planets, area);
}
