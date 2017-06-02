import React from 'react';
import {POSITION_COMP} from 'gameEngine/constants';

class CanvasMap extends React.Component {
  update(entsToDraw) {
    let ctx = this.canvas.getContext('2d');

    entsToDraw.forEach((item) => {
      let x = item[POSITION_COMP].x;
      let y = item[POSITION_COMP].y;
      let radius = item[POSITION_COMP].radius;

      let isSelected = item[POSITION_COMP].selected;

      ctx.moveTo(x,y);
      ctx.beginPath();
      if (isSelected) {
        ctx.strokeStyle = '#FF0000';
      } else {
        ctx.strokeStyle = '#000000';
      }
      ctx.arc(x,y,radius,0,Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    });
  }

  handleClick(e) {
    let rect = this.canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    this.props.dispatch({
      action:'click',
      x,
      y
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