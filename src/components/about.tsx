import * as React from 'react';
import { observer, inject } from 'mobx-react';

import Desc from './desc';

import { getWeatherByCity } from '@/api/weather';

interface AboutState {
  list: Array<{ key: string, val: number }>;
  randomBoolFlag: boolean;
  slot: JSX.Element;
  city: string;
  weatherData: any;
}

// provider 属性名叫什么，这里 inject 就叫什么
@inject('appState') @observer
class About extends React.Component<{ location: { pathname: string, query: string }, appState: any }, AboutState> {
  
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
      city: '',
      weatherData: null,
    };
  }

  renderListItem () {
    return this.state.list.map(item => (
      <li key={ item.key }>{ item.val }</li>
    ));
  }

  handleInputChnage (e: any) {
    this.setState({ city: e.target.value });
  }

  handleFormSubmit (e: any) {
    e.preventDefault();
    this.getWeather(this.state.city);
  }

  getWeather (city: string) {
    getWeatherByCity(city)
      .then(data => {
        this.setState({ weatherData: data })
      })
      .catch(err => {
        console.error(err);
      })
  }

  extractWindPower (windPowerString: string): string {
    const reg = /\[CDATA\[(.*)\]\]/;
    const arr = reg.exec(windPowerString);
    if (arr && arr.length === 2) {
      return arr[1];
    }
    return '';
  }

  renderWeatherForcast (data: any) {
    const weatherForcastTable = (
      <React.Fragment>
        <p>{ data.city }</p>
        <table>
          <thead>
            <tr>
              <th>日期</th>
              <th>风力</th>
              <th>风向</th>
              <th>最高温</th>
              <th>最低温</th>
              <th>天气</th>
            </tr>
          </thead>
          <tbody>
            {
              data.forecast.map((item: any) => (
                <React.Fragment key={ item.date }>
                  <tr>
                    <td>{ item.date }</td>
                    <td>{ this.extractWindPower(item.fengli) }</td>
                    <td>{ item.fengxiang }</td>
                    <td>{ item.high }</td>
                    <td>{ item.low }</td>
                    <td>{ item.type }</td>
                  </tr>
                </React.Fragment>
              ))
            }
          </tbody>
        </table>
      </React.Fragment>
    );
    return weatherForcastTable;
  }

  changeMobxState = () => {
    this.props.appState.changeName('updated-name');
  }

  render () {
    return (
      <React.Fragment>
        <h3>This is About component.</h3>
        <h4>以下是列表的循环渲染</h4>
        <ul>
          { this.renderListItem() }
        </ul>
        <h4>以下是条件渲染，我使用的是内联式 if 写法</h4>
        { this.state.randomBoolFlag && (<span>你可能会看到我（如果 randomBoolFlag 为真）</span>) }
        <h4>以下是 slot 用法：</h4>
        <Desc slot={ this.state.slot }></Desc>
        <h4>以下是表单</h4>
        <form onSubmit={ (e) => this.handleFormSubmit(e) }>
          <label htmlFor="city">城市:</label>
          <input name="city" type="text" value={ this.state.city } onChange={ (e) => this.handleInputChnage(e) } />
          <input type="submit" value="查询" />
        </form>
        <h4>以下是调用接口例子</h4>
        {
          this.state.weatherData && this.renderWeatherForcast(this.state.weatherData)
        }
        <h4>以下是 mobx 用法</h4>
        <p>获取 store 状态：{ this.props.appState.msg }</p>
        <button onClick={ this.changeMobxState }>点击修改状态</button>
      </React.Fragment>
    );
  }
}

export default About;
