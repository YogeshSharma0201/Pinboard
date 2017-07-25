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
    this.state = {pics: [], Loading: 'true', page: 'MyPics', update: false};
    this.getAllPics = this.getAllPics.bind(this);
    this.getUserPics = this.getUserPics.bind(this);
  }
  getAllPics() {
    var self = this;
    Ajax.get(appUrl+'/api/pics', function(err, data) {
      if(err) {
        return console.log(err);
      }
      // console.log(data);
      self.setState({
        pics: data,
        Loading: 'false',
        page: 'All'
      })
    });
  }
  getUserPics() {
    var self = this;
    Ajax.get(appUrl+'/api/pics/'+this.props.user._id, function(err, data) {
      if(err) {
        return console.log(err);
      }
      console.log(data);
      self.setState({
        pics: data,
        Loading: 'false',
        page: 'MyPics'
      })
    });
  }

  componentDidUpdate() {
    var self = this;
    console.log(this.props.page);
    if(this.state.page != this.props.page) {
      if(this.state.Loading != 'true'){
        this.setState({Loading: 'true'});
      }
      if(this.props.page=='All'){
        this.getAllPics();
      } else {
        this.getUserPics();
      }
    }
    if(this.props.update == true) {
       if(this.state.update == false) {
        console.log('here');
        var pics = this.state.pics;
        pics.unshift(this.props.pic);
        this.setState({pics: pics, update: true});
      } else {
        this.props.updateComplete();
      }
    } else if(this.state.update==true){
      this.setState({update: false});
    }
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
