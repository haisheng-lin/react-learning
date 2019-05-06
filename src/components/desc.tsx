import * as React from 'react';

interface DescProps {
  slot: JSX.Element;
}

class Desc extends React.Component<DescProps> {

  render () {
    return (
      <div>
        { this.props.slot }
        { this.props.children }
      </div>
    );
  }
}

export default Desc;
