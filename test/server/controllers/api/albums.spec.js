var expect =            require('chai').expect,
    ctrl =              require('../../../../server/controllers/albums'),
    api =               require('../../support/api'),
    Album =             require('../../../../server/models/album'),
    user =              require('../../support/user'),  
    secret =            require('../../../../server/secrets'),
    jwt =               require('jwt-simple')
    

describe('controllers.albums', function() {
    it('exists', function() {
        expect(ctrl).to.exist
    })
})

describe('controllers.api.albums', function() {
    var token;
    var notarealtoken = jwt.encode({username: "notarealuser"}, secret.jwt);
    
    beforeEach(function(done) {
        Album.remove({}, function(err) {
            if (err) console.log(err)
        })

        user.create('test', 'test', function(err, newUser) {
            token = newUser.token
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

    
    describe("PUT /api/albums", function () {
        var id;
        var newToken;
        
        beforeEach(function (done) {
            var album = [
                { title: 'Album 1', artist: 'Artist 1', creator: 'test', public: false }
            ];
            
            Album.create(album, function(err, album) {
                id = album[0]._id
                done(err)
            })
        })

        beforeEach(function(done) {         
            user.create('test2', 'test2', function(err, user) {
                newToken = user.token
                done(err)
            })
        })

        it('throws 401 when no token present', function (done) {
            api.put('/albums/' + id)
                .expect(401)
                .end(done)
        })

        it('throws 401 with a invalid token', function (done) {
            api.put('/albums/' + id)
                .set('X-Auth', notarealtoken)
                .expect(401)
                .end(done)
        })

        it('throws 401 when album belongs to other user', function (done) {
            Album.findById(id, function (err, album) {
                if (err) done(err)
                api.put('/albums/' + id)
                    .send(album)
                    .set('X-Auth', newToken)
                    .expect(401)
                    .end(done)
            })
        })

        it('changed album visibility to public', function (done) {
            Album.findById(id, function (err,album) {
                album.public = true
                api.put('/albums/' + id) 
                    .send(album)
                    .set('X-Auth', token)
                    .expect(200)
                    .end(done)
            })
        })
    })
    
    describe('DELETE /api/albums', function () {
        var id;
        var notarealtoken = jwt.encode({username: 'immafake'}, secret.jwt);

        beforeEach(function (done) {
            var album = [
                { title: 'Album 1', artist: 'Artist 1', creator: 'test', public: false }
            ];
            
            Album.create(album, function(err, album) {
                id = album[0]._id
                done(err);
            })
        })
            
        it('throws 401 when trying to delete without token', function(done) {
            api.delete('/albums/' + id)
                .expect(401)
                .end(done)
        })

        it('throws 401 when trying to delete another users album', function(done) {
            api.delete('/albums/' + id)
                .set('X-Auth', notarealtoken)
                .expect(401)
                .end(done)
        });  
        
        it('deletes album', function(done) {
            api.delete('/albums/' + id) 
                .set('X-Auth', token)
                .expect(200)
                .end(done)
        })
    })
})