import {
  POSITION_COMP,
  PLAYERCONTROLLED_COMP,
  CANVAS,
  CIRCLE,
  MOVABLE
} from 'gameEngine/constants';

export default (ctx) => {
  return (item) => {
    let x = item[POSITION_COMP].x;
    let y = item[POSITION_COMP].y;
    let radius = item[POSITION_COMP].radius;

    let isSelected = item[PLAYERCONTROLLED_COMP].selected;

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
  };
};