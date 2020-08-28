import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from '../.';

const App = () => {
  return (
    <div>
      <Container />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
