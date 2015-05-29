var router = require('express').Router(),
    bodyParser = require('body-parser')

router.use(bodyParser())

router.use('/albums', require('./albums'))
router.use('/users', require('./users'))
router.use('/sessions', require('./sessions'))

module.exports = router
