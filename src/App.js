import React, { Component } from 'react';
// import BasicLine from './page/BasicLine';
import Drag from './page/Drag';
import ShowcaseLayout from './page/ToolBoxItem/ToolBoxItem';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <ShowcaseLayout />
      </div>
    );
  }
}

export default App;
