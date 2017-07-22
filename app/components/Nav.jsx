import React from 'react';
import ReactDOM from 'react-dom';
var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var NavDropdown = require('react-bootstrap/lib/NavDropdown');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var NavItem = require('react-bootstrap/lib/NavItem');
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const NavBar = () => {
  const navs = (
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
            <li className="active"><a href="#">All <span className="sr-only">(current)</span></a></li>
            <li><a href="#">My Pics</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Add a Pic<span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><TextField hintText="Add a Url" /></li>
                <li><TextField  hintText="Add a description"
                    multiLine={true}
                    rows={1}
                    rowsMax={4}
                    /></li>
                  <li><RaisedButton label="Add Pic" primary={true} style={{margin: 12}} /></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search a user"/>
            </div>
            <button type="submit" className="btn btn-default">Search</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><i className="fa fa-twitter-square" aria-hidden="true"></i> Login with twitter</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  return (
    <div>
      {navs}
    </div>
  )
};

module.exports = NavBar;
