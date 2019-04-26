import * as React from 'react';

class About extends React.Component<{ location: { pathname: string, query: string } }> {
  componentDidMount () {
    console.log(this.props.location);
  }
  render () {
    return (
      <div>
        <h4>This is About component.</h4>
      </div>
    );
  }
}

export default About;
