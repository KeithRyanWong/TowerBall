export const randColor = () => (
  '#' + Math.floor(Math.random() * 16777215).toString(16)
);

export const rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const centerOfGravity = (arr) => {
  let parent = arr.shift();
  let datum = arr[0].body.position.x;
  let weights = [];
  let distances = [];
  let moments = [];

  arr.forEach((obj, i) => {
    weights.push(obj.area);
    distances.push((obj.w / 2.0) - datum);
    moments.push(weights[i] * distances[i]);
  });

  let moment = moments.reduce((sum, objMoment) => (sum + objMoment), 0);
  let weight = weights.reduce((sum, objWeight) => (sum + objWeight), 0);
  
  return moment / weight;
};