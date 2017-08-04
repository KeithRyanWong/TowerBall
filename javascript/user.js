import Ball from './ball';
import PowerBar from './powerbar';

class User {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    // let width = document.getElementsByTagName('body')[0].clientWidth;
    // let margin = Math.floor((width - this.DIM_X) / 2);
    this.ball = new Ball(w / 2, h - 20);
    this.power = 0;
    document.addEventListener('keypress', this.setPower.bind(this));
    
    this.powerBar = new PowerBar();
  }

  setPower(e){
    e.preventDefault();

    let power = document.getElementById('power');
    let currentPower = parseInt(power.value);

    if(e.keyCode === 32) {
      this.applySpeed(-currentPower);
    }
  }

  cycle() {
    this.moveBall();
  }

  applySpeed(speed) {
    this.ball.velocity.y = speed;
  }

  moveBall() {
    let { position, velocity } = this.ball;
    position.x += velocity.x;
    position.y += velocity.y;
  }

  draw(ctx) {
    this.ball.draw(ctx, 0);
  }
}


export default User;