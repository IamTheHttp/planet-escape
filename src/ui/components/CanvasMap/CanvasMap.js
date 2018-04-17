import React from 'react';
import drawCircleEntities from './utils/drawCircleEntities';
import {drawMouseSelection} from './utils/drawMouseSelection';
import onKeyUp from './utils/onKeyUp';
import updateCursorPosition from './utils/updateCursorPosition';
import {
  CLICK,
  DB_CLICK,
  MOVE,
  CANVAS_X,
  CANVAS_Y,
  ATTACK
} from 'gameEngine/constants';


class CanvasMap extends React.Component {
  constructor() {
    super();
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.lastClick = new Date().getTime();
  }
  // high order function
  dispatch(name) {
    return () => {
      return this.props.dispatch({
        name,
        x: this.x,
        y: this.y,
        selectedBox: this.selectedBox,
        isMouseDown : this.isMouseDown,
        dbClick : this.dbClick
      });
    };
  }

  componentDidMount() {
    this.x = 0;
    this.y = 0;
    this.isMouseDown = false;
    this.selectedBox = {};

    // this might be tracked somewhere else, it has nothing to do with the canvas itself!
    document.addEventListener('mousemove', updateCursorPosition(this));
    window.onresize = () => {
      this.canvas.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }

  update(entsToDraw) {
    let ctx = this.canvas.getContext('2d');
    /* istanbul ignore else  */
    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.strokeStyle = '#000'; // defaults

      entsToDraw.forEach(drawCircleEntities(ctx));

      if (this.isMouseDown) {
        drawMouseSelection(ctx, this.selectedBox);
      }
    }
  }

  onMouseDown() {
    let now = new Date().getTime();
    this.dbClick = now - this.lastClick < 300;
    this.lastClick = now;
    this.isMouseDown = true;
    return this.selectedBox = {
      start: {
        x: this.x,
        y: this.y
      },
      end: {
        x: this.x,
        y: this.y
      }
    };
  }

  onMouseMove() {
    if (this.isMouseDown) {
      return this.selectedBox.end = {
        x : this.x,
        y : this.y
      };
    } else {
      return false;
    }
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.dispatch(CLICK)();
  }

  onMouseLeave() {
    if (this.isMouseDown) {
      this.onMouseUp();
    }
  }

  render() {
    return (
      <canvas
        ref={(elm) => {
          this.canvas = elm;
        }}
        height={this.props.mapSize[CANVAS_Y]}
        width={this.props.mapSize[CANVAS_X]}
        style={{backgroundColor : 'black', border:'1px solid black'}}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
      ></canvas>
    );
  }
}

export default CanvasMap;