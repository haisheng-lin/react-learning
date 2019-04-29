import * as React from 'react';

interface DescProps {
  slot: JSX.Element;
}

class Desc extends React.Component<DescProps> {

  render () {
    return (
      <div>
        { this.props.slot }
      </div>
    );
  }
}

export default Desc;
