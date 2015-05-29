var expect =            require('chai').expect,
    ctrl =              require('../../../../server/controllers/albums'),
    api =               require('../../support/api'),
    Album =             require('../../../../server/models/album'),
    user =              require('../../support/user')    
    

describe('controllers.albums', function() {
    it('exists', function() {
        expect(ctrl).to.exist
    })
})

describe('controllers.api.albums', function() {
    
    describe('POST /api/albums', function() {
        var token
        
        beforeEach(function(done) {
            Album.remove({}, function(err) {
                if (err) console.log(err)
            })

            user.create('test', 'test', function(err, user) {
                token = user.token
                done(err)
            })
        })
        
        beforeEach(function(done) {
            api.post('/albums')
                .send({ title: 'Album', artist: 'Artist', creator: 'Creator', public: true })
                .set('X-Auth', token)
                .expect(200)
                .end(done)
        })
        
        it('added one album', function(done) {
            Album.findOne(function(err, album) {
                expect(album.title).to.equal('Album')
                done(err)
            })
        })
        
        
    })
    
    describe('GET /api/albums', function() {
        var token
        
        beforeEach(function(done) {
            user.create('test', 'test', function(err, user) {
                token = user.token
                done(err)
            })
        })
        
        it('has one album', function(done) {
            api.get('/albums')
                .set('X-Auth', token)
                .expect(200)
                .expect(function (response) {
                    expect(response.body).to.have.length(1)
                })
                .end(done)
        })
    
    })
})