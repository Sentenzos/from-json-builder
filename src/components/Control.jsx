import {Checkbox, Col, DatePicker, Input, InputNumber, Row, Select, Tooltip} from "antd/lib/index";
import moment from "moment/moment";
import React, {useCallback, useState} from "react";
import {InfoCircleOutlined} from "@ant-design/icons";


const Control = (props) => {
  const {type, defaultValue, id, options} = props;
  const dateFormat = 'YYYY-MM-DD';
  const [value, setValue] = useState(
    //Проверка на options. Если true, значит элемент select
    //и value необходимо задать особым образом
    options && defaultValue && Object.keys(options.find(i => i[defaultValue]))[0] ||
    options && "" || defaultValue
  );


  const handleStrInput = useCallback((e) => {
    const val = e.target.value;
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
    const val = momentObj ? moment(momentObj).format(dateFormat) : undefined;
    setData(val);
  }, []);

  const handleSelect = useCallback((data) => {
    setData(data);
  }, []);

  const setData = useCallback((data) => {


    setValue(data);

    //если родитель массив
    if (Array.isArray(props.obj)) {
      props.obj[props.order] = {
        [id]: data
      };

      if (props.obj[props.order][id] === defaultValue) {
        props.obj.splice(props.order, 1);
      }
        //если родитель объект
    } else {
      props.obj[props.objProp] = data;

      if (props.obj[props.objProp] === defaultValue) {
        delete props.obj[props.objProp]
      }
    }
  }, [id, defaultValue]);


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
      const date = value ? moment(value, dateFormat) : undefined;
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
        <span>{props.caption}</span>
        {
          props.hint &&
          <span>
            <Tooltip title={props.hint}>
              <InfoCircleOutlined style={{cursor: "pointer"}} />
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

