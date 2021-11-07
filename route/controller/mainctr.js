const router = require('express').Router()
const main = require('../model/main')
router.get('/', main.main)
router.get('/notice', main.notice)
router.get('/minboard', main.minboard)
module.exports = router