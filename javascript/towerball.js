import Game from './game';
import GameView from './gameview';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("main");
  const height = canvas.clientHeight;
  const width = canvas.clientWidth;
  const ctx = canvas.getContext('2d');
  
  const game = new Game(width, height);
  const gameview = new GameView(game, ctx, width, height);
  gameview.start();
});