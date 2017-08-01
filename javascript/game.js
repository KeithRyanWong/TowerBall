import Block from './block.js';

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
  }

  createTower() {
    const tower = [];
    let { x, y, width, length } = this.towerArea;
    let space = Math.floor(width * length * 0.70);
    // let block = new Block(x, y, x, y * 4); tower area
    console.log(space);;
    
    while( tower.reduce((sum, block) => ( sum + block.area ), 0 ) < space ) {
      let block = new Block(x, y, 20, 20, this.world);
      x = (x + 20) % width;
      y += 1;
      tower.push(block);
    }

    return tower;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.tower.forEach(object => object.draw(ctx));
  }


}

export default Game;