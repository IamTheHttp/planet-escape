import {Entity} from "game-platform";
import {
  EXPLOSION,
  GAME_STATE,
  HAS_FIGHTERS,
  MOVEMENT_COMP,
  OWNER_COMPONENT,
  PLAYER_CONTROLLED,
  POSITION,
  SPRITE, UI_COMP
} from "./constants";
import {HasFighters} from "./components/HasFighters";
import {GameState} from "./components/GameState";
import PositionComponent from "./components/PositionComponent";
import PlayerControlledComponent from "./components/PlayerControlledComponent";
import OwnerComponent from "./components/OwnerComponent";
import Sprite from "./components/Sprite";
import MoveComponent from "./components/MoveComponent";
import UIComponent from "./components/UIComponent";
import Explosion from "./components/Explosion";


export class BaseEntity extends Entity {
  planetID: number; // TODO this is a hack for fighters (as they need a parent planet)
  id: number;
  name:string;
  [HAS_FIGHTERS]: HasFighters;
  [GAME_STATE]: GameState;
  [POSITION] : PositionComponent;
  [PLAYER_CONTROLLED]: PlayerControlledComponent;
  [OWNER_COMPONENT]: OwnerComponent;
  [SPRITE]: Sprite;
  [MOVEMENT_COMP]: MoveComponent
  [UI_COMP]: UIComponent;
  [EXPLOSION]: Explosion

  constructor(entity?: any) {
    super(entity);
  }
}