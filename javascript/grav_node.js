import * as Util from './utils.js';
import { Engine, Render, World, Bodies } from 'matter-js';


class GravNode {
  constructor(x, y, w, h, world) {
    this.options = {
      isStatic: true,
      friction: 1,
      frictionStatic: 10,
      restitution: 0
    };
    this.body = Bodies.rectangle(x, y, w, h, this.options);
    this.w = w;
    this.h = h;
    World.add(world, [this.body]);
    this.color = Util.randColor();
    this.area = w * h;
  }


  draw(ctx) {
    let {x, y} = this.body.position;
    ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = '#000000';
    let vertices = this.body.vertices;
    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (let j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
    }
    ctx.lineTo(vertices[0].x, vertices[0].y);
    // ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default GravNode;