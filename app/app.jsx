import React from 'react';
var ReactDOM = require('react-dom');
var NavBar = require('Nav');
import Ajax from './utils/ajaxFunctions';
import Main from 'Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

var appUrl = window.location.origin;

injectTapEventPlugin();

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {page: 'All', user:{twitter:{}}, update: false, loggedIn: false,
                  viewUser: {twitter:{}}};
    this.changePage = this.changePage.bind(this);
    this.addPic = this.addPic.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.handleViewUser = this.handleViewUser.bind(this);
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

  addPic(url, desc) {
    url = url.trim();
    desc = desc.trim();
    desc = desc || 'a pic by @' + this.state.user.twitter.username;
    if(url.length>0) {
      Ajax.post(appUrl+'/api/pics', {url, description: desc}, function(err, d) {
          if(err) return console.log(err.responseText);
          console.log(d);
          this.setState({update: true, pic: d});
      }.bind(this));
    }
  }

  updateComplete() {
    this.setState({update: false});
  }

  handleViewUser(user) {
    this.setState({viewUser: user, page: 'UserPics'})
  }

  render(){
    var {page, user, update, pic, loggedIn, viewUser} = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <NavBar page={page}
                  addPic={this.addPic}
                  changePage={this.changePage}
                  loggedIn={loggedIn}
                  hand
          />
          <Main page={page}
                user={user}
                update={update}
                pic={pic}
                loggedIn={loggedIn}
                updateComplete={this.updateComplete}
                viewUser={viewUser}
                handleViewUser={this.handleViewUser}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}


ReactDOM.render(<App/>,document.getElementById('app'));
