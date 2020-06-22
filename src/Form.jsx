import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Modal, Tabs} from "antd";
import "antd/dist/antd.css"
import Control from "./components/Control";
import Panel from "./components/Panel";
import filterObject from "./js/common/filterObject";
import deepClone from "./js/common/deepClone";
import uuidv4 from "./js/common/uuidv4";
import visibilityStatus from "./js/visibilityStatus";
import addMissingElements from "./js/addMissing";
import "./styles.css";
import "./assets/fontAwesome/font-awesome.css";

const {TabPane} = Tabs;


const Form = (props) => {
  //Объект с входными данными по которым строится интерфейс.
  const [mainData, setMainData] = useState(deepClone(props.config.content));
  const [predefinedData, setPredefinedData] = useState(props.value);
  //Объект для вывода. Содержащий только измененные данные.
  const [outputData, setOutputData] = useState({});
  //Объект для отслеживания видимости. Содержит все данные полей.
  const [reflectionData, setReflectionData] = useState({});
  //Массив содержащий элементы controls со свойством required.
  const [requiredControls, setRequiredControls] = useState([]);


  useEffect(() => {
    if (!props.value) return;
    setMainData(() => {
      return addMissingElements(mainData, predefinedData);
    });
  }, []);


  const createElement = useCallback(
    ({array, outputPath = '', mainPath = '', isFirst = false,
       onlyFirstTitle = false, inRow = false, forceHideParent}) => {
      //Две эти переменные служат для создания индекса элементов panel со свойством multiple.
      //Индекс должен сбрасываться для каждого panel.
      let multipleIndex,
        panelId;

      const elements = [];
      let tabPanes = [];

      for (let i = 0; i < array.length; i++) {
        let element;

        if (array[i].type === "panel") {
          //Мутабельная установка значения для использования в роли ключа
          if (!array[i]._keyId) {
            array[i]._keyId = uuidv4();
          }

          if (array[i].props.multiple) {
            if (array[i].props.id !== panelId) {
              panelId = array[i].props.id;
              multipleIndex = 0;
            } else {
              multipleIndex++;
            }
          }

          //Если элемент последний в списке элементов с одинаковым id,
          //то true и отобразится кнопка "добавить".
          const isLast = array[i + 1]?.type !== "panel" ||
            array[i + 1]?.props?.id !== array[i].props.id;

          //Ключом служит строка с type, id и номер элемента, если он есть.
          element = <Panel key={array[i]._keyId}
                           {...array[i].props}
                           content={array[i].content}
            //Служит для создания объекта
                           path={`${outputPath}${array[i].props.id}${array[i].props.multiple ? `.${multipleIndex}` : ""}`}
                           setOutputData={setOutputData}
                           setReflectionData={setReflectionData}
                           isFirst={array[i - 1]?.type !== array[i]?.type || array[i - 1]?.props?.id !== array[i].props.id}
                           isSingle={isLast && array[i - 1]?.props?.id !== array[i].props.id}
                           isLast={isLast}
                           mainData={mainData}
                           setMainData={setMainData}
            //служит для поиска элементов по пути и их добавления/удаления
                           mainPath={`${mainPath}.${i}`}
                           setRequiredControls={setRequiredControls}
                           keyId={array[i]._keyId}
                           createElement={createElement}
                           predefinedData={predefinedData}
                           forceHideParent={forceHideParent}
                           type={array[i].type}

          />;

          if (visibilityStatus(array[i], reflectionData)) {
            elements.push(element);
          } else {
            elements.push(undefined);
          }
          continue;

        } else {
          panelId = undefined;
          multipleIndex = undefined;
        }

        if (array[i].type === "control") {
          element = <Control {...array[i].props}
                             key={`${array[i].type}.${array[i].props.id}`}
                             mainPath={mainPath}
                             path={`${outputPath}${[array[i].props.id]}`}
                             setOutputData={setOutputData}
                             setReflectionData={setReflectionData}
                             setMainData={setMainData}
                             mainData={mainData}
                             setRequiredControls={setRequiredControls}
                             isFirst={isFirst}
                             isLast={array[i + 1]?.type !== array[i].type}
                             onlyFirstTitle={onlyFirstTitle}
                             inRow={inRow}
                             predefinedData={predefinedData}
                             setPredefinedData={setPredefinedData}
          />;

          if (visibilityStatus(array[i], reflectionData)) {
            elements.push(element);
          } else {
            elements.push(undefined);
          }
          continue;
        }

        if (array[i].type === "tab") {
          let tabPane = <TabPane tab={array[i].props.caption}
                                 key={`${array[i].type}.${array[i].props.id}`}
                                 forceRender={true}>
            {
              createElement(
                {
                  array: array[i].content,
                  outputPath: `${array[i].props.id}.`,
                  mainPath: `${i}.content`
                }
              )
            }
          </TabPane>;

          if (visibilityStatus(array[i], reflectionData)) {
            tabPanes.push(tabPane);
          } else {
            tabPanes.push(undefined);
          }

          //Если след. элем. тоже tab, тогда пропустить итерацию.
          if (array[i + 1]?.type === "tab") {
            continue;
            //Если не tab, тогда добавить в массив элементов компонент Tabs содержащий массив tabPanes.
          } else {
            element = <Tabs defaultActiveKey={1}
              //Ключ временный. Если tab будут добавляться/удаляться, то следует поменять.
                            key={`${array[i].type}.${array[i].props.id}`}>{[...tabPanes]}</Tabs>;
            elements.push(element);
            //Сброс на тот случай, если в пришедших данных будут еще элементы tab
            tabPanes = [];
          }
        }
      }
      return elements;

    }, [mainData, reflectionData]);


  const handleOkBtn = useCallback(() => {
    let reflectionDataClone;
    let outputDataClone;

    if (props.config.props.outputFormat === "entire") {
      reflectionDataClone = filterObject(deepClone(reflectionData)) || {};

    } else if (props.config.props.outputFormat === "modified") {
      outputDataClone = filterObject(deepClone(outputData)) || {};
    }

    props.onOk(reflectionDataClone || outputDataClone);
  }, [outputData, reflectionData, props.config, props.onOk, mainData]);


  const handleCancelBtn = useCallback(() => {
    // setModalVisible(false);
    // setMainData(deepClone(props.config.content));
    props.onCancel();
  }, [props.onCancel]);


  const bodyStyle = useMemo(() => {
    return {
      height: props.config.props?.styles?.height,
      padding: props.config.props?.styles?.padding || "0 20px 20px 20px",
      overflowY: "auto",
    }
  }, [props.config]);


  return (
      <Modal visible={true}
             title={props.config.props.caption}
             bodyStyle={bodyStyle}
             width={props.config.props?.styles?.width}
             centered={true}
             destroyOnClose={true}
             onCancel={handleCancelBtn}
             onOk={handleOkBtn}
             okButtonProps={{disabled: requiredControls.find(i => i.value === null || i.value === undefined || i.value === "")}}
      >
        {
          createElement({array: mainData})
        }
      </Modal>
  )
};


export default Form;
