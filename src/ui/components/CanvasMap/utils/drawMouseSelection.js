// import {
//   PLAYER_1,
//   COLORS
// } from 'gameEngine/constants';
//
// import gameConfig from 'gameEngine/config';
// export function drawMouseSelection(ctx, selectedBox) {
//   let width = selectedBox.end.x - selectedBox.start.x;
//   let height = selectedBox.end.y - selectedBox.start.y;
//
//   ctx.beginPath();
//   ctx.rect(
//     selectedBox.start.x,
//     selectedBox.start.y,
//     width,
//     height
//   );
//   ctx.strokeStyle = gameConfig[COLORS][PLAYER_1];
//   ctx.stroke();
// }