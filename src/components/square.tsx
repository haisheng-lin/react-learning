import * as React from 'react';

interface SquareProps {
  value: string;
  onClick: () => void;
}

// 'SquareProps' describes the shape of props
// State is never set so we use the '{}' type
class Square extends React.Component<SquareProps, {}> {
  render () {
    return (
      <button
        className="square"
        onClick={ () => this.props.onClick() }
      >
        { this.props.value }
      </button>
    );
  }
}

export default Square;
