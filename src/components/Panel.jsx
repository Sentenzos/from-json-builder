import React, {useMemo, useCallback} from "react";
import {Button, Card} from "antd";
import Control from "./Control";
import deepClone from "../js/deepClone";
import getFromPath from "../js/getFromPath";
import setImmutable from "../js/setImmutable";


const Panel = React.memo((props) => {

  const styles = useMemo(() => {
    return {
      marginTop: "16px",
      ...props.styles
    }
  }, [props.styles]);


  const addRemoveUnited = useCallback((mode) => {
    //Разбор строки path.
    let path = props.mainPath.split('.');
    //Извлечение оттуда последнего ключа (index)
    let index = +path.pop();

    //Увеличение index на единицу, в случае если нужно добавить объект
    if (mode === "adding") index += 1;

    path = path.join('.');

    if (mode === "adding") {
      //Получение ссылки на данный объект panel и создание его копии.
      const [obj, key] = getFromPath(props.mainPath, props.mainData);
      var panelClone = deepClone(obj[key]);
    }

    props.setMainData(mainData => {
      // //Создание клона mainData
      // const mainDataClone = deepClone(mainData);
      // //Извлечение ссылки на массив объектов
      // const [obj, key] = getFromPath(path, mainDataClone);
      //
      // setImmutable(obj, path, value)
      //
      // //Вставка склонированного объекта panel в массив
      // if (mode === "adding") {
      //   obj[key].splice(index, 0, panelClone);
      // }
      // //Удаление объека panel по индексу
      // if (mode === "deleting") {
      //   obj[key].splice(index, 1);
      // }
      //
      // //Возврат отредактированного клона входных данных
      // return mainDataClone;

      const [obj, key] = getFromPath(path, props.mainData);
      return setImmutable(mainData, path, setByIndex(obj[key], panelClone, index));
      // console.log(path)
      // return mainData
    })
  }, [props.mainPath, props.mainData]);


  const addPanel = useCallback(() => {
    addRemoveUnited("adding");
  }, [addRemoveUnited]);


  const removePanel = useCallback(() => {
    addRemoveUnited("deleting");
  }, [addRemoveUnited]);




  //Возвращает поверхностную копию arr в которую помещает value по index.
  const setByIndex = (arr, value, index) => {
    return [...arr.map((i, ind) => ind < index && i).filter(i => i), value, ...arr.map((i, ind) => ind >= index && i).filter(i => i)];
  };

  return (
    <React.Fragment>
      <Card title={props.caption} size="small"
            style={styles}
      >
        {
          props.content.map((item, i) => {
            if (item.type === "control") {
              return (
                <Control {...item.props} key={i}
                         path={`${props.path}.${item.props.id}`}
                         setOutputData={props.setOutputData}
                         outputData={props.outputData}
                         setReflectionData={props.setReflectionData}
                         setControls={props.setControls}
                         mainData={props.mainData}
                />
              )
            }
          })
        }
      </Card>
      {
        props.isLast &&

        <div className="panel__btns" >
          {
            props.isRemovable ?
              <Button type="default" size="small" danger onClick={removePanel} className="panel__delete-btn">Удалить</Button> : null
          }
          <Button type="default" size="small" onClick={addPanel}>Добавить</Button>
        </div>
      }
    </React.Fragment>
  )
});

export default Panel;