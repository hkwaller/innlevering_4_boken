var path =      require('path'),
    blanket =   require('blanket');

blanket({
    pattern: [
        path.resolve(__dirname, '../../../server/controllers')
    ]
}); 