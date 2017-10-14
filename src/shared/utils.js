import Mothership from 'gameEngine/entities/Ships/Mothership';
import Player from 'gameEngine/entities/Player';
import EarthLike from 'gameEngine/entities/planets/EarthLike';

import {
  PLAYER_1,
  PLAYER_2,
  CANVAS_X,
  CANVAS_Y
} from 'gameEngine/constants';

import {
  entityPlacer
} from 'shared/placementUtil';

export function randFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMap(planetCount, buffer = 1) {
  let planetsToGenerate = planetCount >= 0 ? planetCount : 30;
  new Player(PLAYER_1);

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
    bottomRightAreaX: CANVAS_X,
    bottomRightAreaY : CANVAS_Y
  };
  // let motherShip = new Mothership(null, null, PLAYER_1);
  // planets[motherShip.id] = motherShip;
  entityPlacer(planets, area, buffer);
}


export function byKey(key, value) {
  return (obj) => {
    return obj[key] === value;
  };
}

/**
 * Runs the callback one out of X tries, this is a statistical function used in a loop
 */
export function oneOutOf(chance, cb) {
  // the -1 here is because the max range will only happen if Math.random outputs 1 - very unlikely
  if (randFromRange(0, chance) === chance - 1) {
    cb();
    return true;
  } else {  // chance === 5, this picks a number between 0 and 5.
    return false;
  }
}

export function loadImages(imagePaths, callback) {
  let imagesToLoad = imagePaths;
  let imagesLoaded = 0;

  function renderOnReady() {
    if (imagesLoaded === imagesToLoad.length) {
      callback();
    }
  }

  imagesToLoad.forEach((imagePath) => {
    let img = new Image();
    img.onload = () => {
      imagesLoaded++;
      renderOnReady();
    };
    img.src = imagePath;
  });
}

