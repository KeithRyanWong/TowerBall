
class GameView {
  constructor(game, user, ctx, w, h) {
    this.game = game;
    this.ctx = ctx;
    this. w = w;
    this.h = h;
    this.user = user;
  }
  

  start() {
    
    setInterval(() => { 
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.game.draw(this.ctx);
      this.user.cycle();
      this.user.draw(this.ctx);
    }, 30);
    
  }
}

export default GameView;