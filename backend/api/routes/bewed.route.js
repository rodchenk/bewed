'use strict';
module.exports = function(app) {
  var bewed = require('../controllers/bewed.controller');

  // todoList Routes
  app.route('/test')
    .get(bewed.test)
    .post(bewed.create_a_task);

    app.route('/user').
    	get(bewed.get_user);


  app.route('/tasks/:taskId')
    .get(bewed.read_a_task)
    .put(bewed.update_a_task)
    .delete(bewed.delete_a_task);
};