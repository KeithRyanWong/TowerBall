class Ball {
  constructor(x, y) {
    this.position = {
      x,
      y,
      z: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.color = '#ED6050';
    this.radius = 20;

    
  }

  draw(ctx) {
    ctx.fillStyle = '#' + Math.floor(Math.random()*10 + 500).toString(16) ;
    ctx.beginPath();

    ctx.arc(
      this.position.x,
      this.position.y,
      (this.radius - this.position.z),
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
}

export default Ball;