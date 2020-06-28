import React, {useCallback, useState, useEffect, useMemo, useLayoutEffect} from "react";
import {Button, Card} from "antd";
import deepClone from "../js/common/deepClone";
import getFromPath from "../js/common/getFromPath";
import setImmutable from "../js/common/setImmutable";
import addByIndex from "../js/common/addByIndex";
import "../styles.css";
import deleteCopies from "../js/deleteCopies";


const Panel = React.memo((props) => {

  //Служит для насильного скрытия элемента его потомком
  const [forceHide, setForceHide] = useState(false);
  //Устанавливается на true при нажатии кнопки "добавить".
  //Предотвращает цепочку сворачиваний, если элемент был добавлен вручную.
  const [preventHide, setPreventHide] = useState(false);

  const elements = useMemo(() => {
    return props.createElement({
      contentArray: props.content, outputPath: `${props.path}.`,
      configPath: `${props.configPath}.content`, isFirst: props.isFirst,
      onlyFirstTitle: props.onlyFirstTitle, inRow: props.inRow,
      forceHideParent: setForceHide
    })
  }, [props.content, props.path,
    props.configPath, props.isFirst, props.onlyFirstTitle, props.inRow, props.createElement]);



  //Сработает только при первом рендере компонента.
  //Если в массиве есть элементы control чье значение берется из объекта predefinedValues (предустановленные данные),
  //то предотвратить сокрытие
  const controlWithValue = useMemo(() => {
    return elements.some((item, index) => {
      if (!item) return ;
      if (item.props.elemType !== "panel") {
        const [obj, key] = getFromPath(item.props.path, props.predefinedValues);
        if (!obj) return;
        if (obj[key] !== undefined) {
          return true;
        }
      }
    })
  }, []);

  //Сработает только при первом рендере компонента.
  //Если в массиве есть элементы panel
  const panelElem = useMemo(() => {
    return elements.some((item, index) => {
      if (!item) return;
      return item.props.elemType === "panel"
    })
  }, []);

  const [hide, toggleHide] = useState(props.collapsed && props.isSingle && !controlWithValue && !panelElem);

  //Сработает только при первом рендере компонента.
  //Если компонент не собирается отрисовывать элементы control с предустаностановленными данными (controlWithValue),
  //и в нем нет других элементов panel (panelElem), то можно свернуть его родителя (если он collapsed)
  useLayoutEffect(() => {
    if (!controlWithValue && !panelElem && props.isSingle) {
      if (props.forceHideParent) {
        props.forceHideParent(true);
      }
    }
  }, []);

  //Если ребенок компонента переключил forceHide на true,
  //то этот компонент необходимо скрыть (если и другие условия тоже true)
  //а так же сделать вызов на сокрытие родителя этого компонента
  useLayoutEffect(() => {
      if (forceHide && !controlWithValue && props.isSingle) {
        if (preventHide) return;

        if (props.collapsed) {
          toggleHide(true);
        }

        if (props.forceHideParent) {
          props.forceHideParent(true);
        }
      }
  }, [forceHide]);

  const addPanel = useCallback(() => {
    //Разбор строки path.
    let path = props.configPath.split('.');
    //Извлечение оттуда последнего ключа (index) и увеличение на единицу
    //для корректного добавления элемента по индексу
    let index = +path.pop() + 1;
    path = path.join('.');

    //Получение ссылки на данный объект panel и создание его копии.
    const [obj, key] = getFromPath(props.configPath, props.configData);
    const panelClone = deepClone(obj[key]);
    //У копии должен быть сброшен keyId.
    panelClone._keyId = undefined;
    //Установка свойства _copy для дальнейшей очиски.
    panelClone._copy = true;
    //Очищает массив content (из panelClone) от элементов со свойством _copy
    deleteCopies(panelClone);

    props.setConfigData(configData => {
      //Извлечение ссылки на массив объектов
      const [obj, key] = getFromPath(path, props.configData);
      let array = key ? obj[key] : obj;

      return setImmutable(configData, path,
        //вернет поверхностную копию массива obj[key] с новым элементом panelClone по индексу index
        addByIndex(array, panelClone, index));
    })
  }, [props.configPath, props.configData]);


  const removePanel = useCallback(() => {
    let path = props.configPath.split('.');
    path.pop();
    path = path.join('.');

    props.setConfigData(configData => {
      const [obj, key] = getFromPath(path, props.configData);
      let array = key ? obj[key] : obj;

      return setImmutable(configData, path,
        [...array.filter((item) => item._keyId !== props.keyId)]);
    })
  }, [props.configPath, props.configData, props.keyId]);


  const hidePanel = useCallback(() => {
    toggleHide(true)
  }, []);


  const showPanel = useCallback(() => {
    let path = props.configPath.split('.');
    let index = +path.pop();
    path = path.join('.');

    const [obj, key] = getFromPath(props.configPath, props.configData);
    const panelClone = deepClone(obj[key]);
    deleteCopies(panelClone);

    props.setConfigData(configData => {
      const [obj, key] = getFromPath(path, props.configData);
      let array = key ? obj[key] : obj;

      return setImmutable(configData, path,
        addByIndex([...array.filter((item) => item._keyId !== props.keyId)], panelClone, index));
    });

    toggleHide(false);
    setPreventHide(true);
  }, [props.configPath, props.configData, props.keyId]);


  const inRowStyles = props.inRow ? {
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "start"
  } : {};


  const firstLineElems = elements.filter(i => !i?.props?.nextLine);
  let nextLineElems = elements.filter(i => i?.props?.nextLine);
  nextLineElems = nextLineElems[0] ? <div style={{margin: "0 1rem"}}>{nextLineElems}</div> : null;


  return (
    <React.Fragment>
      {
        //Компонент panel с header'ом
        !props.noHeader && !hide &&
        <Card title={
          <div>{props.caption}
            <i onClick={(props.isSingle && hidePanel) || removePanel}
                            className="fa fa-trash form-editor__fa-trash"
            />
          </div>
        } size="small" style={{marginTop: "1rem"}}>
          <div style={{...inRowStyles}}>
            {
              firstLineElems
            }
          </div>
          {
            nextLineElems
          }
        </Card>
      }
      {
        //Компонент panel без header'а
        props.noHeader && !hide &&
        <React.Fragment>
          <div style={{...inRowStyles}}>
            {
              firstLineElems
            }
            {
              props.inRow &&
              <i onClick={(props.isSingle && hidePanel) || removePanel}
                 className="fa fa-trash form-editor__fa-trash-right"
              />
            }
          </div>
          {
            nextLineElems
          }
        </React.Fragment>
      }
      {
        //Кнопка добавления
        ((props.isLast && props.multiple) || (props.isSingle && hide)) &&
        <div className="form-editor__panel-btns">
          <Button type="default"
                  size="small"
                  onClick={(props.isSingle && hide && showPanel) || addPanel}>
            {(props.isSingle && hide && "Добавить") || "+"}
          </Button>
          {
            props.isSingle && hide &&
            <span className="form-editor__panel-caption">{props.caption}</span>
          }
        </div>
      }
    </React.Fragment>
  )
});

export default Panel;