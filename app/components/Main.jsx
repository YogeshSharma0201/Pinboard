import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Ajax from './../utils/ajaxFunctions';
import Pic from 'Pic';
import Masonry from 'react-masonry-component';

var masonryOptions = {
    transitionDuration: 0
};

var appUrl = window.location.origin;

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {pics: [], Loading: 'true'};
  }

  componentDidMount() {
    var self = this;
    Ajax.get(appUrl+'/api/pics', function(err, data) {
      if(err) {
        return console.log(err);
      }
      console.log(data);
      self.setState({
        pics: data,
        Loading: 'false'
      })

    });
  }

  render(){
    var childElements = this.state.pics.map(function(pic, i) {
      return (
        <Pic key={i} pic = {pic} className="grid-items" style={{background: 'red'}}/>
      )
    });
    var self = this;
    var RenderPics = function() {
      console.log(self.state.Loading);
      if(self.state.Loading === 'true'){
        return (
          <div style={{textAlign:'center'}}>
            <CircularProgress />
          </div>
        )
      }
      else {
        return (
          <Masonry
              className={'my-gallery-class'}
              elementType={'ul'}
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={false}>
              {childElements}
          </Masonry>
        )
      }
    };
    return (
      <div>
        {RenderPics()}
      </div>
    );
  }
};

module.exports = Main;
