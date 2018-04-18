import React from 'react';
import CanvasAPI from 'lib/CanvasAPI';
import gameConfig from 'gameEngine/config';
import {isSelected} from 'gameEngine/components/PlayerControlledComponent';
import {
  CANVAS_X,
  CANVAS_Y,
  POSITION,
  COLORS,
  OWNER_COMPONENT
} from 'gameEngine/constants';

class CanvasMap extends React.Component {
  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.updateCursorPosition = this.updateCursorPosition.bind(this);
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

      let color;
      let lineWidth = 1;
      if (entity.hasComponents(OWNER_COMPONENT)) {
        color = gameConfig[COLORS][entity[OWNER_COMPONENT].player];
      }

      if (isSelected(entity)) {
        lineWidth = 3; // REFACTOR - Move to a config?
      }

      // TODO need to add panning ability
      this.canvasAPI.addCircle({
        id: entity.id,
        x,
        y,
        radius,
        strokeStyle: color,
        lineWidth,
        fillColor : color
      });
    });

    this.canvasAPI.draw();
  }

  onMouseDown() {
    console.log('On mouse down!');
    console.log('x', this.x);
    console.log('y', this.y);
    this.props.onClick(this.x, this.y);
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
        onMouseDown={this.onMouseDown}
      ></canvas>
    );
  }
}

export default CanvasMap;