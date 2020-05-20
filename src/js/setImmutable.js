function setImmutable(obj, path, value) {

  const arrPath = path.split(/[\.\[\]]/).filter(p => p);

  const copy = Array.isArray(obj) ? [...obj] : {...obj};
  let object = copy;

  let i = 0;
  const length = arrPath.length - 1;

  while (i < length) {
    //если значение является массивом
    if (Array.isArray(object[arrPath[i]])) {
      object[arrPath[i]] = [
        ...object[arrPath[i]]
      ];
      //если значение является объектом
    } else if (typeof object[arrPath[i]] === "object") {
      object[arrPath[i]] = {
        ...object[arrPath[i]]
      };
      //если такого ключа еще нет, то создаем
    } else if (!object[arrPath[i]]) {
      //если ключ цифра, то массив
      if (!isNaN(arrPath[i + 1])) {
        object[arrPath[i]] = [];
        //если ключ строка, то объект
      } else {
        object[arrPath[i]] = {};
      }
    }

    object = object[arrPath[i]];
    i++
  }

  if (i === length) {
    object[arrPath[i]] = value;
  }

  return copy
}

export default setImmutable;