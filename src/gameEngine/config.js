import {
  COLORS,
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  PLAYER_3,
  DEFAULT,
  MAP_SIZE,
  TINY,
  SMALL,
  MEDIUM,
  LARGE,
  PLANETS_IN_MAP,
  CANVAS_X,
  CANVAS_Y,
  PLANET_BUFFER,
  AI_MIN_FIGHTERS,
  DEFAULT_FIGHTER_COUNT,
  NUM_PLAYERS,
  PLANET_RADIUS,
  EASY,
  CHALLENGING,
  HARD,
  DIFFICULTY,
  AI_DECISION_RATE
} from './constants.js';

export default {
  [PLANET_RADIUS] : 30,
  [NUM_PLAYERS] : 2,
  [AI_MIN_FIGHTERS] : 5,
  [DEFAULT_FIGHTER_COUNT] : 10,
  [COLORS]:{
    [NEUTRAL] : 'rgba(128, 128, 128, 1)',
    [PLAYER_1] : 'rgba(0, 255, 0, 1)',
    [PLAYER_2] : 'rgba(255, 0, 0, 1)',
    [PLAYER_3] : 'rgba(0, 0, 255, 1)',
    [DEFAULT]  : 'black'
  },
  [DIFFICULTY] : {
    [EASY]: {
      [AI_DECISION_RATE] : 120
    },
    [CHALLENGING] : {
      [AI_DECISION_RATE] : 100
    },
    [HARD] : {
      [AI_DECISION_RATE] : 80
    }
  },
  [MAP_SIZE] : {
    [TINY] : {
      [PLANETS_IN_MAP] : 10,
      [CANVAS_X] : 1920 / 2,
      [CANVAS_Y] : 1080 / 2,
      [PLANET_BUFFER] : 2
    },
    [SMALL] : {
      [PLANETS_IN_MAP] : 18,
      [CANVAS_X] : 1920 * 3 / 4,
      [CANVAS_Y] : 1080 * 3 / 4,
      [PLANET_BUFFER] : 2
    },
    [MEDIUM] : {
      [PLANETS_IN_MAP] : 38,
      [CANVAS_X] : 1920,
      [CANVAS_Y] : 1080,
      [PLANET_BUFFER] : 2
    },
    [LARGE] : {
      [PLANETS_IN_MAP] : 82,
      [CANVAS_X] : 1920 * 2,
      [CANVAS_Y] : 1080 * 2,
      [PLANET_BUFFER] : 2
    }
  }
};



