import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  marginRight: 6,
  button: {
    margin: "12 2 12 2",
  }
};

class Pic extends React.Component {
  render() {
    return (
        <Card className="grid-items">
          <CardMedia>
            <img src={this.props.pic.url} alt="" />
          </CardMedia>
          <div style={{display:'flex'}}>
            <div>
              <CardHeader
                title={this.props.pic.owenerId.twitter.displayName}
                subtitle={this.props.pic.description}
                style={style.marginRight}
                avatar={this.props.pic.owenerId.twitter.imageUrl}
              />
            </div>
            <div >
              <CardActions>
                <RaisedButton
                  label="3"
                  secondary={true}
                  style={style.button}
                  icon={<StarBorderIcon />}
                />
              </CardActions>
            </div>
          </div>


        </Card>
    )
  }
}

module.exports = Pic;
