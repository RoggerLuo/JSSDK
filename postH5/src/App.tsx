import * as React from "react";

import * as Antd from 'antd-mobile';

const Example = () => (
  <Antd.WingBlank>
    <Antd.Button>default</Antd.Button><Antd.WhiteSpace />
    <Antd.Button disabled>default disabled</Antd.Button><Antd.WhiteSpace />

    <Antd.Button type="primary">primary</Antd.Button><Antd.WhiteSpace />
    
  </Antd.WingBlank>
);
export default Example