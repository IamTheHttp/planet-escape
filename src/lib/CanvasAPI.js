class CanvasAPI {
  constructor(ctx) {
    this.ctx = ctx;
    this.shapes = new Map();
  }

  remove(id) {
    this.shapes.delete(id);
  }

  addImage({
    id,
    image, // the image to display
    x, y, // pos for x,y..
    height, width,
    cropStartX, cropStartY, cropSizeX, cropSizeY,
    rotation // in radians
  }) {
    let ctx = this.ctx;
    this.shapes.set(id, () => {
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(rotation);
      ctx.drawImage(image,
        cropStartX, cropStartY, cropSizeX, cropSizeY,
        -width / 2, -height / 2,  // pos in canvas // at the top left of the canvas
        width, height); // size in canvas
      this.ctx.restore();
    });
  }

  addCircle({id, x, y, radius}) {
    let ctx = this.ctx;
    this.shapes.set(id, () => {
      ctx.moveTo(x, y);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    });
  }

  /**
   * Method allows us to pan around the canvas
   */
  pan(x, y) {
    this.ctx.setTransform(1, 0, 0, 1, x, y);
  }

  draw() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.ctx.restore();

    for (let shape of this.shapes.values()) {
      shape();
    }
  }
}

export default CanvasAPI;