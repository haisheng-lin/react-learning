import { Container } from 'unstated';

type AppState = {
  name: string;
}

class AppStateContainer extends Container<AppState> {

  state = {
    name: 'haisheng-lin',
  };

  changeName (name: string): void {
    this.setState({ name });
  }
}

export default AppStateContainer;
