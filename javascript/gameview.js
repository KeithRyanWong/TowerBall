class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    // set timeout interval
    let { DIM_X, DIM_Y } = this.game;
    setInterval(() => {
      this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
      this.game.draw(this.ctx);
    }, 10);
  }

  cycleThrough() {
    //activate various objects movements
  }
}

export default GameView;