import * as Util from './utils.js';
import { Engine, Render, World, Bodies } from 'matter-js';


class GravNode {
  constructor(x, y, w, h, world) {
    this.body = Bodies.rectangle(x, y, w, h, {isStatic: true});
    this.w = w;
    this.h = h;
    World.add(world, [this.body]);
    this.color = Util.randColor();
    this.area = w * h;
  }


  draw(ctx) {
    let {x, y} = this.body.position;
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