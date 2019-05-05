import { observable, computed, action } from 'mobx';

class AppState {
  @observable count = 0;
  @observable name = 'haisheng-lin-test';
  @computed get msg (): string {
    return `${this.name} says count is ${this.count}`;
  }
  @action changeName (name: string) {
    this.name = name;
  }
}

const appState = new AppState();

export default appState;
