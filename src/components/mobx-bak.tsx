// import { observer, inject } from 'mobx-react';

// // provider 属性名叫什么，这里 inject 就叫什么
// @inject('appState') @observer
// class About extends React.Component<{ location: { pathname: string, query: string }, appState: any }, AboutState> {

//   changeMobxState = () => {
//     this.props.appState.changeName('updated-name');
//   }

//   render () {
//     return (
//       <React.Fragment>
//         <h4>以下是 mobx 用法</h4>
//         <p>获取 store 状态：{ this.props.appState.msg }</p>
//         <button onClick={ this.changeMobxState }>点击修改状态</button>
//       </React.Fragment>
//     );
//   }
// }
