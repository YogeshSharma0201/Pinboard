import React from 'react';
var ReactDOM = require('react-dom');
var NavBar = require('Nav');
import Main from 'Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

// function handleSelect(selectedKey) {
//   alert('selected ' + selectedKey);
// }

class App extends React.Component{
  render(){
    return (
      <MuiThemeProvider>
        <div>
          <NavBar/>
          <Main/>
        </div>
      </MuiThemeProvider>
    );
  }
}


ReactDOM.render(<App/>,document.getElementById('app'));
