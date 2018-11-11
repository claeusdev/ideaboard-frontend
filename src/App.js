import React, { Component } from 'react';
import IdeasContainer from './components/IdeasContainer';
class App extends Component {
  render() {
    return (
      <div className="App tc">
        <div className="header">
          <h1 className="app-title">Ideas</h1>
        </div>

        <IdeasContainer />
      </div>
    );
  }
}

export default App;
