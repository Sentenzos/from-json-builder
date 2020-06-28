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


const Form = React.memo((props) => {
  const [configData, setConfigData] = useState(deepClone(props.config.content));
  const [predefinedValues, setPredefinedValues] = useState(props.value);
  const [modifiedOutput, setModifiedOutput] = useState({});
  const [entireOutput, setEntireOutput] = useState({});
  const [requiredControls, setRequiredControls] = useState([]);


  useEffect(() => {
    if (!props.value) return;
    setConfigData(() => {
      return addMissingElements(configData, predefinedValues);
    });
  }, []);


  const createElement = useCallback(
    ({contentArray, outputPath = '', configPath = '', isFirst = false,
       onlyFirstTitle = false, inRow = false, forceHideParent}) => {
      //Две эти переменные служат для создания индекса элементов panel со свойством multiple.
      //Индекс должен сбрасываться для каждого panel.
      let multipleIndex,
        panelId;

      const elements = [];
      let tabPanes = [];

      for (let i = 0; i < contentArray.length; i++) {
        let element;

        if (contentArray[i].type === "panel") {
          //Мутабельная установка значения для использования в роли ключа
          if (!contentArray[i]._keyId) {
            contentArray[i]._keyId = uuidv4();
          }

          if (contentArray[i].props.multiple) {
            if (contentArray[i].props.id !== panelId) {
              panelId = contentArray[i].props.id;
              multipleIndex = 0;
            } else {
              multipleIndex++;
            }
          }

          //Если true и отобразится кнопка "добавить".
          const isLast = contentArray[i + 1]?.type !== "panel" ||
            contentArray[i + 1]?.props?.id !== contentArray[i].props.id;

          const isFirst = contentArray[i - 1]?.type !== contentArray[i]?.type ||
            contentArray[i - 1]?.props?.id !== contentArray[i].props.id;

          element = <Panel key={contentArray[i]._keyId}
                           {...contentArray[i].props}
                           content={contentArray[i].content}
                           path={`${outputPath}${contentArray[i].props.id}${contentArray[i].props.multiple ? `.${multipleIndex}` : ""}`}
                           setModifiedOutput={setModifiedOutput}
                           setEntireOutput={setEntireOutput}
                           isFirst={isFirst}
                           isSingle={isFirst && isLast}
                           isLast={isLast}
                           configData={configData}
                           setConfigData={setConfigData}
                            //служит для поиска элементов по пути и их добавления/удаления
                           configPath={`${configPath}.${i}`}
                           setRequiredControls={setRequiredControls}
                           keyId={contentArray[i]._keyId}
                           createElement={createElement}
                           predefinedValues={predefinedValues}
                           forceHideParent={forceHideParent}
                           elemType={contentArray[i].type}

          />;

          if (visibilityStatus(contentArray[i], entireOutput)) {
            elements.push(element);
          } else {
            elements.push(undefined);
          }
          continue;

        } else {
          panelId = undefined;
          multipleIndex = undefined;
        }

        if (contentArray[i].type === "control") {
          element = <Control {...contentArray[i].props}
                             key={`${contentArray[i].type}.${contentArray[i].props.id}`}
                             configPath={configPath}
                             path={`${outputPath}${[contentArray[i].props.id]}`}
                             setModifiedOutput={setModifiedOutput}
                             setEntireOutput={setEntireOutput}
                             setConfigData={setConfigData}
                             configData={configData}
                             setRequiredControls={setRequiredControls}
                             isFirst={isFirst}
                             isLast={contentArray[i + 1]?.type !== contentArray[i].type}
                             onlyFirstTitle={onlyFirstTitle}
                             inRow={inRow}
                             predefinedValues={predefinedValues}
                             setPredefinedValues={setPredefinedValues}
          />;

          if (visibilityStatus(contentArray[i], entireOutput)) {
            elements.push(element);
          } else {
            elements.push(undefined);
          }
          continue;
        }

        if (contentArray[i].type === "tab") {
          let tabPane = <TabPane tab={contentArray[i].props.caption}
                                 key={`${contentArray[i].type}.${contentArray[i].props.id}`}
                                 forceRender={true}>
            {
              createElement(
                {
                  contentArray: contentArray[i].content,
                  outputPath: `${contentArray[i].props.id}.`,
                  configPath: `${i}.content`
                }
              )
            }
          </TabPane>;

          if (visibilityStatus(contentArray[i], entireOutput)) {
            tabPanes.push(tabPane);
          } else {
            tabPanes.push(undefined);
          }

          //Если след. элем. тоже tab, тогда пропустить итерацию.
          if (contentArray[i + 1]?.type === "tab") {
            continue;
            //Если не tab, тогда добавить в массив элементов компонент Tabs содержащий массив tabPanes.
          } else {
            element =
              <Tabs defaultActiveKey={1}
              //Ключ временный. Если tab будут добавляться/удаляться, то следует поменять.
                            key={`${contentArray[i].type}.${contentArray[i].props.id}`}>
              {
                [...tabPanes]
              }
            </Tabs>;
            elements.push(element);
            //Сброс на тот случай, если в пришедших данных будут еще элементы tab
            tabPanes = [];
          }
        }
      }
      return elements;

    }, [configData, entireOutput]);


  const handleOkBtn = useCallback(() => {
    let entireOutputFiltered;
    let modifiedOutputFiltered;

    if (props.config.props.outputFormat === "entire") {
      entireOutputFiltered = filterObject(entireOutput) || {};

    } else if (props.config.props.outputFormat === "modified") {
      modifiedOutputFiltered = filterObject(modifiedOutput) || {};
    }

    props.onOk(entireOutputFiltered || modifiedOutputFiltered);

  }, [modifiedOutput, entireOutput, props.config, props.onOk, configData]);


  const handleCancelBtn = useCallback(() => {
    // setConfigData(deepClone(props.config.content));
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
           // okButtonProps={{disabled: requiredControls.find(i => i.value === null || i.value === undefined || i.value === "")}}
    >
      {
        createElement({contentArray: configData})
      }
    </Modal>
  )
});


export default Form;
