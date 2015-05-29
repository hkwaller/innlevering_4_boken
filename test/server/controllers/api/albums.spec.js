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
    
    
    describe('GET /api/albums', function() {
        beforeEach(function (done) {
            var albums = [
                { title: 'Album 1', artist: 'Artist 1', creator: 'Creator 1', public: true },
                { title: 'Album 2', artist: 'Artist 2', creator: 'Creator 2', public: true },
                { title: 'Album 3', artist: 'Artist 3', creator: 'Creator 3', public: true }
            ];

            Album.create(albums, done);
        })
        
        it("gets error without proper header", function (done) {
            api.get("/albums")
                .expect(401)
                .end(done)
        });
        
        it('has three albums', function(done) {
            api.get('/albums')
                .set('X-Auth', token)
                .expect(200)
                .expect(function (response) {
                    expect(response.body).to.have.length(3)
                })
                .end(done)
        })
    
    })

    describe('POST /api/albums', function() {
        var album = { title: 'Album', artist: 'Artist', creator: 'Creator', public: true };
        beforeEach(function(done) {
            api.post('/albums')
                .send(album)
                .set('X-Auth', token)
                .expect(200)
                .end(done)
        })
        
        it('send request without token', function(done) {
            api.post('/albums')
                .send(album)
                .expect(401)
                .end(done)
        })
        
        it('added one album', function(done) {
            Album.findOne(function(err, album) {
                expect(album.title).to.equal('Album')
                done(err)
            })
        })
    })
    
//    describe('PUT /api/albums', function() {
//
//        beforeEach(function(done) {
//            api.post('/albums')
//                .send({ title: 'Album', artist: 'Artist', creator: 'Creator', public: true })
//                .set('X-Auth', token)
//                .expect(200)
//                .end(done)
//        })
//        
//        it('changes title to an album', function(done) {
//            Album.findOne(function(err, album) {
//                album.title = 'test';
//                album.save(function(err, result) {
//                    expect(result.title).to.equal('test')
//                })
//            })
//        });
//        
//    })
})