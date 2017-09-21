import {
  SELECT,
  COLORS
} from 'gameEngine/constants';

export function drawMouseSelection(ctx, selectedBox) {
  let width = selectedBox.end.x - selectedBox.start.x;
  let height = selectedBox.end.y - selectedBox.start.y;

  ctx.beginPath();
  ctx.rect(
    selectedBox.start.x,
    selectedBox.start.y,
    width,
    height
  );
  ctx.strokeStyle = COLORS[SELECT];
  ctx.stroke();
}