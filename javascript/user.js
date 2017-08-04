import Ball from './ball';
import PowerBar from './powerbar';
import AngleBar from './anglebar';

class User {
  constructor(ctx, w, h) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;

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

    console.log(this.velocity);
  }

  cycle() {
    this.moveBall();
  }

  applySpeed() {
    this.ball.velocity.y = this.velocity.y;
    this.ball.velocity.x = this.velocity.x;

    this.interval = setInterval(() => {
      this.ball.velocity.y += 0.20;
      this.ball.position.z += 0.05;
      console.log(this.ball.position);
    }, 10);

    setTimeout(() => {
      clearInterval(this.interval);
      console.log('hit: ', this.ball.position);
      this.ball = new Ball(this.w / 2,this.h - 20);
    }, 2200);
  }

  moveBall() {
    let { position, velocity } = this.ball;
    position.x += velocity.x;
    position.y += velocity.y;
    // velocity.y += velocity.y;
  }

  draw(ctx) {
    this.ball.draw(ctx, 0);
  }
}


export default User;