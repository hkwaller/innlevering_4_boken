var expect =            require('chai').expect,
    ctrl =              require('../../../../server/controllers/albums'),
    api =               require('../../support/api'),
    User =              require('../../../../server/models/user'),   
    testUser =          require('../../support/user'),   
    jwt =               require('jwt-simple'),
    secret =            require('../../../../server/secrets')

describe('controllers.users', function() {
    it('exists', function() {
        expect(ctrl).to.exist
    })
})

describe('controllers.api.users', function() {
    var token;
    var currentUser = { username: 'test', password: 'test' }
    
    describe('POST /api/users', function() {
        
        beforeEach(function (done) {
            User.remove({}, function (err) {
                if (err) console.log(err)
            });
            
            api.post('/users')
                .send(currentUser)
                .expect(201)
                .end(done)
        })
    
        it('has one registered user', function (done) {
            User.findOne()
                .exec(function(err, user) {
                    if (err) done(err)
                    expect(currentUser).to.exist;
                    done();
                });
        })
        
        it('fails to register already registered username', function(done) {
            api.post('/users')
                .send(currentUser)
                .expect(412)
                .end(done)
        })
    })
})