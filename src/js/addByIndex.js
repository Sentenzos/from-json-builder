
//Возвращает поверхностную копию arr в которую помещает value по index.
const addByIndex = (arr, value, index) => {
  return [...arr.filter((_, ind) => ind < index), value, ...arr.filter((i, ind) => ind >= index)];
};

export default addByIndex;