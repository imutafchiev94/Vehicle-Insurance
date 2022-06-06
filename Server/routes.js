const router = require('express').Router();
const ownerController = require('./controllers/ownerController');


router.use('/owner', ownerController)

module.exports = router;