let PLANET = 'PLANET';
import {
  HAS_FIGHTERS,
  PLANET_RADIUS,
  CANVAS,
  PLANETS,
  CIRCLE,
  FIGHTER_COUNT,
  PLAYER_1,
  PLAYER_2,
  NEUTRAL,
  FIGHTER_IMAGE,
  SHIELD_IMAGE
} from 'gameEngine/constants';

import fighter from './fighter.png';
import player1 from 'assets/player1.png';
import player2 from 'assets/player2.png';
import neutral from 'assets/neutral.png';
import shield from 'assets/shield.png';

// TODO change neutral image to something smaller
let fighterImage = new Image();
let neutralImage = new Image();
let player1Image = new Image();
let player2Image = new Image();
let shieldImage = new Image();

fighterImage.src = fighter;
neutralImage.src = neutral;
player1Image.src = player1;
player2Image.src = player2;
shieldImage.src  = shield;

let imageBuffer = {
  [SHIELD_IMAGE] : {
    [NEUTRAL] : {
      img : shieldImage,
      spriteArgs : [0, 0, 209, 228]
    },
    [PLAYER_1] : {
      img : shieldImage,
      spriteArgs : [0, 0, 209, 228]
    },
    [PLAYER_2] : {
      img : shieldImage,
      spriteArgs : [0, 0, 209, 228]
    }
  },
  [PLANETS] : {
    [NEUTRAL] : {
      img : neutralImage,
      spriteArgs : [0, 0, 150, 138]
    },
    [PLAYER_1] : {
      img : player1Image,
      spriteArgs : [0, 0, 189, 182]
    },
    [PLAYER_2] : {
      img : player2Image,
      spriteArgs : [0, 0, 150, 150]
    }
  },
  [FIGHTER_IMAGE] : {
    [NEUTRAL] : {
      img : fighterImage,
      spriteArgs : [0, 0, 95, 95]
    },
    [PLAYER_1] : {
      img : fighterImage,
      spriteArgs : [0, 0, 95, 95]
    },
    [PLAYER_2] : {
      img : fighterImage,
      spriteArgs : [0, 0, 95, 95]
    }
  }
};

export default imageBuffer;