import Game from './game';
import GameView from './gameview';
import User from './user';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("main");
  const height = canvas.clientHeight;
  const width = canvas.clientWidth;
  const ctx = canvas.getContext('2d');
  
  const game = new Game(width, height);
  const user = new User(ctx, width, height);
  const gameview = new GameView(game, user, ctx, width, height);
  gameview.start();
});