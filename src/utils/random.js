const random = (max, min = 0) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.floor(min))) +
  Math.floor(min);

export default random;
