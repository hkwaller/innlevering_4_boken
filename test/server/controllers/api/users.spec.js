var expect =            require('chai').expect,
    ctrl =              require('../../../../server/controllers/albums'),
    api =               require('../../support/api'),
    user =              require('../../support/user')    
    

describe('controllers.users', function() {
    it('exists', function() {
        expect(ctrl).to.exist
    })
})

describe('controllers.api.users', function() {
    
//    describe('POST /api/users', function () {
//        var user =  { username: 'test', password: 'test' }
//
//        beforeEach(function (done) {
//            api.post('/users')
//                .send(user)
//                .expect(200)
//                .end(done)
//        })
//
//        it('has one registered user', function (done) {
//            user.find()
//                .exec(function(err, users) {
//                    if (err) done(err)
//                    expect(users).to.have.length(1);
//                    done();
//                });
//        })
//
//        it('username already exists', function (done) {
//            api.post('/users')
//                .send(user)
//                .expect(401)
//                .end(done)
//        })
//    })
})