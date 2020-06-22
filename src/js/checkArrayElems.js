
const checkArrayElems = (array1, array2) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) return false;
  if (array1.length !== array2.length) return false;
  return array1.every(i => array2.includes(i));
};

export default checkArrayElems;