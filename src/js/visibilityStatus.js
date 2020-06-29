import getFromPath from "./common/getFromPath";

//Принимает объект elem и исходные данные data.
//Врзвращает true, если elem должен быть отрисован, в противном случае возвращает undefined.
function visibilityStatus(elem, data) {
  if (elem?.props?.condVisibility === undefined) {
    return true
  }
  //Извлечение значения.
  const [object, key] = getFromPath(elem.props.condVisibility.path, data);
  const condVisibilityMode = elem.props.condVisibility.mode;
  const condVisibilityValue = elem.props.condVisibility.value;


  if (condVisibilityMode === "visible") {
    if (object?.[key] === condVisibilityValue) {
      return true
    } else {
      return undefined
    }
  }
  if (condVisibilityMode === "invisible") {
    if (object?.[key] !== condVisibilityValue) {
      return true
    } else {
      return undefined
    }
  }
}

export default visibilityStatus;