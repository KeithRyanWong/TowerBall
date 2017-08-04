import * as Util from './util';

class GravNode {
  constructor(x, y, w, h) {
    this.position = {
      x,
      y
    };
    this.w = w;
    this.h = h;
    // this.bounds = {
    //   1: [x, y],
    //   2: [x + w, y],
    //   3: [x + w, y + h],
    //   4: [x, y + h]
    // };
    this.color = Util.randColor();
    this.area = w * h;
  }

  occupies(x, y) {
    return false;
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

export default GravNode;