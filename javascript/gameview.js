
class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }
  

  start() {
    setTimeout(() => { 
      this.game.draw(this.ctx);
    }, 10);
  }
}

export default GameView;