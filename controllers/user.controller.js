var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUser = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUser
    });
};

module.exports.create = function(req, res){
    res.render('users/create')
};

module.exports.get = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render("users/view", {
        user: user
    });
};

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    var avatarPath = req.file.path.split('/').slice(1).join('/');
    if(avatarPath === "")
        avatarPath = req.file.path.split('\\').slice(1).join('\\');
    req.body.avatar = avatarPath;
    
    db.get('users').push(req.body).write();
    res.redirect('/users');
};