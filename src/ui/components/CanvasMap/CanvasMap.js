import React from 'react';
import drawCircleEntities from './utils/drawCircleEntities';
import {drawMouseSelection} from './utils/drawMouseSelection';
import onKeyUp from './utils/onKeyUp';
import updateCursorPosition from './utils/updateCursorPosition';
import {
  SELECT,
  MOVE,
  COLONIZE,
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
  }
  // high order function
  dispatch(name) {
    return () => {
      return this.props.dispatch({
        name,
        x: this.x,
        y: this.y,
        selectedBox: this.selectedBox,
        isMouseDown : this.isMouseDown
      });
    };
  }

  componentDidMount() {
    // TODO - Can this state be moved outside?
    this.x = 0;
    this.y = 0;
    this.isMouseDown = false;
    this.selectedBox = {}; // TODO, don't generate a new object every time

    // this might be tracked somewhere else, it has nothing to do with the canvas itself!
    onKeyUp('e', this.dispatch(MOVE));
    onKeyUp('c', this.dispatch(COLONIZE));
    onKeyUp('a', this.dispatch(ATTACK));
    document.addEventListener('mousemove', updateCursorPosition(this));
  }

  update(entsToDraw) {
    let ctx = this.canvas.getContext('2d', 'foo');
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
    this.isMouseDown = true;
    this.selectedBox = {
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
      this.selectedBox.end = {
        x : this.x,
        y : this.y
      };
    }
  }
  onMouseUp() {
    this.isMouseDown = false;
    this.dispatch(SELECT)();
  }

  render() {
    return (
      <canvas
        ref={(elm) => {
          this.canvas = elm;
        }}
        height={CANVAS_Y}
        width={CANVAS_X}
        style={{backgroundColor : 'black', height:'100%', border:'1px solid black'}}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={() => {
          if (this.isMouseDown) {
            this.onMouseUp();
          }
        }}
      ></canvas>
    );
  }
}

export default CanvasMap;