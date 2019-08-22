import Layout from '../../component/layout.jsx';
import React, {useState} from 'react';
import {Button} from 'antd';


export default function Home(props) {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  return (<Layout>
    <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(count + 1)}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.message}
      </button>
    </div>
  </Layout>);
}
