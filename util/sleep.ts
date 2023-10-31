const sleep = ({ seconds }) => {
  return new Promise((resolve) => {
    const milliseconds = seconds * 1000;

    setTimeout(() => {
      return resolve(true);
    }, milliseconds);
  });
};

export default sleep;
