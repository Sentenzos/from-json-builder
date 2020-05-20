
//Удаляет свойство/элемент объекта/массива, если оно равно undefined,
//а так же удаляем сам объект/массив, если он ничего не содержит.
const filterObject = (obj) => {
  if (obj === null) return obj;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    const newArr = obj.map(filterObject).filter((i) => i !== undefined);
    return newArr.length ? newArr : undefined;
  }

  const newObj = Object.fromEntries(
    Object.entries(obj)
      .map(([key, val]) => ([key, filterObject(val)]))
      .filter(([, val]) => val !== undefined)
  );

  if (Object.keys(newObj).length) {
    return newObj;
  }
};

export default filterObject;