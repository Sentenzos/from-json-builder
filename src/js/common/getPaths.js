const getPaths = (obj, prefix = '') => {
  return Object.keys(obj).reduce((res, el) => {
    if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...getPaths(obj[el], prefix + el + '.')];
    } else {
      return [...res, prefix + el];
    }
  }, []);
};

export default getPaths;
