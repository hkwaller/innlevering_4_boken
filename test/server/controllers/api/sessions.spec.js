(function () {
   'use strict';
}());

var api = require('../../support/api');
var expect = require('chai').expect;
var User = require('../../../../server/models/user');
var testUser = require('../../support/user');
var secretKey = require('../../../../server/secrets');
var jwt = require('jwt-simple');
var ctrl = require('../../../../server/controllers/sessions');

describe('controllers.sessions', function() {
    it('exists', function() {
        expect(ctrl).to.exist
    })
})

describe('controllers.api.sessions', function () {
    var token;
    var currentUser;
    
    beforeEach(function (done) {
        User.remove({}, function (err) {
            if (err) console.log(err)
            done(err)
        });
    })
    
    describe('POST /sessions', function () {

        beforeEach(function (done) {
            testUser.create('test', 'test', function (err, user) {
                currentUser = user;
                done(err);
            })
        })
        
        it('throws 404 when user not authorised', function (done) {
            api.post('/sessions')
                .send({ username: 'test2', password: 'test2' })
                .expect(404)
                .end(done)
        })
        
        it('throws 401 when password is invalid', function (done) {

            var testUser = {username: 'test', password: 'notmypassword' };

            api.post('/sessions')
                .send(testUser)
                .expect(401)
                .end(done)
        })
        
        it('returns token matching test user', function (done) {
            var user = { username: currentUser.username, password: 'test' };
            api.post('/sessions')
                .send(user)
                .expect(function (response){                
                    var token = response.body.token
                    var user = jwt.decode(token, secretKey.jwt)
                    expect(user.username).to.equal(currentUser.username)
                })
                .end(done)
        })
    })
})
