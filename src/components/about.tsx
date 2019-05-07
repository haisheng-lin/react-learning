import * as React from 'react';
import { Subscribe } from 'unstated';

import AppStateContainer from '../store/unstated';

import Desc from './desc';

import { getWeatherByCity } from '@/api/weather';

type AboutState = {
  slot: JSX.Element;
  city: string;
  weatherData: any;
}

class About extends React.Component<{}, AboutState> {

  constructor (props: AboutState) {
    super(props);
    this.state = {
      slot: (
        <span>这是 slot 内容</span>
      ),
      city: '',
      weatherData: null,
    };
  }

  getRandomName = (): string => {
    const names = ['luffy', 'zoro', 'chopper'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  handleCityChange = (e: any): void => {
    this.setState({ city: e.target.value });
  }

  handleFormSubmit = (e: any): void => {
    e.preventDefault();
    this.getWeather(this.state.city);
  }

  getWeather = (city: string): void => {
    getWeatherByCity(city)
      .then(data => {
        this.setState({ weatherData: data })
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderWeatherForcast = (data: any) => {
    return (
      <>
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
       </>
    );
  }

  extractWindPower (windPowerString: string): string {
    const reg = /\[CDATA\[(.*)\]\]/;
    const arr = reg.exec(windPowerString);
    if (arr && arr.length === 2) {
      return arr[1];
    }
    return '';
  }

  render () {
    return (
      <Subscribe to={ [AppStateContainer] }>
        {
          (appState: any) => (
            <>
              <h4>测试修改 unstated 状态</h4>
              <p>name: { appState.state.name }</p>
              <button onClick={ () => appState.changeName(this.getRandomName()) }>更改状态</button>
              <h4>内联式 if - 判断渲染内容</h4>
              { appState.state.name === 'zoro' && (<span>如果 name 是 luffy 则看到我</span>) }
              <h4>以下是 slot 用法：</h4>
              <Desc slot={ this.state.slot }>
                <p>这是我的 slot 内容 A</p>
              </Desc>
              <h4>以下是表单</h4>
              <form onSubmit={ (e) => this.handleFormSubmit(e) }>
                <label htmlFor="city">城市:</label>
                <input name="city" type="text" value={ this.state.city } onChange={ this.handleCityChange } />
                <input type="submit" value="查询" />
              </form>
              <h4>以下是调用接口例子</h4>
              {
                this.state.weatherData && this.renderWeatherForcast(this.state.weatherData)
              }
            </>
          )
        }
      </Subscribe>
    );
  }
}

export default About;
