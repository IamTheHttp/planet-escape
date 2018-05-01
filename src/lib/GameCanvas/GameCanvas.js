import React from 'react';
import CanvasAPI from 'lib/CanvasAPI/CanvasAPI';
import SelectedBox from 'lib/SelectedBox/SelectedBox';

class GameCanvas {
  constructor(options) {
    this.mapHeight = options.mapHeight;
    this.mapWidth = options.mapWidth;
    this.viewHeight = options.viewHeight;
    this.viewWidth = options.viewWidth;
    this.onViewMapClick = options.onViewMapClick;
    this.onViewMapMove = options.onViewMapMove;
    this.onMiniMapClick = options.onMiniMapClick;
    this.lastClick = 0;
    this.dbClick = false;
    this.selectedBox = new SelectedBox();
    this.updateViewMapCursorPosition = this.updateViewMapCursorPosition.bind(this);
    this.updateMiniMapCursorPosition = this.updateMiniMapCursorPosition.bind(this);
    this.handleMapMouseUp = this.handleMapMouseUp.bind(this);
    this.handleMapMouseDown = this.handleMapMouseDown.bind(this);
    this.handleMiniMapClick = this.handleMiniMapClick.bind(this);
    this.handleMapMouseMove = this.handleMapMouseMove.bind(this);
    this.handleMapMouseLeave = this.handleMapMouseLeave.bind(this);
  }

  updateCursorPosition(event, canvas, canvasAPI) {
    let rect = canvas.getBoundingClientRect();
    // base position
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    x = Math.max(0, Math.round(x * (canvas.width / rect.width))) - canvasAPI.getPan().panX;
    y = Math.max(0, Math.round(y * (canvas.height / rect.height))) - canvasAPI.getPan().panY;

    return {x, y};
  }

  handleMapMouseDown() {
    let now = new Date().getTime();
    this.dbClick = now - this.lastClick < 300;
    this.lastClick = now;
    this.isMouseDown = true;
    this.selectedBox.setStart(this.viewMapX, this.viewMapY);
    this.selectedBox.setEnd(this.viewMapX, this.viewMapY);
  }

  handleMapMouseMove() {
    if (this.isMouseDown) {
      this.selectedBox.setEnd(this.viewMapX, this.viewMapY);
    }
    this.onViewMapMove({
      x: this.viewMapX,
      y: this.viewMapY,
      isMouseDown: this.isMouseDown,
      dbClick: this.dbClick,
      selectedBox : this.selectedBox.getData()
    });
  }

  handleMapMouseLeave() {
    if (this.isMouseDown) {
      this.handleMapMouseUp();
    }
  }

  handleMapMouseUp() {
    this.isMouseDown = false;
    this.onViewMapClick({
      x: this.viewMapX,
      y: this.viewMapY,
      isMouseDown: this.isMouseDown,
      dbClick: this.dbClick,
      selectedBox : this.selectedBox.getData()
    });
    this.selectedBox.reset();
  }


  updateViewMapCursorPosition(event) {
    let {x, y} = this.updateCursorPosition(event, this.viewMapCanvas, this.mapAPI);
    this.viewMapX = x;
    this.viewMapY = y;
  }

  updateMiniMapCursorPosition(event) {
    let {x, y} = this.updateCursorPosition(event, this.miniMapCanvas, this.miniMapAPI);
    this.miniMapX = x;
    this.miniMapY = y;
  }

  getNewCanvasPairs({getMapRef, getMiniRef}) {
    return {
      map: this.GenerateMapCanvas(getMapRef),
      minimap: this.generateMiniMapCanvas(getMiniRef)
    };
  }

  handleMiniMapClick() {
    let x = this.miniMapX;
    let y = this.miniMapY;
    // Handle negative overflows, both numbers should be positive
    // the reason we divide in 2 is because we want to center the view
    let calcPanX = Math.max(x - this.viewWidth / 2, 0);
    let calcPanY = Math.max(y - this.viewHeight / 2, 0);

    // Handle positive overflows, both numbers should not exceed map size
    let width = this.mapWidth;
    let height = this.mapHeight;

    calcPanX = calcPanX + this.viewWidth < width ? calcPanX : width - this.viewWidth;
    calcPanY = calcPanY + this.viewHeight < height ? calcPanY : height - this.viewHeight;
    this.mapAPI.pan(-calcPanX, -calcPanY);
  }

  GenerateMapCanvas(getRef) {
    return (
      <canvas
        className="viewMap"
        ref={(el) => {
          if (!el) {
            return null;
          }
          this.viewMapCanvas = el;
          document.removeEventListener('mousemove', this.updateViewMapCursorPosition);
          document.addEventListener('mousemove', this.updateViewMapCursorPosition);


          let touching = false;
          let touchStartX;
          let touchStartY;
          let pan;

          let handleStart = (e) => {
            touching = true;

            let {x, y} = this.updateCursorPosition(e.touches[0], this.viewMapCanvas, this.mapAPI);

            touchStartX = x;
            touchStartY = y;
            pan = this.mapAPI.getPan();
          };

          let handleMove = (e) => {
            let {x, y} = this.updateCursorPosition(e.touches[0], this.viewMapCanvas, this.mapAPI);
            // once we move, we want to pan by the amount moved.
            // how much and where did we move from last time?

            let calcPanX;
            let calcPanY;
            let {panX, panY} = this.mapAPI.getPan();

            let xMoved = x - touchStartX;
            let yMoved = y - touchStartY;
            /*


             // new X, new Y :
             console.log(touchStartX, xMoved);

             let newX =
            let calcPanX = Math.max(x - this.viewWidth / 2, 0);
            let calcPanY = Math.max(y - this.viewHeight / 2, 0);

            // positive numbers to right and bottom.
            // negative numbers are top and left.
            // pan is negative always
            // xMoved, yMoved are negative if moving down and right





            // both nunmbers should be negative.
            calcPanX = Math.min(calcPanX, 0);
            calcPanY = Math.min(calcPanY, 0);

            // both numbers should not exceed map width
            let width = this.mapWidth;
            let height = this.mapHeight;

            // calcPanX = calcPanX + this.viewWidth < width ? calcPanX : width - this.viewWidth;
            // calcPanY = calcPanY + this.viewHeight < height ? calcPanY : height - this.viewHeight;

            // calcPanX = calcPanX + this.viewWidth
            // calcPanY = calcPanY + this.viewHeight

             */

            calcPanX = panX + xMoved;
            calcPanY = panY + yMoved;
            console.log(`${calcPanX}:${this.viewWidth} // ${calcPanY}:${this.viewHeight}`);

            // both numbers should be negative
            calcPanX = Math.min(calcPanX, 0);
            calcPanY = Math.min(calcPanY, 0);

            // the panning + the mapSize, should not exceed the viewSize
            let width = this.mapWidth;
            let height = this.mapHeight;
            calcPanX = -calcPanX + this.viewWidth < width ? calcPanX : this.viewWidth - width;
            calcPanY = -calcPanY + this.viewHeight < height ? calcPanY : this.viewHeight - height;

            this.mapAPI.pan(calcPanX, calcPanY);
          };

          let noop = () => {

          };

          el.addEventListener('touchstart', handleStart, false);
          el.addEventListener('touchend', noop, false);
          el.addEventListener('touchcancel', noop, false);
          el.addEventListener('touchmove', handleMove, false);


          this.mapAPI = new CanvasAPI(el.getContext('2d'));
          getRef(this.mapAPI, el);
        }}
        height={this.viewHeight}
        width={this.viewWidth}
        onMouseDown={this.handleMapMouseDown}
        onMouseMove={this.handleMapMouseMove}
        onMouseUp={this.handleMapMouseUp}
        onMouseLeave={this.handleMapMouseLeave}
      ></canvas>
    );
  }

  generateMiniMapCanvas(getRef) {
    return (
      <canvas
        className="minimap"
        ref={(el) => {
          if (!el) {
            return null;
          }
          this.miniMapCanvas = el;
          document.removeEventListener('mousemove', this.updateMiniMapCursorPosition);
          document.addEventListener('mousemove', this.updateMiniMapCursorPosition);

          this.miniMapAPI = new CanvasAPI(el.getContext('2d'));
          getRef(this.miniMapAPI, el);
        }}
        height={this.mapHeight}
        width={this.mapWidth}
        onMouseDown={this.handleMiniMapClick}
      ></canvas>
    );
  }
}

export default GameCanvas;