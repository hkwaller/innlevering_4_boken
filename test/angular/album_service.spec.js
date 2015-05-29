describe('album.services', function() {
    beforeEach(module('app'));
    var AlbumsService;
    
    beforeEach(inject(function(_AlbumsService_) {
        AlbumService = _AlbumsService_;
    }));
    
    describe('#query', function() {
        it ('exists', function() {
            expect(AlbumService.query).to.exist;
        })
    })
})