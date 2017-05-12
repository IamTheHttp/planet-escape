import React from 'react';
import {PLAYERCONTROLLED_COMP} from 'gameEngine/constants';

class CanvasMap extends React.Component{


  constructor(){
    super();
  }

  update(entsToDraw){
    var ctx = this.canvas.getContext('2d');

    entsToDraw.forEach((item)=>{
      let x = item[PLAYERCONTROLLED_COMP].x;
      let y = item[PLAYERCONTROLLED_COMP].y;
      let rad = item[PLAYERCONTROLLED_COMP].radius;

      let isSelected = item[PLAYERCONTROLLED_COMP].selected;

      ctx.moveTo(x,y);
      ctx.beginPath();
      if(isSelected){
        ctx.strokeStyle="#FF0000";
      }
      else{
        ctx.strokeStyle="#000000";
      }
      ctx.arc(x,y,rad,0,Math.PI*2);
      ctx.stroke();
      ctx.closePath();
    });
  }

  handleClick(e){
    let rect = this.canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    this.props.dispatch({
      action:'click',
      x,
      y
    });
  }

  render(){
    return(
      <canvas
        ref={(elm)=>{ this.canvas = elm}}
        height="500"
        width="1200"
        style={{border:"1px solid black"}}
        onClick={(e)=>{this.handleClick(e)}}
      ></canvas>
    )
  }
}

export default CanvasMap;