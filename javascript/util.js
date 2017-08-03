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
    let bound1 = tower[i - 1].position.x;
    let bound2 = tower[i - 1].position.x + tower[i - 1].w;
    if(CoGOfLastBlock < (bound1) || CoGOfLastBlock > (bound2)) {
      return false;
    }
  }
  return true;
}