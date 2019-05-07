import * as React from 'react';
import { Fragment } from 'react';

function FunctionalComponent (props: { name: string }) {
  return (
    <Fragment>
      { props.name }
    </Fragment>
  );
}

export default FunctionalComponent;
