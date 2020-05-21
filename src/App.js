import React, {useCallback, useMemo, useState} from "react";
import "./App.css";
import {Button, Modal, Tabs} from "antd";
import "antd/dist/antd.css"
import Control from "./components/Control";
import Panel from "./components/Panel";
import getFromPath from "./js/getFromPath";
import filterObject from "./js/filterObject";
import deepClone from "./js/deepClone";

const {TabPane} = Tabs;


const dataJSON = [
  {
    "type": "tab",
    "props": {
      "caption": "Основные",
      "id": "general",
    },
    "content": [
      {
        "type": "panel",
        "props": {
          "caption": "Имя панели",
          "id": "h1",
          "multiple": true
        },
        "content": [
          {
            "type": "control",
            "props": {
              "type": "string",
              "id": "firstName",
              "caption": "Name",
              "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "required": true,
              "defaultValue": "Alex"
            }
          },
          {
            "type": "control",
            "props": {
              "type": "number",
              "id": "age",
              "caption": "Age",
              "defaultValue": 16
            }
          },
        ]
      },
      // {
      //   "type": "panel",
      //   "props": {
      //     "caption": "Имя панели",
      //     "id": "h1",
      //     "multiple": true
      //   },
      //   "content": [
      //     {
      //       "type": "control",
      //       "props": {
      //         "type": "string",
      //         "id": "firstName",
      //         "caption": "Name",
      //         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //         "defaultValue": "Alex"
      //       }
      //     },
      //     {
      //       "type": "control",
      //       "props": {
      //         "type": "number",
      //         "id": "age",
      //         "caption": "Age",
      //         "defaultValue": 15
      //       }
      //     },
      //   ]
      // },
      {
        "type": "panel",
        "props": {
          "caption": "Имя панели",
          "id": "h2",
          "condVisibility": {
            "mode": "invisible",
            "path": "general.h1.0.age",
            "value": 16
          }
        },
        "content": [
          {
            "type": "control",
            "props": {
              "type": "string",
              "id": "firstName",
              "caption": "Name",
              "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "defaultValue": "Alex"
            }
          },
          {
            "type": "control",
            "props": {
              "type": "number",
              "id": "age",
              "caption": "Age",
              "defaultValue": 15
            }
          },
          {
            "type": "control",
            "props": {
              "type": "boolean",
              "id": "agreement",
              "caption": "Signature",
              "defaultValue": true
            }
          },
          {
            "type": "control",
            "props": {
              "type": "date",
              "id": "date",
              "caption": "Date",
              "defaultValue": "2020-05-12"
            }
          },
          {
            "type": "control",
            "props": {
              "type": "select",
              "id": "cities",
              "caption": "Country",
              "defaultValue": "omsk",
              "options": [
                {"msc": "Moscow"},
                {"spb": "Saint Petersburg"},
                {"omsk": "Omsk"},
                {"chel": "Chelyabinsk"}
              ]
            }
          },
        ]
      },
      {
        "type": "control",
        "props": {
          "type": "select",
          "id": "cities",
          "condVisibility": {
            "mode": "invisible",
            "path": "general.h1.1.age",
            "value": 17
          },
          "caption": "Country",
          "defaultValue": "omsk",
          "options": [
            {"msc": "Moscow"},
            {"spb": "Saint Petersburg"},
            {"omsk": "Omsk"},
            {"chel": "Chelyabinsk"}
          ]
        }
      },
      {
        "type": "control",
        "props": {
          "type": "string",
          "id": "empty",
          "caption": "Empty",
          "required": true
          // "defaultValue": "omsk",
        }
      },
    ]
  },


  // {
  //   "type": "tab",
  //   "props": {
  //     "caption": "Основные",
  //     "id": "general",
  //   },
  //   "content": [
  //     {
  //       "type": "panel",
  //       "props": {
  //         "caption": "Имя панели",
  //         "id": "h1",
  //       },
  //       "content": [
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "string",
  //             "id": "firstName",
  //             "caption": "Name",
  //             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             "defaultValue": "Alex"
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "number",
  //             "id": "age",
  //             "caption": "Age",
  //             "defaultValue": 15
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "boolean",
  //             "id": "agreement",
  //             "caption": "Signature",
  //             "defaultValue": true
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "date",
  //             "id": "date",
  //             "caption": "Date",
  //             "defaultValue": "2020-05-12"
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "select",
  //             "id": "cities",
  //             "caption": "Country",
  //             "defaultValue": "omsk",
  //             "options": [
  //               {"msc": "Moscow"},
  //               {"spb": "Saint Petersburg"},
  //               {"omsk": "Omsk"},
  //               {"chel": "Chelyabinsk"}
  //             ]
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       "type": "panel",
  //       "props": {
  //         "caption": "Имя панели",
  //         "id": "h2"
  //       },
  //       "content": [
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "string",
  //             "id": "firstName",
  //             "caption": "Name",
  //             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             "defaultValue": "Alex"
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "number",
  //             "id": "age",
  //             "caption": "Age",
  //             "defaultValue": 15
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "boolean",
  //             "id": "agreement",
  //             "caption": "Signature",
  //             "defaultValue": true
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "date",
  //             "id": "date",
  //             "caption": "Date",
  //             "defaultValue": "2020-05-12"
  //           }
  //         },
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "select",
  //             "id": "cities",
  //             "caption": "Country",
  //             "defaultValue": "omsk",hike
  //             "options": [
  //               {"msc": "Moscow"},
  //               {"spb": "Saint Petersburg"},
  //               {"omsk": "Omsk"},
  //               {"chel": "Chelyabinsk"}
  //             ]
  //           }
  //         },
  //       ]
  //     },
  //   ]
  // },


  {
    "type": "tab",
    "props": {
      "caption": "Другое",
      "id": "Other",
    },
    "content": [
      {
        "type": "control",
        "props": {
          "type": "string",
          "id": "surname",
          "caption": "Surname",
          "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "defaultValue": "Smith"
        }
      },
      {
        "type": "panel",
        "props": {
          "caption": "Имя панели",
          "id": "h1",
          "multiple": true
        },
        "content": [
          {
            "type": "control",
            "props": {
              "type": "string",
              "id": "firstName",
              "caption": "Name",
              "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "required": true,
              "defaultValue": "Alex"
            }
          },
          {
            "type": "control",
            "props": {
              "type": "number",
              "id": "age",
              "caption": "Age",
              "defaultValue": 16
            }
          },
        ]
      },
    ]
  },


  // {
  //   "type": "panel",
  //   "props": {
  //     "caption": "Имя панели",
  //     "id": "h1"
  //   },
  //   "content": [
  //     {
  //       "type": "control",
  //       "props": {
  //         "type": "string",
  //         "id": "firstName",
  //         "caption": "Name",
  //         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //         "defaultValue": "Alex"
  //       }
  //     },
  //     {
  //       "type": "control",
  //       "props": {
  //         "type": "string",
  //         "id": "lastName",
  //         "caption": "LastName",
  //         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //         "defaultValue": "Smith"
  //       }
  //     },
  //     {
  //       "type": "control",
  //       "props": {
  //         "type": "string",
  //         "id": "hobby",
  //         "caption": "Hobby",
  //         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //         "defaultValue": "Hike"
  //       }
  //     },
  //   ]
  // },
  // {
  //   "type": "control",
  //   "props": {
  //     "type": "number",
  //     "id": "age",
  //     "caption": "Age",
  //     "defaultValue": 15
  //   }
  // },
  // {
  //   "type": "control",
  //   "props": {
  //     "type": "number",
  //     "id": "temperature",
  //     "caption": "Temperature",
  //     "defaultValue": 15
  //   }
  // },
  // {
  //   "type": "control",
  //   "props": {
  //     "type": "number",
  //     "id": "moisture",
  //     "caption": "Moisture",
  //     "defaultValue": 15
  //   }
  // },
];


const ModalWindow = (props) => {
  //Объект с входными данными по которым строится интерфейс.
  const [mainData, setMainData] = useState(deepClone(dataJSON));
  //Объект для вывода. Содержащий только измененные данные.
  const [outputData, setOutputData] = useState({});
  //Объект для отслеживания видимости. Содержит все данные полей.
  const [reflectionData, setReflectionData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  //Массив содержащий элементы controls со свойством required.
  const [requiredControls, setRequiredControls] = useState([]);


  const createElement = (array, outputPanelPath = '', outputControlPath = '', mainPath = '') => {
    return array.map((elem, i) => {
      let element;

      if (elem.type === "panel") {

        //Если элемент multiple и является последним в своей группе элементов с одинаковым id,
        //то true и отобразится кнопка "добавить".
        const isLast = elem.props.multiple && (array[i + 1]?.type !== "panel" ||
          array[i + 1]?.props?.id !== array[i].props.id);

                          //Ключом служит строка с type, id и номер элемента, если он есть.
        element = <Panel key={`${elem.type}.${elem.props.id}${elem.props.multiple ? `.${i}` : ""}`}
                         {...elem.props}
                         content={elem.content}
                          //Часть пути приходит в параметрах.
                         path={`${outputPanelPath}${elem.props.id}${elem.props.multiple ? `.${i}` : ""}`}
                         setOutputData={setOutputData}
                         setReflectionData={setReflectionData}
                         isLast={isLast}
                         //если элемент последний (и multiple) и перед ним элемент с таким же id
                         isRemovable={isLast && array[i - 1]?.props?.id === array[i].props.id}
                         mainData={mainData}
                         setMainData={setMainData}
                         mainPath={`${mainPath}${elem.props.multiple ? `.${i}` : ""}`}
                         setRequiredControls={setRequiredControls}
        />
      }

      if (elem.type === "control") {
        element = <Control {...elem.props}
                           key={`${elem.type}.${elem.props.id}`}
                           path={`${outputControlPath}${[elem.props.id]}`}
                           setOutputData={setOutputData}
                           setReflectionData={setReflectionData}
                           mainData={mainData}
                           setRequiredControls={setRequiredControls}
        />;
      }

      //Будет ли элемент смонтирован или нет зависит от настроек видимости.
      if (elem?.props?.condVisibility === undefined) return element;
      //Извлечение значения.
      const [object, key] = getFromPath(elem.props.condVisibility.path, reflectionData);

      if (elem.props.condVisibility.mode === "visible") {
        if (object?.[key] === elem.props.condVisibility.value) return element;
        return null
      }
      if (elem.props.condVisibility.mode === "invisible") {
        if (object?.[key] !== elem.props.condVisibility.value) return element;
        return null
      }
    })
  };

  const tabContent = useMemo(() => {
    return mainData.map((item, i) => {
      if (item.type === "tab") {
        return (
          <TabPane tab={item.props.caption} key={i}>
            {
              createElement(item.content,
                `${item.props.id}.`,
                `${item.props.id}.`,
                `${i}.content`
              )
            }
          </TabPane>
        )
      }
    })
  }, [reflectionData, mainData]);


  const content = useMemo(() => {
    return createElement(mainData);
  }, [reflectionData, mainData]);

  const handleOkBtn = useCallback(() => {
    let clone = deepClone(outputData);
    // console.log(reflectionData);
    console.log(filterObject(clone) || {});
  }, [outputData,
    // reflectionData
  ]) ;

  const handleCancelBtn = useCallback(() => {
    setModalVisible(false);
    setMainData(deepClone(dataJSON));
  }, []);

  const bodyStyle = useMemo(() => {
    return {
      height: "400px",
      padding: "0 20px 20px 20px",
      overflowY: "auto"
    }
  }, []);

  return (
    <div className="component">
      <Button type="primary" onClick={() => setModalVisible(true)}>Показать</Button>

      <Modal visible={modalVisible}
             title="Имя модального окна"
             bodyStyle={bodyStyle}
             width={700}
             centered={true}
             destroyOnClose={true}
             onCancel={handleCancelBtn}
             onOk={handleOkBtn}
             okButtonProps={{disabled: requiredControls.find(i => i.value === null || i.value === undefined || i.value === "")}}
      >
        {
          tabContent.length &&
          <Tabs defaultActiveKey={1}
                // destroyInactiveTabPane={true}
          >
            {tabContent}
          </Tabs>
        }
        {
          content
        }
      </Modal>
    </div>
  )
};


export default ModalWindow;
