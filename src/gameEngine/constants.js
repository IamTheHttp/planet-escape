export const GOLD_RESOURCE = 'GOLD';
export const FARM_COMP = 'FARM';
export const FOOD_RESOURCE = 'FOOD';

export const BUILDINGS_COMP = 'BUILDINGS';
export const OWNER_COMPONENT = 'OWNER';
export const CONSUMPTION_COMP = 'CONSUMPTION';
export const INCOME_COMP = 'INCOME';
export const TREASURY_COMP = 'TREASURY';
export const POPULATION_COMP = 'POPULATION';
export const PLANETBONUS_COMP = 'PLANET_BONUS';
export const PLANETSIZE_COMP = 'PLANES_SIZE';
export const COSTS_COMP = 'COSTS';
export const SPRITE = 'SPRITE';
export const UI_COMP = 'UI';
export const MODS_PLANET_BONUSES = 'MODIFIES_PLANET_BONUSES';
export const PLAYER_CONTROLLED = 'PLAYER_CONTROLLED';
export const POSITION = 'POSITION';
export const MOVEMENT_COMP = 'MOVE';
export const CAN_COLONIZE_COMP = 'COLONIZE';
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
export const COLONIZE = 'colonize';
export const ATTACK = 'attack';
// players
export const NEUTRAL = 'NEUTRAL';
export const PLAYER_1 = 'PLAYER_1';
export const PLAYER_2 = 'PLAYER_2';
export const PLAYER_3 = 'PLAYER_3';
export const DEFAULT = 'default_color';
export const COLONIZE_RANGE = 'colonize_range';
export const COLONIZE_RANGE_FADED = 'colonize_range_faded';
export const COLORS = {
  [NEUTRAL] : 'rgba(128, 128, 128, 1)',
  [PLAYER_1] : 'rgba(0, 255, 0, 1)',
  [PLAYER_2] : 'rgba(255, 0, 0, 1)',
  [PLAYER_3] : 'rgba(0, 0, 255, 1)',
  [SELECT]   : 'white',
  [DEFAULT]  : 'black',
  [COLONIZE_RANGE] : 'rgba(255, 70, 50, 0.8)',
  [COLONIZE_RANGE_FADED] : 'rgba(255, 70, 50, 0.3)'
};

// config of stuff...
export const BASE_POP = 1;
export const CANVAS_X = 1200;
export const CANVAS_Y = 1200;
export const FIGHTER_BUILD_RATE = 60;