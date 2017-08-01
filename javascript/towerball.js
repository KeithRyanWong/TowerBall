import GameView from './gameview.js';
import Game from './game.js';
import { Engine, Render, World, Bodies } from 'matter-js';
import Block from './block.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById("main");
  const ctx = canvas.getContext('2d');
  const engine = Engine.create();
  const world = engine.world;
  
  

  let game = new Game(500, 650, world);
  let gameview = new GameView(game, ctx);
  
  gameview.start();
  Engine.run(engine);
});