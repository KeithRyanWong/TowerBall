import Block from './block.js';
import GravNode from './grav_node.js';
import * as Util from './utils';
import { Engine, Render, World, Bodies, Vector, Vertices, Composite } from 'matter-js';

class Game {
  constructor(DIM_X=500, DIM_Y=650, world) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.towerArea = {
      x: Math.floor(DIM_X / 3),
      y: Math.floor(DIM_Y / 6),
      width: Math.floor(DIM_X / 3),
      length: Math.floor(DIM_Y / 6) * 4
    };

    this.world = world;
    this.tower = this.createTower();

    const canvas = document.getElementById("main");
    canvas.addEventListener('mousedown', this.destroyBlock.bind(this));
  }

  destroyBlock(e){
    e.preventDefault();
    let width = document.getElementsByTagName('body')[0].clientWidth;
    let margin = Math.floor((width - 500) / 2);
    let canvasX = e.pageX - margin;
    let canvasY = e.pageY - 20;
    this.tower.forEach((object, i) => {
      if (i !== 0 && object.occupies(canvasX, canvasY)){
        Composite.remove(this.world, object.body);
        this.tower.splice(i, 1);
      }
    });
  }

  createTower() {
    const tower = [];
    let { x, y, width, length } = this.towerArea;
    let space = Math.floor(width * length * 0.70);
    tower.push(new GravNode(x + Math.floor(width / 2), length - 3, width, 3, this.world));

    // let base = length + 20;
    // while(tower.length < 6) {
    //   let lastBase = base;
    //   let delta = Util.rand(30, 50);
    //   base -= delta;
    //   let block = new Block(Util.rand(x, x * 2), base, Util.rand(30, 50), delta, this.world);
      
    //   tower.push(block);

    //   if (!this.validPlacement(tower)) {
    //     base = lastBase;
    //     tower.pop();
    //   }
    // }
    
    tower.push(new Block(x + 85, length - 60 + 20, Util.rand(20, 120), 60, this.world));
    tower.push(new Block(x + 85, length - 60 - 40 + 20, Util.rand(20, 120), 40, this.world));
    tower.push(new Block(x + 85, length - 60 - 40 - 70 + 20, Util.rand(20, 120), 70, this.world));
    tower.push(new Block(x + 85, length - 60 - 40 - 70 - 30 + 20, Util.rand(20, 120), 30, this.world));
    
    return tower;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.tower.forEach(object => object.draw(ctx));
    this.destroyOffScreen();
  }



  destroyOffScreen() {
    for (let i = 1; i < this.tower.length; i++) {
      let obj = this.tower[i];
      if (obj.canBeDestroyed(this.DIM_X, this.DIM_Y)) {
        World.remove(this.world, obj.body);
        this.tower.splice(i, 1);
        i--;
      }
    }
  }
}

export default Game;