
import Block from './block';

class Game {
  constructor(DIM_X, DIM_Y){
    let body = document.getElementsByTagName('body')[0];
    this.origin = {
      x: Math.floor((body.clientWidth - DIM_X) / 2),
      y: 20
    };

    this.tower = this.setTower();
  }

  setTower() {
    let origin = this.origin
    let tower = [];

    tower.push(new Block(origin.x + 40, origin.y + 100, 100, 30));

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