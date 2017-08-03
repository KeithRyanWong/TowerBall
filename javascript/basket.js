import * as Util from './util';

class Basket {
  constructor(x, y, w, h) {
    this.position = {
      x,
      y
    };
    this.w = w;
    this.h = h;
    
    this.color = 'black';
    this.area = w * h;
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  bounds(){
    let { x, y } = this.position;
    let w = this.w;
    let h = this.h;
    return {
      left: x,
      right: x + w,
      top: y,
      bottom: y + h,
      upperLeft: { 
        x, 
        y 
      },
      upperRight: { 
        x: x + w, 
        y
      },
      bottomLeft: {
        x: x + w, 
        y: y + h
      },
      bottomRight: {
        x, 
        y: y + h
      }
    };
  }

  draw(ctx) {
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

export default Basket;