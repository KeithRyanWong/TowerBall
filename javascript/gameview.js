
class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }
  

  start() {
    console.log('he')
    setTimeout(() => { 
      this.game.draw(this.ctx);
    }, 10);
  }
}

export default GameView;