import React from 'react';
import drawCircleEntities from './utils/drawCircleEntities';
import dispatchMove from './utils/dispatchMove';
import updateCursorPosition from './utils/updateCursorPosition';
class CanvasMap extends React.Component {
  componentDidMount() {
    this.x = 0;
    this.y = 0;
    document.addEventListener('keyup',dispatchMove(this));
    document.addEventListener('mousemove', updateCursorPosition(this));
  }

  update(entsToDraw) {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    entsToDraw.forEach(drawCircleEntities(ctx));
  }

  handleClick() {
    this.props.dispatch({
      name:'select',
      x: this.x,
      y: this.y
    });
  }

  render() {
    return (
      <canvas
        ref={(elm) => {
          this.canvas = elm;
        }}
        height='1200'
        width='1200'
        style={{width:'calc(100% - 200px)', border:'1px solid black'}}
        onClick={(e) => {
          this.handleClick(e);
        }}
      ></canvas>
    );
  }
}

export default CanvasMap;