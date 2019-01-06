import Player from 'gameEngine/entities/Player';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {getFighters} from 'gameEngine/components/HasFighters';
import logger from 'shared/logger';
import {
  PLAYER_1,
  PLAYER_2,
  NEUTRAL,
  CANVAS_X,
  CANVAS_Y,
  PLAYER_PLANET_GUTTER_DISTANCE,
  PLANETS_IN_MAP,
  PLANET_BUFFER,
  DEFAULT_FIGHTER_COUNT
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';
import placeEntities from 'shared/placementUtil';

export function randFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// we manually add planets at the end of the drawing, for the player positions
// TODO this feels strange here
const MANUALLY_ADDED_PLANETS = 2;



export function validateLevelData(levelData) {
  try {
    let hasWidth = levelData.width > 0;
    let hasHeight = levelData.height > 0;
    let hasBuffer = levelData.buffer > 0;
    let hasPlanetsInMap = levelData.planetsInMap || levelData.planets;
    return hasWidth && hasHeight && hasBuffer && hasPlanetsInMap;
  } catch (e) {
    return false;
  }
}

// This method manipulates global variables
// (it creates entities and gives them positions)
// since entities are global, this is a problem
export function generateMap(levelData) {
  if (!validateLevelData(levelData)) {
    logger.error('Invalid level data!', levelData);
    return false;
  }

  let buffer = levelData.buffer;
  let planetsToGenerate; // by default, we don't need to generate anything

  if (levelData.planets) {

  } else {
    planetsToGenerate = levelData.planetsInMap - MANUALLY_ADDED_PLANETS;
  }


  new Player(PLAYER_1);

  // generate planets
  let count = 0;
  let planets = {};


  if (levelData.planets) {
    levelData.planets.forEach((planetData) => {
      let planet = new EarthLike(planetData.position.x, planetData.position.y, planetData.player);
      planets[planet.id] = planet;

      while (getFighters(planet).length < planetData.fighters) {
        new Fighter(planet, false);
      }
    });
  } else {
    while (count < planetsToGenerate) {
      let planet = new EarthLike(null, null, NEUTRAL);
      planets[planet.id] = planet;
      while (getFighters(planet).length < gameConfig[DEFAULT_FIGHTER_COUNT]) {
        new Fighter(planet, false);
      }
      count++;
    }
  }

  let area = {
    topLeftAreaX : 0,
    topLeftAreaY : 0,
    bottomRightAreaX : levelData.width,
    bottomRightAreaY : levelData.height
  };

  // TODO - Possible planet overlapping as we assign planet location manually

  if (levelData.planets) {
    // do nothing, if planets area already provided, we do not create anything here
  } else {
    let gutter = gameConfig[PLAYER_PLANET_GUTTER_DISTANCE];
    let p1 = new EarthLike(gutter, gutter, PLAYER_1);
    // *2 to adjust for the menu button location.. silly but it works :)
    let p2 = new EarthLike(levelData.width - gutter * 2, levelData.height - gutter * 2, PLAYER_2);
    planets[p1.id] = p1;
    planets[p2.id] = p2;
  }

  // placeEntities can accept a situation where entities are already placed..
  placeEntities(planets, area, buffer);
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

