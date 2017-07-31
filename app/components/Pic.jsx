import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Ajax from './../utils/ajaxFunctions';

var appUrl = window.location.origin;

const style = {
  marginRight: 6,
  button: {
    margin: "12 2 12 2",
  }
};

class Pic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {likers: this.props.pic.likers.length, liked: false}
    this.handleClick = this.handleClick.bind(this);
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }

  componentDidMount() {
    var liked = false;
    this.props.pic.likers.forEach(function(liker) {
      if(liker === this.props.pic.owenerId._id) {
        liked = true;
      }
    }.bind(this));
    this.setState({liked});
  }

  handleClick(e) {
    if(this.props.loggedIn !== true) {
      alert('You need to be logged In to like a pic.');
    } else {
      if(this.state.liked === true) {
        Ajax.put(appUrl+'/api/pics/'+this.props.pic._id, {}, function(err, data) {
          if(err) {
            return console.log(err);
          }
          this.setState({liked: !this.state.liked, likers: this.state.likers-1});
        }.bind(this));
      } else {
        Ajax.post(appUrl+'/api/pics/'+this.props.pic._id, {}, function(err, data) {
          if(err) {
            return console.log(err);
          }
          this.setState({liked: !this.state.liked, likers: this.state.likers+1});
        }.bind(this));
      }
    }
  }

  handleAvatarClick(e) {
    if(e.target.nodeName === 'IMG') {
      var user = this.props.pic.owenerId;
      this.props.handleViewUser(user);
    }
  }

  render() {
    var {likers, liked} = this.state;
    var likers = likers.toString();
    return (
        <Card className="grid-items">
          <CardMedia>
            <img src={this.props.pic.url} alt="" />
          </CardMedia>
          <div style={{display:'flex'}}>
            <div style={{flex: '3'}}>
              <CardHeader onTouchTap={this.handleAvatarClick}
                className="cardHeader"
                title={this.props.pic.owenerId.twitter.displayName}
                subtitle={this.props.pic.description}
                avatar={this.props.pic.owenerId.twitter.imageUrl}
                style={{padding: '5px'}}
              />
            </div>
            <div>
              <CardActions className="cardActions">
                <RaisedButton
                  label={likers}
                  secondary={true}
                  style={style.button}
                  icon={liked?<StarIcon/>:<StarBorderIcon />}
                  onTouchTap={this.handleClick}
                />
              </CardActions>
            </div>
          </div>


        </Card>
    )
  }
}

module.exports = Pic;
