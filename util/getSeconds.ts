const getSeconds = ({ index }) => {
  let seconds = 5;

  // (5 * 3) = 15 seconds
  if (index > 3) {
    seconds = 30;
  }

  // (30 * 5) = 150 seconds
  if (index > 8) {
    seconds = 60;
  }

  return seconds;
};

export default getSeconds;
