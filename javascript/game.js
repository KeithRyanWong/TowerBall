import * as Util from './util';
import Block from './block';
import GravNode from './gravnode';

class Game {
  constructor(DIM_X, DIM_Y){
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.origin = {
      x: this.getX.bind(this),
      y: this.getY.bind(this)
    };

    this.tower = this.setTower();
  }

  getX() {
    let body = document.getElementsByTagName('body')[0];
    let origin = Math.floor((body.clientWidth - this.DIM_X) / 2);
    return origin;
  }

  getY () {
    return 20;
  }


  setTower() {
    const tower = [];
    const mid = Math.floor(this.DIM_X / 2);
    const base = Math.floor(this.DIM_Y * 0.70);
    const mark = {
      x: Math.floor(mid - this.DIM_X * 0.15),
      y: base
    };

    tower.push(new GravNode(mark.x, mark.y, mark.x, 3));

    while (tower.length < 7) {
      let lastMarkY = mark.y;
      let delta = Util.rand(30, 50);
      mark.y -= delta + 2;

      let block = new Block(mark.x + Util.rand(0, mark.x), mark.y, Util.rand(20, 120), delta);
      tower.push(block);

      if(!Util.validPlacement(tower)) {
        mark.y = lastMarkY;
        tower.pop();
      }

      
    }

    return tower;
  }



  draw(ctx){
    console.log('hi');
    this.tower.forEach((obj) => {
      obj.draw(ctx);
    });
  }
}

export default Game;