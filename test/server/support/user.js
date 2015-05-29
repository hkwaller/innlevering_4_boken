'use strict';

var bcrypt =        require('bcrypt'),
    jwt =           require('jsonwebtoken'),
    config =        require('../../../server/secrets'),
    User =          require('../../../server/models/user');

exports.create = function(username, password, cb) {
    
    var user = new User({username: username});
    
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) { return cb(err); }
        
        user.password = hash;
        user.save(function(err) {
            if (err) { return cb(err); }
            
            user.token = jwt.sign({
                username: user.username
            }, config.jwt);
            
            cb(null, user);
        });
    });  
};