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
  FIGHTER_IMAGE
} from 'gameEngine/constants';

import fighter from './fighter.png';
import player1 from 'assets/player1.png';
import player2 from 'assets/player2.png';
import neutral from 'assets/neutral.png';

// TODO change neutral image to something smaller
let fighterImage = new Image();
let neutralImage = new Image();
let player1Image = new Image();
let player2Image = new Image();

fighterImage.src = fighter;
neutralImage.src = neutral;
player1Image.src = player1;
player2Image.src = player2;

let imageBuffer = {
  [PLANETS] : {
    [NEUTRAL] : {
      img : neutralImage,
      spriteArgs : [510, 380, 300, 300]
    },
    [PLAYER_1] : {
      img : player1Image,
      spriteArgs : [0, 0, 192, 182]
    },
    [PLAYER_2] : {
      img : player2Image,
      spriteArgs : [0, 0, 846, 846]
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