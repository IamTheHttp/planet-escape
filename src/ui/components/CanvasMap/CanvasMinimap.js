import React from 'react';
import onKeyUp from './utils/onKeyUp';
import {getSprite, getSpriteArgs} from 'gameEngine/components/Sprite';
import {getFighters} from 'gameEngine/components/HasFighters';
import CanvasAPI from 'lib/CanvasAPI';
import gameConfig from 'gameEngine/config';
import {isSelected} from 'gameEngine/components/PlayerControlledComponent';
import SelectedBox from 'lib/SelectedBox';
import {
  CLICK,
  DB_CLICK,
  MOVE,
  CANVAS_X,
  CANVAS_Y,
  ATTACK,
  POSITION,
  COLORS,
  OWNER_COMPONENT,
  PLAYER_1,
  HAS_FIGHTERS,
  DEFENDING
} from 'gameEngine/constants';

class CanvasMap extends React.Component {
  constructor() {
    super();
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.updateCursorPosition = this.updateCursorPosition.bind(this);
    this.lastClick = new Date().getTime();
    this.selectedBox = new SelectedBox();
  }

  updateCursorPosition(event) {
    let canvas = this.canvas;
    if (!canvas) {
      return null;
    }
    let rect = canvas.getBoundingClientRect();
    // base position
    let x = event.clientX - rect.left - this.canvasAPI.getPan().panX;
    let y = event.clientY - rect.top - this.canvasAPI.getPan().panY;

    // adjust scale
    this.x = Math.max(0, Math.round(x * (canvas.width / canvas.offsetWidth)));
    this.y = Math.max(0, Math.round(y * (canvas.height / canvas.offsetHeight)));
  }

  // high order function
  dispatch(name) {
    return () => {
      return this.props.dispatch({
        name,
        x: this.x,
        y: this.y,
        selectedBox: this.selectedBox.getData(),
        isMouseDown: this.isMouseDown,
        dbClick: this.dbClick
      });
    };
  }

  componentDidMount() {
    this.x = 0;
    this.y = 0;
    this.isMouseDown = false;

    // this might be tracked somewhere else, it has nothing to do with the canvas itself!
    document.addEventListener('mousemove', this.updateCursorPosition);

    if (this.canvas && this.canvas.getContext('2d')) {
      this.canvasAPI = new CanvasAPI(this.canvas.getContext('2d'));
      window.canvasAPI = this.canvasAPI;
    }
  }

  update(entsToDraw) {
    this.canvasAPI.clear();
    entsToDraw.forEach((entity) => {
      let {x, y, radius, angle} = entity[POSITION];

      let color = null;
      let lineWidth = 1;
      if (entity.hasComponents(OWNER_COMPONENT)) {
        color = gameConfig[COLORS][entity[OWNER_COMPONENT].player];
      }

      if (isSelected(entity)) {
        lineWidth = 3; // REFACTOR - Move to a config?
      }

      this.canvasAPI.addCircle({
        id: entity.id,
        x,
        y,
        radius,
        strokeStyle: color,
        lineWidth
      });

      // draw the image, if the entity has one..
      // TODO - fighter images are incorrect!
      let [cropStartX, cropStartY, cropSizeX, cropSizeY] = getSpriteArgs(entity);
      let image = getSprite(entity);

      this.canvasAPI.addImage({
        id: `${entity.id}-image`,
        image,
        x: x - radius, y: y - radius,
        height: radius * 2, width: radius * 2,
        cropStartX, cropStartY, cropSizeX, cropSizeY,
        rotation: angle // in radians
      });

      entity.hasComponents(HAS_FIGHTERS, () => {
        let defendingFighters = getFighters(entity).filter((fighter) => {
          return fighter[DEFENDING];
        }).length;

        if (defendingFighters > 0) {
          this.canvasAPI.write({
            id: `${entity.id}-fighterCount`,
            text: defendingFighters,
            x: radius + x - radius / 4,
            y: radius + y - radius / 4,
            font: '18px serif',
            textBaseline: 'top',
            fillStyle: 'yellow'
          });
        }
      });
    });

    this.canvasAPI.addRect({
      id: 'selectedBox',
      x: this.selectedBox.start.x,
      y: this.selectedBox.start.y,
      width: this.selectedBox.getWidth(),
      height: this.selectedBox.getHeight(),
      strokeStyle: gameConfig[COLORS][PLAYER_1]
    });

    this.canvasAPI.draw();
  }

  onMouseDown() {
    let now = new Date().getTime();
    this.dbClick = now - this.lastClick < 300;
    this.lastClick = now;
    this.isMouseDown = true;

    this.selectedBox.setStart(this.x, this.y);
    this.selectedBox.setEnd(this.x, this.y);
    return this.selectedBox.getData();
  }

  onMouseMove() {
    if (this.isMouseDown) {
      this.selectedBox.setEnd(this.x, this.y);
      return this.selectedBox.getData().end;
    } else {
      return false;
    }
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.dispatch(CLICK)();
    this.selectedBox.reset();
    this.canvasAPI.remove('selectedBox');
  }

  onMouseLeave() {
    if (this.isMouseDown) {
      this.onMouseUp();
    }
  }

  render() {
    return (
      <canvas
        id="minimap"
        ref={(elm) => {
          this.canvas = elm;
        }}
        height={this.props.mapSize[CANVAS_Y]}
        width={this.props.mapSize[CANVAS_X]}
        style={{backgroundColor: 'gray', border: '1px solid black'}}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
      ></canvas>
    );
  }
}

export default CanvasMap;