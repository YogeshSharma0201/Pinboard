var User = require('./../models/users.js');
var Pic = require('./../models/pics.js');

var handleError = function(res, err) {
  return res.status(500).send(err);
}

function AppHandler () {

  this.addPic = function (req, res) {
    var pic = req.body;
    pic.owenerId = req.user._id;
    var newPic = new Pic(pic);
    newPic.save(function(err){
      if(err) return handleError(res, err);
      Pic.populate(newPic, {path: "owenerId"}, function(err, pic) {
        if(err) return handleError(res, err);
        res.json(pic);
      })
    })
  };

  this.getAllPics = function(req, res) {
    Pic.find({broken: {$ne: true}})
      .populate('owenerId')
      .sort({date: -1})
      .exec(function(err, pics){
        if(err) {
          if(err) return handleError(res, err);
        }
        res.json(pics);
      })
  };

  this.getUserPics = function(req, res) {
    Pic.find({owenerId: req.params.id})
      .populate('owenerId')
      .sort({date: -1})
      .exec(function(err, pics){
        if(err) {
          if(err) return handleError(res, err);
        }
        res.json(pics);
      });
  };

  this.likePic = function(req, res) {
    Pic.findOneAndUpdate({_id: req.params.id}, {$push: {likers: req.user._id}}, function(err, pic) {
      if(err) return handleError(res, err);
      res.json(pic);
    })
  };

  this.unlikePic = function(req, res) {
    Pic.findOneAndUpdate({_id: req.params.id}, {$pull: {likers: req.user._id}}, function(err, pic) {
      if(err) return handleError(res, err);
      res.json(pic);
    })
  };

  this.deletePic = function(req, res) {
    Pic.findOneAndRemove({_id: req.params.id}, function(err, pic){
      if(err) return handleError(res, err);
      res.json(pic);
    })
  };

  this.restoreBroken = function(req, res) {
    Pic.update({}, {$set: {broken: false}}, {multi: true}, function(err, stats) {
      if(err) return handleError(res, err);
      res.json(stats);
    })
  };

  this.setBroken = function(req, res) {
    Pic.findOneAndUpdate({_id: req.params.id}, {$set: {broken: true}}, function(err, pic){
      if(err) return handleError(res, err);
      res.status(200).send();
    })
  };
}

module.exports = AppHandler;
