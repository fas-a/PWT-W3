import React from 'react';
import Counter from './Counter';
import ZustandCounter from './ZustandCounter';

function App() {
  return (
    <div>
      <div className="App">
        <Counter />
      </div>
      <div className="App">
        <ZustandCounter />
      </div>
    </div>
  );
}


export default App;