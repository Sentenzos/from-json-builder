import setImmutable from "./common/setImmutable";
import getFromPath from "./common/getFromPath";
import deepClone from "./common/deepClone";
import getPaths from "./common/getPaths";
import addByIndex from "./common/addByIndex";

//В этой функции dataJSON проверяется на недостающие элементы по путям из predefinedValues,
//и если какого-то элемента недостает, то он добавляется.
const addMissingElements = (dataJSON, predefinedValues) => {
  const paths = getPaths(predefinedValues);
  let copyData = deepClone(dataJSON);
  //Имена ключей содержат пути, а значения оригинальные объекты необходимые для дальнейшего копирования.
  const originalObjects = {};

  for (let i = 0; i < paths.length; i++) {
    cycle(paths[i]);
  }

  return copyData;

  function cycle(path) {
    const arrPath = path.split(/[\.\[\]]/).filter(p => p);
    let data = copyData;
    let dataJSONPath = '';
    let lastElemIndex;
    let thisPath = '';

    for (let i = 0; i < arrPath.length; i++) {
      if (i === arrPath.length - 1) break;
      //Если ключ строка
      if (isNaN(arrPath[i])) {
        //Найти последний элемент с подходящим id
        lastElemIndex = findLastIndex(data, item => item.props.id === arrPath[i]);

        //Формируется путь необходимый для создания оригинальных объектов.
        thisPath += `.${arrPath[i]}`;
        //Если путь отсутствует, значит значение содержащееся в dataJSON является оригиналом.
        if (!originalObjects[thisPath]) {
          originalObjects[thisPath] = deepClone(data.find(item => item.props.id === arrPath[i]));
        }

        //Если следующий ключ так же является строкой.
        if (isNaN(arrPath[i + 1])) {
          //Углубиться в dataJSON.
          data = data[lastElemIndex].content;
          //Формировать строку отслеживающую углубление.
          dataJSONPath += `${lastElemIndex}.content.`;
        }
        //Если ключ число, то итерация цикла работает с элементом со свойством multiple.
        //Сама число означает что элемент клон и какой он по счету.
      } else {
        //Сколько должнл быть элементов клонов.
        let haveToElements = +arrPath[i] + 1;
        //Сколько элементов клонов на данный момент.
        let thereAreElements = data.filter(item => item.props.id === arrPath[i - 1]);
        //Сколько не хватает.
        let lack = haveToElements - thereAreElements.length;

        //Клонирует оригинальный объект lack раз и добавляет в массив.
        if (lack > 0) {
          let arr = [];
          for (let k = 0; k < lack; k++) {
            const clone = deepClone(originalObjects[thisPath]);
            clone._copy = true;
            clone._keyId = undefined;
            arr.push(clone);
          }

          //Достать массив с элементами которого ведется работа.
          const [obj, key] = getFromPath(dataJSONPath, copyData);
          let array = key ? obj[key] : obj;

          //Поместить в массив недостающие элементы по индексу.
          copyData = setImmutable(copyData, dataJSONPath, addByIndex(array, ...arr, lastElemIndex + 1));
          break
        }

        data = data[lastElemIndex].content;
        dataJSONPath += `${lastElemIndex}.content.`;
      }
    }
  }
};


function findLastIndex(array, callback) {
  const index = array.slice().reverse().findIndex(callback);
  const count = array.length - 1;

  return index >= 0 ? count - index : index;
}

export default addMissingElements;