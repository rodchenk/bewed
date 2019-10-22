'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.get_user = function(req, res){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("bewed");
    dbo.collection("bewed_collection").findOne({}, function(err, result) {
      if (err) throw err;
      //console.log(result.name);
      res.json(result);
      db.close();
    });
  });
}

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.test = function(req, res){
  res.json({
    "content" : "Hello world!"
  });
}

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
