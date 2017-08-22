import Ball from './ball';
import PowerBar from './powerbar';
import AngleBar from './anglebar';

class User {
  constructor(ctx, w, h, game) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.game = game;
    // let width = document.getElementsByTagName('body')[0].clientWidth;
    // let margin = Math.floor((width - this.DIM_X) / 2);
    this.ball = new Ball(w / 2, h - 20);
    this.power = 0;
    this.angle = 0;
    document.addEventListener('keypress', this.setPower.bind(this));
    
    this.powerBar = new PowerBar();
    this.angleBar = new AngleBar();
    this.interval;
    this.velocity = {
      x: 0,
      y: 0
    };

    this.before = true;
    
  }

  listen() {
    
  }

  setPower(e){
    e.preventDefault();

    let power = document.getElementById('power');
    let currentPower = parseInt(power.value);
    let angle = document.getElementById('angle');
    let currentAngle = parseInt(angle.value);

    if(e.keyCode === 32 && this.power === 0) {
      this.velocity.y = (-(currentPower * .3));
      this.power = currentPower;
      clearInterval(this.powerBar.interval);
      this.interval =  setInterval(() => this.angleBar.setPower(), 10);
    } else if(e.keyCode === 32 && this.angle === 0) {
      this.velocity.x = ((currentAngle - 50) * 0.1);
      this.angle = currentAngle;
      clearInterval(this.interval);
      this.applySpeed();
    }

  }

  cycle() {
    this.moveBall();
  }

  applySpeed() {
    this.ball.velocity.y = this.velocity.y;
    this.ball.velocity.x = this.velocity.x;

    this.interval = setInterval(() => {
      this.ball.velocity.y += 0.20;
      if(this.ball.position.z < 19)
        this.ball.position.z += 0.05 * 100 / this.power;
    }, 10);

    setTimeout(() => {
      this.game.registerHit(this.ball.position);
      this.before = false;
      //log hit and reset
      setTimeout(() => {
        clearInterval(this.interval);
        this.reset.call(this);
      }, 1000);
    }, 2200 * (this.power / 100));
  }

  moveBall() {
    let { position, velocity } = this.ball;
    position.x += velocity.x;
    position.y += velocity.y;
    // velocity.y += velocity.y;
  }

  draw(ctx) {
    if (this.before) this.ball.draw(ctx, 0);
  }
  drawBehind(ctx) {
    if (!this.before) this.ball.draw(ctx, 0);
  }


  reset() {
    this.ball = new Ball(this.w / 2,this.h - 20);
    this.before = true;
    this.powerBar = new PowerBar();
    this.angleBar = new AngleBar();
    this.power = 0;
    this.angle = 0;
    this.velocity = {
      x: 0,
      y: 0
    };
  }
}


export default User;