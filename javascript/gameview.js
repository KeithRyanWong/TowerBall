class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    // set timeout interval
    setInterval(() => {
      this.ctx.clearRect(0, 0, 500, 650);
      this.game.draw(this.ctx);
    }, 10);
  }

  cycleThrough() {
    //activate various objects movements
  }
}

export default GameView;