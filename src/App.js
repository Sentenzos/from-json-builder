import React, {useMemo, useState} from "react";
import "./App.css";
import {Button, Modal, Tabs} from "antd";
import "antd/dist/antd.css"
import Control from "./components/Control";
import Panel from "./components/Panel";
import {useImmer} from "use-immer";

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
        ]
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
        ]
      },
      {
        "type": "panel",
        "props": {
          "caption": "Имя панели",
          "id": "h2",
          "visible": false,
          "condVisible": {
            "path": "tab.h1.firstName",
            "value": "Alexx"
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
  //   ]
  // },
  // {
  //   "type": "tab",
  //   "props": {
  //     "caption": "Ещё",
  //     "id": "general",
  //   },
  //   "content": [
  //     {
  //       "type": "control",
  //       "props": {
  //         "type": "string",
  //         "id": "surname",
  //         "caption": "Surname",
  //         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //         "defaultValue": "Smith"
  //       }
  //     },
  //   ]
  // },
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
  //         "id": "firstName",
  //         "caption": "Name",
  //         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //         "defaultValue": "Alex"
  //       }
  //     },
  //   ]
  // }
  //         {
  //           "type": "control",
  //           "props": {
  //             "type": "number",
  //             "id": "age",
  //             "caption": "Age",
  //             "defaultValue": 15
  //           }
  //         },
];

let obj = {};

const App = (props) => {

  const [mainData, changeMainData] = useImmer(dataJSON);
  const [modalVisible, setModalVisible] = useState(false);


  const tabContent = useMemo(() => {
    return mainData.map((item, i) => {
      if (item.type === "tab") {

        obj[item.props.id] = {};

        return (
          <TabPane tab={item.props.caption} key={i}>
            {
              item.content.map((elem, i) => {
                if (elem.type === "panel") {

                  // if (!elem.props.visible && obj)

                  //если panel имеет props multiple, то создать массив
                  if (elem.props.multiple) {
                    if(!obj[item.props.id][elem.props.id]) {
                      obj[item.props.id][elem.props.id] = [];
                    }
                    //в противном случае объект
                  } else {
                    obj[item.props.id][elem.props.id] = {};
                  }

                  return <Panel key={i}
                                {...elem.props}
                                obj={obj[item.props.id][elem.props.id]}
                                //если panel multiple, то необходим order для его дочернего элемента
                                order={i}
                                content={elem.content}
                  />

                }
                if (elem.type === "control") {
                  return <Control {...elem.props} obj={obj[item.props.id]} objProp={elem.props.id}/>
                }
              })
            }
          </TabPane>
        )
      }
    })
  }, []);

  const content = useMemo(() => {
    return mainData.map((item, i) => {
      if (item.type === "panel") {
        return <Panel key={i}
                      {...item.props}
                      content={item.content}
        />
      }
      if (item.type === "control") {
        return <Control {...item.props}/>
      }
    })
  }, [mainData]);


  return (
    <div className="component">
      <Button type="primary" onClick={() => setModalVisible(true)}>Показать</Button>

      <Modal visible={modalVisible}
             title="Имя модального окна"
             bodyStyle={{height: "400px", padding: "0 20px 20px 20px", overflowY: "auto"}}
             width={700}
             centered={true}
             onCancel={() => setModalVisible(false)}
             onOk={() => console.log(obj)}
      >
        {
          tabContent[0] &&
          <Tabs defaultActiveKey={1}>
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


export default App;
