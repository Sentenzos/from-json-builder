
//Возвращает ссылку на последнее свойство объета.
//Работает и с Proxy.
const getFromPath = (path, object) => {
  //Делаем массив из строки пути.
  const arrPath = path.split(/[\.\[\]]/).filter(p => p);
  //Удаляем оттуда и заносим в отдельную переменную последний ключ
  const lastProp = arrPath.pop();

  return arrPath.reduce((it, prop) => it[prop], object)[lastProp]
};

export default getFromPath;