/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const randColor = () => ( 
  '#' + Math.floor(Math.random()*16777215).toString(16) 
);
/* harmony export (immutable) */ __webpack_exports__["c"] = randColor;


const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = rand;



const centerOfGravity = (tower) => {
  // let parent = tower.shift();
  let datum = tower[0].position.x;
  let weights = [];
  let distances = [];
  let moments = [];

  tower.forEach((obj, i) => {
    weights.push(obj.area);
    distances.push(((obj.w / 2.0) + obj.position.x) - datum);
    moments.push(weights[i] * distances[i]);
  });

  let moment = moments.reduce((sum, objMoment) => (sum + objMoment), 0);
  let weight = weights.reduce((sum, objWeight) => (sum + objWeight), 0);
  
  return (moment / weight) + datum;
};
/* unused harmony export centerOfGravity */


const validPlacement = (tower) => {
  for (let i = tower.length - 1; i > 0; i--) {
    let CoGOfLastBlock = centerOfGravity(tower.slice(i));
    let bottomBlock = tower[i - 1];
    let bound1 = bottomBlock.position.x;
    let bound2 = bottomBlock.position.x + bottomBlock.w;
    //switch parity of variable to constrain within valid CoG
    if(CoGOfLastBlock < (bound1) - 10 || CoGOfLastBlock > (bound2) + 10) {
      return false;
    }
  }
  return true;
};
/* harmony export (immutable) */ __webpack_exports__["d"] = validPlacement;


const collisionDetected = (block, block2) => {
  let yCollision1 = ( 
      block.bounds().top < block2.bounds().bottom &&
      block.bounds().bottom > block2.bounds().bottom 
  ) || ( 
      block.bounds().top < block2.bounds().top &&
      block.bounds().bottom > block2.bounds().top
  ); 
  let yCollision2 = ( 
      block2.bounds().top < block.bounds().bottom &&
      block2.bounds().bottom > block.bounds().bottom 
  ) || ( 
      block2.bounds().top < block.bounds().top &&
      block2.bounds().bottom > block.bounds().top
  ); 

  let xCollision1 = ( 
      block.bounds().left < block2.bounds().left &&
      block.bounds().right > block2.bounds().left
  ) || (
      block.bounds().left < block2.bounds().right &&
      block.bounds().right > block2.bounds().right
  );
  let xCollision2 = ( 
      block2.bounds().left < block.bounds().left &&
      block2.bounds().right > block.bounds().left
  ) || (
      block2.bounds().left < block.bounds().right &&
      block2.bounds().right > block.bounds().right
  );


  return((yCollision1 && xCollision1) || (yCollision2 && xCollision2));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = collisionDetected;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameview__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user__ = __webpack_require__(7);




document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("main");
  const height = canvas.clientHeight;
  const width = canvas.clientWidth;
  const ctx = canvas.getContext('2d');
  
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](width, height);
  const user = new __WEBPACK_IMPORTED_MODULE_2__user__["a" /* default */](ctx, width, height, game);
  const gameview = new __WEBPACK_IMPORTED_MODULE_1__gameview__["a" /* default */](game, user, ctx, width, height);
  gameview.start();
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gravnode__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__basket__ = __webpack_require__(5);






class Game {
  constructor(DIM_X, DIM_Y){
    // this.user = user;
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.origin = {
      x: this.getX.bind(this),
      y: this.getY.bind(this)
    };

    this.tower = this.setTower();

    const canvas = document.getElementById("main");
    // document.addEventListener('keypress', this.setPower.bind(this));
  }



  registerHit(position) {

    //update count
    // e.preventDefault();
    let width = document.getElementsByTagName('body')[0].clientWidth;
    let margin = Math.floor((width - this.DIM_X) / 2);
    let canvasX = position.x;
    let canvasY = position.y;
    // let canvasX = e.pageX - margin;
    // let canvasY = e.pageY - 20;
    this.tower.forEach((object, i) => {
      if (i !== 0 && object.occupies(canvasX, canvasY)){
        if(i === this.tower.length-1){
          this.gameWon();
        }
        this.tower.splice(i, 1);
      }
    });
  }

  getX() {
    let body = document.getElementsByTagName('body')[0];
    let origin = Math.floor((body.clientWidth - this.DIM_X) / 2);
    return origin;
  }

  getY () {
    return 20;
  }


  setTower() {
    const tower = [];
    const mid = Math.floor(this.DIM_X / 2);
    const base = Math.floor(this.DIM_Y * 0.70);
    const mark = {
      x: Math.floor(mid - this.DIM_X * 0.15),
      y: base
    };

    tower.push(new __WEBPACK_IMPORTED_MODULE_2__gravnode__["a" /* default */](mark.x, mark.y, mark.x, 500));
    this.generateBlocks(tower, mark);
    this.placeBasket(tower, mark);
    return tower;
  }

  generateBlocks(tower, mark) {
    let attempts = 0;

    while (tower.length < 6) {
      let lastMarkY = mark.y;
      let delta = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* rand */](30, 70);
      mark.y -= delta  ;

      let block = new __WEBPACK_IMPORTED_MODULE_1__block__["a" /* default */](mark.x + __WEBPACK_IMPORTED_MODULE_0__util__["b" /* rand */](0, mark.x), mark.y, __WEBPACK_IMPORTED_MODULE_0__util__["b" /* rand */](20, 120), delta);
      tower.push(block);

      if(!__WEBPACK_IMPORTED_MODULE_0__util__["d" /* validPlacement */](tower)) {
        mark.y = lastMarkY;
        tower.pop();
      }      
      attempts += 1;
      if (attempts > 1000) {
        break;
      } 
    }
  }

  placeBasket(tower, mark) {
    mark.y -= 32;
    const lastBlock = tower[tower.length - 1];
    let block = new __WEBPACK_IMPORTED_MODULE_3__basket__["a" /* default */](lastBlock.position.x + __WEBPACK_IMPORTED_MODULE_0__util__["b" /* rand */](-9, lastBlock.w - 11), mark.y, 20, 30);
    tower.push(block);
  }

  cycle() {
    this.applyGravity();
    this.moveObjects();
    this.resolveCollisions();
    return;
  }

  draw(ctx){
    this.tower.forEach((obj) => {
      obj.draw(ctx);
    });
  }

  moveObjects() {
    this.tower.forEach((obj) => {
      if (obj.velocity) {
        obj.position.y += obj.velocity.y;
      }
    });

    let lastBlock = this.tower[this.tower.length - 1];
    if (lastBlock instanceof __WEBPACK_IMPORTED_MODULE_3__basket__["a" /* default */] && lastBlock.bounds().bottom > Math.floor(this.DIM_Y * 0.70) - 10) {
      this.gameLost();
    }
  }

  applyGravity() {
    this.tower.forEach((obj) => {
      if (obj.velocity) {
        obj.velocity.y = Math.floor((obj.velocity.y + 1));
      }
    });
  }

  resolveCollisions() {
    for(let i = 0; i < this.tower.length; i++) {
      for(let j = i + 1; j < this.tower.length; j++){

        let bottomBlock = this.tower[i];
        let block = this.tower[j];
        if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* collisionDetected */](bottomBlock, block)){
          let lowerBlock = bottomBlock.bounds().bottom > block.bounds().bottom ? bottomBlock : block;
          let higherBlock = lowerBlock === bottomBlock ? block : bottomBlock;
          higherBlock.position.y = lowerBlock.bounds().top - higherBlock.h;
    
          higherBlock.velocity.y = 0;
          i = 0;
        }
      }
    }
  }

  gameWon() {
    document.getElementById('message').innerText = 'Nice Shot!';
    document.getElementById('message').className = '';
  }
  gameLost() {
    document.getElementById('message').innerText = 'Better luck next time ';
    document.getElementById('message').className = '';
  }
}



/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Block {
  constructor(x, y, w, h) {
    this.position = {
      x,
      y
    };
    this.w = w;
    this.h = h;
    // this.bounds = {
    //   1: [x, y],
    //   2: [x + w, y],
    //   3: [x + w, y + h],
    //   4: [x, y + h]
    // };
    this.color = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* randColor */]();
    this.area = w * h;
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  bounds(){
    let { x, y } = this.position;
    let w = this.w;
    let h = this.h;
    return {
      left: x,
      right: x + w,
      top: y,
      bottom: y + h,
      upperLeft: { 
        x, 
        y 
      },
      upperRight: { 
        x: x + w, 
        y
      },
      bottomLeft: {
        x: x + w, 
        y: y + h
      },
      bottomRight: {
        x, 
        y: y + h
      }
    };
  }

  occupies(x, y) {
    return x > this.bounds().left && x < this.bounds().right &&
           y > this.bounds().top && y < this.bounds().bottom;
  }

  draw(ctx) {
    let {x, y} = this.position;
    ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = '#000000';
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.w , y);
    ctx.lineTo(x + this.w, y + this.h);
    ctx.lineTo(x, y + this.h);
    ctx.lineTo(x, y);
    // ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Block);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class GravNode {
  constructor(x, y, w, h) {
    this.position = {
      x,
      y
    };
    this.w = w;
    this.h = h;
    // this.bounds = {
    //   1: [x, y],
    //   2: [x + w, y],
    //   3: [x + w, y + h],
    //   4: [x, y + h]
    // };
    this.color = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* randColor */]();
    this.area = w * h;
  }

  occupies(x, y) {
    return false;
  }

  bounds(){
    let { x, y } = this.position;
    let w = this.w;
    let h = this.h;
    return {
      left: x,
      right: x + w,
      top: y,
      bottom: y + h,
      upperLeft: { 
        x, 
        y 
      },
      upperRight: { 
        x: x + w, 
        y
      },
      bottomLeft: {
        x: x + w, 
        y: y + h
      },
      bottomRight: {
        x, 
        y: y + h
      }
    };
  }

  draw(ctx) {
    let {x, y} = this.position;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.w , y);
    ctx.lineTo(x + this.w, y + this.h);
    ctx.lineTo(x, y + this.h);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GravNode);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Basket {
  constructor(x, y, w, h) {
    this.position = {
      x,
      y
    };
    this.w = w;
    this.h = h;
    
    this.color = 'black';
    this.area = w * h;
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  occupies(x, y) {
    return x > this.bounds().left && x < this.bounds().right &&
           y > this.bounds().top && y < this.bounds().bottom;
  }

  
  bounds(){
    let { x, y } = this.position;
    let w = this.w;
    let h = this.h;
    return {
      left: x,
      right: x + w,
      top: y,
      bottom: y + h,
      upperLeft: { 
        x, 
        y 
      },
      upperRight: { 
        x: x + w, 
        y
      },
      bottomLeft: {
        x: x + w, 
        y: y + h
      },
      bottomRight: {
        x, 
        y: y + h
      }
    };
  }

  draw(ctx) {
    let {x, y} = this.position;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.w , y);
    ctx.lineTo(x + this.w, y + this.h);
    ctx.lineTo(x, y + this.h);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Basket);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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
      this.game.cycle();
      this.user.drawBehind(this.ctx);
      this.game.draw(this.ctx);
      this.user.cycle();
      this.user.draw(this.ctx);
    }, 30);
    
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__powerbar__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__anglebar__ = __webpack_require__(10);




class User {
  constructor(ctx, w, h, game) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.game = game;
    // let width = document.getElementsByTagName('body')[0].clientWidth;
    // let margin = Math.floor((width - this.DIM_X) / 2);
    this.ball = new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */](w / 2, h - 20);
    this.power = 0;
    this.angle = 0;
    document.addEventListener('keypress', this.setPower.bind(this));
    
    this.powerBar = new __WEBPACK_IMPORTED_MODULE_1__powerbar__["a" /* default */]();
    this.angleBar = new __WEBPACK_IMPORTED_MODULE_2__anglebar__["a" /* default */]();
    this.interval;
    this.velocity = {
      x: 0,
      y: 0
    };

    this.before = true;
    
  }

  listen() {
    
  }

  setPower(e){
    e.preventDefault();

    let power = document.getElementById('power');
    let currentPower = parseInt(power.value);
    let angle = document.getElementById('angle');
    let currentAngle = parseInt(angle.value);

    if(e.keyCode === 32 && this.power === 0) {
      this.velocity.y = (-(currentPower * .3));
      this.power = currentPower;
      clearInterval(this.powerBar.interval);
      this.interval =  setInterval(() => this.angleBar.setPower(), 10);
    } else if(e.keyCode === 32 && this.angle === 0) {
      this.velocity.x = ((currentAngle - 50) * 0.1);
      this.angle = currentAngle;
      clearInterval(this.interval);
      this.applySpeed();
    }

  }

  cycle() {
    this.moveBall();
  }

  applySpeed() {
    this.ball.velocity.y = this.velocity.y;
    this.ball.velocity.x = this.velocity.x;

    this.interval = setInterval(() => {
      this.ball.velocity.y += 0.20;
      if(this.ball.position.z < 19)
        this.ball.position.z += 0.05 * 100 / this.power;
    }, 10);

    setTimeout(() => {
      this.game.registerHit(this.ball.position);
      this.before = false;
      //log hit and reset
      setTimeout(() => {
        clearInterval(this.interval);
        this.reset.call(this);
      }, 1000);
    }, 2200 * (this.power / 100));
  }

  moveBall() {
    let { position, velocity } = this.ball;
    position.x += velocity.x;
    position.y += velocity.y;
    // velocity.y += velocity.y;
  }

  draw(ctx) {
    if (this.before) this.ball.draw(ctx, 0);
  }
  drawBehind(ctx) {
    if (!this.before) this.ball.draw(ctx, 0);
  }


  reset() {
    this.ball = new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */](this.w / 2,this.h - 20);
    this.before = true;
    this.powerBar = new __WEBPACK_IMPORTED_MODULE_1__powerbar__["a" /* default */]();
    this.angleBar = new __WEBPACK_IMPORTED_MODULE_2__anglebar__["a" /* default */]();
    this.power = 0;
    this.angle = 0;
    this.velocity = {
      x: 0,
      y: 0
    };
  }
}


/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Ball);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PowerBar {
  constructor() {
    this.direction = 1;

    this.interval = setInterval(() => {
      this.setPower();
    }, 10);
  }
  
  setPower(){
    let power = document.getElementById('power');
    let currentPower = parseInt(power.value);
    if ( currentPower >= 100 ) {
      this.direction = -1;
    } else if (currentPower <= 1) {
      this.direction = 1;
    }

    currentPower += this.direction;

    power.value = currentPower;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PowerBar);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AngleBar {
  constructor() {
    this.direction = 1;
  }
  
  setPower(){
    let angle = document.getElementById('angle');
    let currentAngle = parseInt(angle.value);
    if ( currentAngle >= 100 ) {
      this.direction = -1;
    } else if (currentAngle <= 0) {
      this.direction = 1;
    }

    currentAngle += this.direction;

    angle.value = currentAngle;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AngleBar);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map