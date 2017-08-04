import * as Util from './util';
import Block from './block';
import GravNode from './gravnode';
import Basket from './basket';


class Game {
  constructor(DIM_X, DIM_Y){
    // this.user = user;
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.origin = {
      x: this.getX.bind(this),
      y: this.getY.bind(this)
    };

    this.tower = this.setTower();

    const canvas = document.getElementById("main");
    // document.addEventListener('keypress', this.setPower.bind(this));
  }



  registerHit(position) {

    //update count
    // debugger;
    // e.preventDefault();
    let width = document.getElementsByTagName('body')[0].clientWidth;
    let margin = Math.floor((width - this.DIM_X) / 2);
    let canvasX = position.x;
    let canvasY = position.y;
    // let canvasX = e.pageX - margin;
    // let canvasY = e.pageY - 20;
    this.tower.forEach((object, i) => {
      // debugger;
      if (i !== 0 && object.occupies(canvasX, canvasY)){
        if(i === this.tower.length-1){
          this.gameWon();
        }
        this.tower.splice(i, 1);
      }
    });
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

    tower.push(new GravNode(mark.x, mark.y, mark.x, 500));
    this.generateBlocks(tower, mark);
    this.placeBasket(tower, mark);
    return tower;
  }

  generateBlocks(tower, mark) {
    let attempts = 0;

    while (tower.length < 6) {
      let lastMarkY = mark.y;
      let delta = Util.rand(30, 70);
      mark.y -= delta  ;

      let block = new Block(mark.x + Util.rand(0, mark.x), mark.y, Util.rand(20, 120), delta);
      tower.push(block);

      if(!Util.validPlacement(tower)) {
        mark.y = lastMarkY;
        tower.pop();
      }      
      attempts += 1;
      if (attempts > 1000) {
        break;
      } 
    }
  }

  placeBasket(tower, mark) {
    mark.y -= 32;
    const lastBlock = tower[tower.length - 1];
    let block = new Basket(lastBlock.position.x + Util.rand(-9, lastBlock.w - 11), mark.y, 20, 30);
    tower.push(block);
  }

  cycle() {
    this.applyGravity();
    this.moveObjects();
    this.resolveCollisions();
    return;
  }

  draw(ctx){
    this.tower.forEach((obj) => {
      obj.draw(ctx);
    });
  }

  moveObjects() {
    this.tower.forEach((obj) => {
      if (obj.velocity) {
        obj.position.y += obj.velocity.y;
      }
    });

    let lastBlock = this.tower[this.tower.length - 1];
    if (lastBlock instanceof Basket && lastBlock.bounds().bottom > Math.floor(this.DIM_Y * 0.70) - 10) {
      this.gameLost();
    }
  }

  applyGravity() {
    this.tower.forEach((obj) => {
      if (obj.velocity) {
        obj.velocity.y = Math.floor((obj.velocity.y + 1));
      }
    });
  }

  resolveCollisions() {
    for(let i = 0; i < this.tower.length; i++) {
      for(let j = i + 1; j < this.tower.length; j++){

        let bottomBlock = this.tower[i];
        let block = this.tower[j];
        if(Util.collisionDetected(bottomBlock, block)){
          let lowerBlock = bottomBlock.bounds().bottom > block.bounds().bottom ? bottomBlock : block;
          let higherBlock = lowerBlock === bottomBlock ? block : bottomBlock;
          higherBlock.position.y = lowerBlock.bounds().top - higherBlock.h;
    
          higherBlock.velocity.y = 0;
          i = 0;
        }
      }
    }
  }

  gameWon() {
    document.getElementById('message').innerText = 'Nice Shot!';
    document.getElementById('message').className = '';
  }
  gameLost() {
    document.getElementById('message').innerText = 'Better luck next time ';
    document.getElementById('message').className = '';
  }
}



export default Game;