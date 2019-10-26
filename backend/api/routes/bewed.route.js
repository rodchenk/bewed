'use strict';
module.exports = function(app) {
    var bewed = require('../controllers/bewed.controller');

    app.route('/test').get(bewed.test);
    app.route('/user').
        get(bewed.get_user).
        post(bewed.add_user);
    app.route('/couch').get(bewed.couch);
};