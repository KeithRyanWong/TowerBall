export const randColor = () => ( 
  '#' + Math.floor(Math.random()*16777215).toString(16) 
);

export const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};


export const centerOfGravity = (tower) => {
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

export const validPlacement = (tower) => {
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

export const collisionDetected = (block, block2) => {
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