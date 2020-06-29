
//Возвращает массив с [сылка на предпоследний объект по пути path, последний ключ полученный из path].
//Если по пути встречается undefined, то возвращает undefined первым элементом - [undefined, key]

const getFromPath = (path, object) => {
  const arrPath = path.split(/[\.\[\]]/).filter(p => p);
  const lastProp = arrPath.pop();

  return [arrPath.reduce((it, prop) => it?.[prop], object), lastProp]
};

export default getFromPath;