
class GameView {
  constructor(game, ctx, w, h) {
    this.game = game;
    this.ctx = ctx;
    this. w = w;
    this.h = h;
  }
  

  start() {
    setInterval(() => { 
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.game.queueShot();
      this.game.cycle();
      this.game.draw(this.ctx);
    }, 50);
  }
}

export default GameView;