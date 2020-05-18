import React, {useMemo} from "react";
import {Card} from "antd";
import Control from "./Control";


const Panel = (props) => {

  const styles = useMemo(() => {
    return {
      marginTop: "16px",
      ...props.styles
    }
  }, [props.styles]);

  return (
    <Card title={props.caption} size="small"
          style={styles}
    >
      {
        props.content.map((item, i) => {
          if (item.type === "control") {
            return (
              <Control {...item.props} key={i} obj={props.obj} objProp={item.props.id} order={props.order}/>
            )
          }
        })
      }
    </Card>
  )
};

export default Panel;