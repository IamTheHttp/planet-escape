/* global window */
console.log('Woooot');
window.debugTools = {
  triggerWin: 0,
  triggerLose: 0
};
let dbug = window.debugTools;
window.autoWin = () => {
  dbug.triggerWin = 1;
  setTimeout(() => {
    dbug.triggerWin = 0;
  }, 100);
};

