
//Принимает строку с путём и объект/массив.
//Возвращает массив с [сылка на предпоследний объект по пути path, последний ключ полученный из path].
//Таким образом позволяет или получить значение по переданному path или задать его.
//Если по пути встречается undefined, то возвращает undefined первым элементом - [undefined, key]

const getFromPath = (path, object) => {
  //Делаем массив из строки пути.
  const arrPath = path.split(/[\.\[\]]/).filter(p => p);
  //Удаляем оттуда и заносим в отдельную переменную последний ключ
  const lastProp = arrPath.pop();

  return [arrPath.reduce((it, prop) => it?.[prop], object), lastProp]
};

export default getFromPath;