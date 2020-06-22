import getFromPath from "./common/getFromPath";

//Принимает объект elem и исходные данные data.
//Врзвращает true, если elem должен быть отрисован, в противном случае возвращает undefined.
function visibilityStatus(elem, data) {
  if (elem?.props?.condVisibility === undefined) {
    return true
  }
  //Извлечение значения.
  const [object, key] = getFromPath(elem.props.condVisibility.path, data);

  if (elem.props.condVisibility.mode === "visible") {
    if (object?.[key] === elem.props.condVisibility.value) {
      return true
    } else {
      return undefined
    }
  }
  if (elem.props.condVisibility.mode === "invisible") {
    if (object?.[key] !== elem.props.condVisibility.value) {
      return true
    } else {
      return undefined
    }
  }
}

export default visibilityStatus;