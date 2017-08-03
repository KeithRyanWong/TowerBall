import * as Util from './util';

class Block {
  constructor(x, y, w, h) {
    this.position = {
      x,
      y
    };
    this.w = w;
    this.h = h;
    this.color = Util.randColor();
    this.area = w * h;
    this.velocity = {
      x: 0,
      y: 0
    };
  }


  draw(ctx) {
    console.log('here')
    let {x, y} = this.position;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.w , y);
    ctx.lineTo(x + this.w, y + this.h);
    ctx.lineTo(x, y + this.h);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Block;