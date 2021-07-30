import {
  COLORS,
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  PLAYER_3,
  DEFAULT,
  AI_MIN_FIGHTERS,
  DEFAULT_FIGHTER_COUNT,
  NUM_PLAYERS,
  PLANET_RADIUS,
  EASY,
  CHALLENGING,
  HARD,
  DIFFICULTY,
  AI_DECISION_RATE,
  FIGHTER_BUILD_RATE,
  FIGHTER_RADIUS,
  FIGHTER_SPEED,
  MAIN_VIEW_SIZE_X,
  MAIN_VIEW_SIZE_Y,
  PLAYER_PLANET_GUTTER_DISTANCE,
  SELECT_WIDTH,
  STRESS_TEST
} from './constants';

export const gameConfig = {
  [SELECT_WIDTH] : 3,
  [PLANET_RADIUS] : 40,
  [FIGHTER_RADIUS] : 10,
  [NUM_PLAYERS] : 2,
  [AI_MIN_FIGHTERS] : 5,
  [DEFAULT_FIGHTER_COUNT] : 10,
  [FIGHTER_BUILD_RATE] : 60,
  [FIGHTER_SPEED] : 2,
  [COLORS]:{
    [NEUTRAL] : 'rgba(128, 128, 128, 1)',
    [PLAYER_1] : 'rgba(0, 255, 0, 1)',
    [PLAYER_2] : 'rgba(255, 0, 0, 1)',
    [PLAYER_3] : 'rgba(0, 0, 255, 1)',
    [DEFAULT]  : 'black'
  } as Record<string| number, string>,
  [DIFFICULTY] : {
    [EASY]: {
      [AI_DECISION_RATE] : 120
    },
    [CHALLENGING] : {
      [AI_DECISION_RATE] : 100
    },
    [HARD] : {
      [AI_DECISION_RATE] : 80
    },
    [STRESS_TEST] : {
      [AI_DECISION_RATE] : 10
    }
  },
  [PLAYER_PLANET_GUTTER_DISTANCE] : 50,
  [MAIN_VIEW_SIZE_X] : 1920 / 2,
  [MAIN_VIEW_SIZE_Y] : 1080 / 2
};


export interface IDifficulty {
  [AI_DECISION_RATE] : number
}



