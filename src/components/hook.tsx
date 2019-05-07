import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';

function Hook () {
  const [ count, setCount ] = useState(1);
  useEffect(() => {
    console.log('useEffect invoked');
  }, [count]);
  return (
    <Fragment>
      <h4>这是 State Hook</h4>
      <button onClick={ () => setCount(count + 1) }>点击我改变状态 count</button>
      <p>count is { count }</p>
    </Fragment>
  );
}

export default Hook;
