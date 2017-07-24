import React from 'react';
var ReactDOM = require('react-dom');
var NavBar = require('Nav');
import Ajax from './utils/ajaxFunctions';
import Main from 'Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

var appUrl = window.location.origin;

injectTapEventPlugin();

// function handleSelect(selectedKey) {
//   alert('selected ' + selectedKey);
// }

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {page: 'All', user:{twitter:{}}};
    this.changePage = this.changePage.bind(this);
  }
  componentDidMount() {
    var self = this;
    Ajax.get(appUrl+'/api/user', function(err, user) {
      console.log(user);
      if(user.status != 'unauthenticated') {
        self.setState({
          user,
          loggedIn: true
        })
      } else {
        self.setState({
          user: {twitter: {username: 'guest'}},
          loggedIn: false
        })
      }
    });
  }
  changePage(page) {
    this.setState({page});
  }
  render(){
    var {page, user} = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <NavBar page={page} changePage={this.changePage}/>
          <Main page={page} user={user}/>
        </div>
      </MuiThemeProvider>
    );
  }
}


ReactDOM.render(<App/>,document.getElementById('app'));
