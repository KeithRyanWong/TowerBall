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