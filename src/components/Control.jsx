import {Checkbox, Col, DatePicker, Input, InputNumber, Row, Select, Tooltip} from "antd/lib/index";
import moment from "moment/moment";
import React, {useCallback, useEffect, useState} from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import setImmutable from "../js/setImmutable";
import filterObject from "../js/filterObject";


const Control = (props) => {
  const {type, defaultValue, id, options} = props;
  const dateFormat = 'YYYY-MM-DD';
  const [value, setValue] = useState(
    //Проверка на options. Если true, значит элемент select
    //и value необходимо задать особым образом
    options && defaultValue && Object.keys(options.find(i => i[defaultValue]))[0] ||
    options && "" || defaultValue
  );

  useEffect(() => {
    //Записывает defaultValue из элемента в объект reflectionData при его монтировании
    props.setReflectionData((draft) => {
      return setImmutable(draft, props.path, defaultValue);
    });
    //Добавляет объект в массив содержащий элементы controls со свойством required.
    if (props.required) {
      props.setRequiredControls((arr) => {
        return [...arr, {path: props.path, value}]
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      //В выходном объекте очищает данные, если они были размонтированы.
      props.setOutputData((draft) => {
        return setImmutable(draft, props.path, undefined);
      });
      //Очищает данные в объекте содержащем все данные полей
      props.setReflectionData((draft) => {
        return filterObject(
          setImmutable(draft, props.path, undefined)
        );
      });
      //Удаляет объект из массива содержащего элементы controls
      //со свойством required.
      if (props.required) {
        props.setRequiredControls((arr) => {
          return [...arr.filter(i => i.path !== props.path)]
        });
      }
    }
  }, [props.path]);


  const handleStrInput = useCallback((e) => {
    const val = e.target.value || null;
    setData(val);
  }, []);

  const handleNumInput = useCallback((data) => {
    setData(data);
  }, []);

  const handleCheckbox = useCallback((e) => {
    const val = e.target.checked;
    setData(val);
  }, []);

  const handleDatePicker = useCallback((momentObj) => {
    const val = momentObj ? moment(momentObj).format(dateFormat) : null;
    setData(val);
  }, []);

  const handleSelect = useCallback((data) => {
    setData(data);
  }, []);


  const setData = useCallback((data) => {

    setValue(data);
    //Установить значение на undefined (далее произойдет очистка свойств с undefined значениями).
    //Вторая часть условия необходима, так как control (если затереть поле) возвращает разные типы данных.
    if (defaultValue === data || (defaultValue === undefined && data === null)) {
      props.setOutputData((draft) => {
        return setImmutable(draft, props.path, undefined);
      });
    } else {
      props.setOutputData((draft) => {
        return setImmutable(draft, props.path, data);
      });
    }

    props.setReflectionData((draft) => {
      return setImmutable(draft, props.path, data);
    });

    if (props.required) {
      props.setRequiredControls((arr) => {
        return [...arr.map(i => i.path === props.path ? {path: props.path, value: data} : i)]
      });
    }
  }, [defaultValue, props.path, props.required]);

  let control;

  switch (type) {
    case "string":
      control = <Input name={id}
                       value={value}
                       onChange={handleStrInput}
                       style={{width: "100%"}}
      />;
      break;

    case "number":
      control = <InputNumber name={id}
                             value={value}
                             onChange={handleNumInput}
                             style={{width: "100%"}}
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
                            style={{width: "100%"}}
      />;
      break;

    case "select":
      control = <Select name={id}
                        value={value}
                        onChange={handleSelect}
                        style={{width: "100%"}}
      >
        {
          options.map((item, i) => {
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
    <Row gutter={[8, 0]} style={{marginTop: "8px", alignItems: "center", width: "100%"}}>
      <Col span={12} style={{justifyContent: "space-between", display: "flex"}}>
        <span>
          {props.caption}
          {
            props.required && <span className="is-required"> *</span>
          }
        </span>
        {
          props.hint &&
          <span>
            <Tooltip title={props.hint}>
              <InfoCircleOutlined style={{cursor: "pointer"}}/>
            </Tooltip>
          </span>
        }
      </Col>
      <Col span={12}>
        {control}
      </Col>
    </Row>
  );
};

export default Control;

