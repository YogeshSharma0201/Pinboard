import React from 'react';
var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var NavDropdown = require('react-bootstrap/lib/NavDropdown');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var NavItem = require('react-bootstrap/lib/NavItem');
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.togglePage = this.togglePage.bind(this);
    this.handleAddPic = this.handleAddPic.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.state = {Url: "", Desc: ""};
  }
  togglePage(e) {
    e.preventDefault();
    this.props.changePage(e.target.id);
  }
  componentDidUpdate(){
    if(this.props.page == 'All'){
      if(this.refs.All.className != 'active'){
        this.refs.All.className = 'active';
        this.refs.MyPics.className = '';
      }
    } else if(this.props.page =='MyPics') {
      if(this.refs.MyPics.className != 'active'){
        this.refs.MyPics.className = 'active';
        this.refs.All.className = '';
      }
    } else {
      this.refs.MyPics.className = '';
      this.refs.All.className = '';
    }
  }
  handleAddPic(e) {
    console.log(this.state.Url, this.state.Desc);
    this.props.addPic(this.state.Url, this.state.Desc);
  }
  handleChangeUrl(e, newString) {
    this.setState({
      Url: newString
    });
  }
  handleChangeDesc(e, newString) {
    this.setState({
      Desc: newString
    });
  }

  render(){
    console.log('loggedIn', this.props.loggedIn);
    // var ifLoggedIn = function(){
    //   if(this.props.loggedIn === true) {
    //     return (
    //       <li className="dropdown">
    //         <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
    //         <ul className="dropdown-menu">
    //           <li><a href="#">Action</a></li>
    //           <li><a href="#">Another action</a></li>
    //           <li role="separator" className="divider"></li>
    //           <li><a href="#">Separated link</a></li>
    //         </ul>
    //       </li>
    //     );
    //   }
    // }.bind(this);
    var LogInButton = function() {
      if(this.props.loggedIn) {
        return (<li><a href="/logout">Logout</a></li>);
      } else {
        return (
          <li><a href="/auth/twitter"><i className="fa fa-twitter-square" aria-hidden="true"></i> Login with twitter</a></li>
        );
      }
    }.bind(this);

    var renderMyPics = function() {
      if(this.props.loggedIn) {
        return (
          <li ref="MyPics"><a href="#" id="MyPics" onClick={this.togglePage}>My Pics</a></li>
        );
      }
    }.bind(this);
    
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Pinboard</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active" ref="All"><a id="All" href="#" onClick={this.togglePage}>All</a></li>
                {renderMyPics()}
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Add a Pic<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li style={{padding: '0px 10px 0px 10px'}}><TextField  value={this.state.Url} onChange={this.handleChangeUrl} hintText="Add a Url" /></li>
                    <li style={{padding: '0px 10px 0px 10px'}}><TextField  value={this.state.Desc} onChange={this.handleChangeDesc} hintText="Add a description"
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                        /></li>
                      <li><RaisedButton onClick={this.handleAddPic} label="Add Pic" primary={true} style={{margin: 12}} /></li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {LogInButton()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
};

module.exports = NavBar;
