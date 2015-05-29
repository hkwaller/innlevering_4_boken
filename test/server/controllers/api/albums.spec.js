var expect =            require('chai').expect
var ctrl =              require('../../../../server/controllers/albums'),
    api =               require('../../support/api')

describe('controllers.albums', function() {
    it('exists', function() {
        expect(ctrl).to.exist
    })
})

describe('controllers.api.albums', function() {
    describe('GET /api/albums', function() {
        it('exists', function(done) {
            api.get('/api/albums/')
                .expect(200)
                .end(done)
        })
    })
})