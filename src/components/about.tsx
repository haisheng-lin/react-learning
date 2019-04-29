import * as React from 'react';

import Desc from './desc';

interface AboutState {
  list: Array<{ key: string, val: number }>;
  randomBoolFlag: boolean;
  slot: JSX.Element;
}

class About extends React.Component<{ location: { pathname: string, query: string } }, AboutState> {
  
  constructor (props: any) {
    super(props);
    const boolArr = [true, false];
    this.state = {
      list: [
        { key: 'key1', val: 1 },
        { key: 'key2', val: 2 },
        { key: 'key3', val: 3 },
      ],
      randomBoolFlag: boolArr[Math.floor(Math.random() * boolArr.length)],
      slot: (
        <span>这是 slot 内容</span>
      ),
    };
  }

  renderListItem () {
    return this.state.list.map(item => (
      <li key={ item.key }>{ item.val }</li>
    ));
  }

  componentDidMount () {
    console.log(this.props.location.query);
  }

  render () {
    return (
      <React.Fragment>
        <h4>This is About component.</h4>
        <p>以下是列表的循环渲染</p>
        <ul>
          { this.renderListItem() }
        </ul>
        <p>以下是条件渲染，我使用的是内联式 if 写法</p>
        { this.state.randomBoolFlag && (<span>你可能会看到我（如果 randomBoolFlag 为真）</span>) }
        <p>以下是 slot 用法：</p>
        <Desc slot={ this.state.slot }></Desc>
      </React.Fragment>
    );
  }
}

export default About;
