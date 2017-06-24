import React from 'react';
import drawCircleEntities from './utils/drawCircleEntities';
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
  // high order function
  dispatch(name) {
    return () => {
      return this.props.dispatch({
        name,
        x: this.x,
        y: this.y
      });
    };
  }

  componentDidMount() {
    this.x = 0;
    this.y = 0;

    // this might be tracked somewhere else, it has nothing to do with the canvas itself!
    onKeyUp('m',this.dispatch(MOVE));
    onKeyUp('c',this.dispatch(COLONIZE));
    onKeyUp('a',this.dispatch(ATTACK));
    document.addEventListener('mousemove', updateCursorPosition(this));
  }

  update(entsToDraw) {
    let ctx = this.canvas.getContext('2d','foo');
    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      entsToDraw.forEach(drawCircleEntities(ctx));
    }
  }

  handleClick() {
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
        style={{backgroundColor : 'black', width:'calc(100% - 200px)', border:'1px solid black'}}
        onClick={(e) => {
          this.handleClick(e);
        }}
      ></canvas>
    );
  }
}

export default CanvasMap;