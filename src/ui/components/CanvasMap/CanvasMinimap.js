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

    this.updatePanLocation(0, 0, 960, 540);
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

  updatePanLocation(x, y, width, height) {
    this.panX = x;
    this.panY = y;
    this.panWidth = width;
    this.panHeight = height;
  }

  update(entsToDraw) {
    // clear all shapes first
    this.canvasAPI.clear();

    // start adding shapes
    if (typeof this.panX !== 'undefined') {
      this.canvasAPI.addRect({
        id: 'currentMap',
        x: this.panX,
        y: this.panY,
        width: this.panWidth,
        height : this.panHeight,
        strokeStyle : 'green',
        lineWidth : 20
      });
    }

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
    this.props.onClick(this.x, this.y);
  }

  render() {
    if (!this.props.mapSize) {
      return null;
    }
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