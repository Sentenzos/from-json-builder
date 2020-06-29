import {Checkbox, DatePicker, Input, InputNumber, Select, Tooltip} from "antd/lib/index";
import moment from "moment/moment";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import setImmutable from "../js/common/setImmutable";
import "../styles.css";
import getFromPath from "../js/common/getFromPath";
import checkArrayElems from "../js/checkArrayElems";


const Control = React.memo((props) => {
  const {type, defaultValue, id, options} = props;
  const dateFormat = 'YYYY-MM-DD';
  const [predefinedData, predefinedKey] = useMemo(() => {
    return getFromPath(props.path, props.predefinedValues);
  }, [props.path, props.predefinedValues]);

  const [value, setValue] = useState(() => {
    const thereIsPredefinedData = predefinedData?.[predefinedKey] !== undefined;
    if (thereIsPredefinedData) return predefinedData[predefinedKey];

    if (options && defaultValue) {
      return defaultValue
    }

    if (options && !defaultValue) {
      if (props.multipleOptions) {
        return []
      } else {
        return null;
      }
    }

    return defaultValue;
  });


  useEffect(() => {
    props.setModifiedOutput((modifiedOutput) => {
      return setImmutable(modifiedOutput, props.path,
        value !== defaultValue ? value : undefined);
    });

    props.setEntireOutput((entireOutput) => {
      return setImmutable(entireOutput, props.path,
        value === undefined || (Array.isArray(value) && !value[0]) ? null : value);
    });

    if (props.required) {
      props.setRequiredControls((arr) => {
        return [...arr, {path: props.path, value}]
      });
    }

    //Очистка данных при размонтировании
    return () => {
      props.setModifiedOutput((modifiedOutput) => {
        return setImmutable(modifiedOutput, props.path, undefined)
      });
      props.setEntireOutput((entireOutput) => {
        return setImmutable(entireOutput, props.path, undefined)
      });
      if (props.required) {
        props.setRequiredControls((arr) => {
          return [...arr.filter(i => i.path !== props.path)]
        });
      }

      const thereIsPredefinedData = predefinedData?.[predefinedKey] !== undefined;
      if (thereIsPredefinedData) {
        props.setPredefinedValues((data) => {
          return setImmutable(data, props.path, undefined)
        });
      }
    }
  }, [props.path]);


  const setData = useCallback((data) => {
    setValue(data);

    const isEmptyMultipleSelect = Array.isArray(data) && !data[0];
    if (isEmptyMultipleSelect) data = null;

    const outputValueMustBeReset = defaultValue === data ||
      checkArrayElems(defaultValue, data) ||
      (defaultValue === undefined && data === null);

    if (outputValueMustBeReset) {
      //Если задать undefined, то свойство в дальнейшем удалится.
      props.setModifiedOutput((modifiedOutput) => {
        return setImmutable(modifiedOutput, props.path, undefined);
      });
    } else {
      props.setModifiedOutput((modifiedOutput) => {
        return setImmutable(modifiedOutput, props.path, data);
      });
    }

    props.setEntireOutput((entireOutput) => {
      return setImmutable(entireOutput, props.path, data === null ? null : data);
    });

    if (props.required) {
      props.setRequiredControls((arr) => {
        return [...arr.map(i => i.path === props.path ? {path: props.path, value: data} : i)]
      });
    }
  }, [defaultValue, props.path, props.required]);


  const handleStrInput = useCallback((e) => {
    const val = e.target.value || null;
    setData(val);
  }, [setData]);

  const handleNumInput = useCallback((data) => {
    setData(data);
  }, [setData]);

  const handleCheckbox = useCallback((e) => {
    const val = e.target.checked;
    setData(val);
  }, [setData]);

  const handleDatePicker = useCallback((momentObj) => {
    const val = momentObj ? moment(momentObj).format(dateFormat) : null;
    setData(val);
  }, [setData]);

  const handleSelect = useCallback((data) => {
    setData(data);
    // if (props.withRequest) {
    //
    //   //API запроса берется из объекта withRequest
    //   //
    //   const template = {
    //     "type": "control",
    //     "props": {
    //       "type": "string",
    //       "id": "response-1",
    //       "caption": "Ответ-1",
    //       "defaultValue": "Madagascar",
    //       "styles": {
    //         "controlWidth": "300px"
    //       },
    //       "condVisibility": {
    //         "mode": "visible",
    //         "path": props.path,
    //         "value": "msc"
    //       },
    //       "nextLine": true,
    //     }
    //   };
    //
    //   //отправка запроса, блокировка всех кнопок
    //   new Promise((res) => {
    //     setTimeout(() => res(data), 1500)
    //   })
    //     .then((res) => {
    //       if (res !== "msc") return;
    //       const [obj, key] = getFromPath(props.configPath, props.configData);
    //       console.log(obj[key]);
    //       props.setConfigData((configData) => {
    //         return setImmutable(configData, props.configPath, [...obj[key], template])
    //       })
    //     })
    // }
  }, [setData, props.configData]);


  let control;

  switch (type) {
    case "string":
      control = <Input name={id}
                       value={value}
                       onChange={handleStrInput}
                       style={{width: "100%", borderColor: props.required && !value && "red"}}
      />;
      break;

    case "number":
      control = <InputNumber name={id}
                             value={value}
                             onChange={handleNumInput}
                             style={{width: "100%", borderColor: props.required && !value && "red"}}
      />;
      break;

    case "boolean":
      control = <Checkbox name={id}
                          checked={value}
                          onChange={handleCheckbox}
      />;
      break;

    case "date":
      const date = value ? moment(value, dateFormat) : null;
      control = <DatePicker name={id}
                            value={date}
                            onChange={handleDatePicker}
                            style={{width: "100%", borderColor: props.required && !value && "red"}}
      />;
      break;

    case "select":
      control = <Select name={id}
                        mode={props.multipleOptions && "multiple"}
                        value={value}
                        onChange={handleSelect}
                        style={{
                          width: "100%",
                          borderRadius: "0.15rem",
                          border: props.required && !value && "1px solid red"
                        }}
      >
        {
          options?.map((item, i) => {
            return (
              <Select.Option value={Object.keys(item)[0]} key={i}>
                {
                  Object.values(item)[0]
                }
              </Select.Option>
            )
          })
        }
      </Select>;
      break;
  }


  return (
    //Элемент control целиком
    <div style={{
      marginTop: "8px", alignItems: "center",
      display: "flex",
      width: props?.styles?.controlWidth || "",
      flexDirection: props.inRow ? "column" : "row"
    }}>
      {
        //Отображать название в следующих случаях
        ((!props.onlyFirstTitle) || (props.onlyFirstTitle && props.isFirst)) &&
        <div style={{
          justifyContent: (props.inRow ? "center" : "space-between"),
          display: "flex",
          width: props?.styles?.captionWidth || (props.inRow ? "98%" : "50%"),
          height: props?.styles?.captionHeight || (props.inRow ? "3rem" : ""),
          alignItems: "center", textAlign: "center"
        }}>
          <span>
            {props.caption}
            {
              props.required && <span className="form-editor__isRequired"> *</span>
            }
          </span>
          {
            props.hint &&
            <span>
            <Tooltip title={props.hint}>
              <i className="form-editor__hint fas fa-info-circle"/>
            </Tooltip>
          </span>
          }
        </div>
      }

      <div style={{
        width: props?.styles?.elemWidth || (props.inRow ? "98%" : "50%"),
        display: "flex", justifyContent: props.inRow ? "center" : ""
      }}>
        {control}
      </div>
    </div>
  );
});

export default Control;

