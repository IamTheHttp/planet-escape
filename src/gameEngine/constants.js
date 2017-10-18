
export const BUILDINGS_COMP = 'BUILDINGS';
export const OWNER_COMPONENT = 'OWNER';
export const SPRITE = 'SPRITE';
export const UI_COMP = 'UI';
export const PLAYER_CONTROLLED = 'PLAYER_CONTROLLED';
export const POSITION = 'POSITION';
export const MOVEMENT_COMP = 'MOVE';
export const HAS_FIGHTERS = 'HAS_FIGHTERS';
export const IS_DOCKED = 'IS_DOCKED';
export const CAN_ATTACK_PLANETS = 'CAN_ATTACK_PLANETS';
export const ATTACKABLE = 'ATTACKABLE';
export const GAME_STATE = 'GAME_STATE';
export const GAME = 'GAME';

export const IN_PROGRESS = 'IN_PROGRESS';
export const GAME_WON = 'GAME_WON';
export const GAME_LOST = 'GAME_LOST';



// UI comps sections
export const CANVAS = 'canvas';
export const PLANETS = 'planets';
export const SUMMARY = 'summary';
export const BUILDING_OPTIONS = 'buildingOptions';

// shapes
export const CIRCLE = 'circle';


// actions
export const SELECT = 'select';
export const MOVE = 'move';
export const ATTACK = 'attack';
// players
export const NUM_PLAYERS = 'NUM_PLAYERS';
export const NEUTRAL = 'NEUTRAL';
export const PLAYER_1 = 'PLAYER_1';
export const PLAYER_2 = 'PLAYER_2';
export const PLAYER_3 = 'PLAYER_3';
export const DEFAULT = 'default_color';
export const COLORS = {
  [NEUTRAL] : 'rgba(128, 128, 128, 1)',
  [PLAYER_1] : 'rgba(0, 255, 0, 1)',
  [PLAYER_2] : 'rgba(255, 0, 0, 1)',
  [PLAYER_3] : 'rgba(0, 0, 255, 1)',
  [SELECT]   : 'white',
  [DEFAULT]  : 'black'
};

export const PLANET_RADIUS = 'PLANET_RADIUS';
export const MAP_SIZE = 'MAP_SIZE';
export const TINY = 'TINY';
export const SMALL = 'SMALL';
export const MEDIUM = 'MEDIUM';
export const LARGE = 'LARGE';
export const PLANETS_IN_MAP = 'PLANETS_IN_MAP';
// config of stuff...
export const BASE_POP = 1;
export const FIGHTER_BUILD_RATE = 60;
export const FIGHTER_RADIUS = 5;
export const FIGHTER_SPEED = 2;
export const CANVAS_X = 'CANVAS_X';
export const CANVAS_Y = 'CANVAS_Y';
export const PLANET_BUFFER = 'PLANET_BUFFER';
export const AI_MIN_FIGHTERS = 'AI_MIN_FIGHTERS';
export const DEFAULT_FIGHTER_COUNT = 'DEFAULT_FIGHTER_COUNT';
