const router = require('express').Router();
const ownerController = require('./controllers/ownerController');


router.use('/owner', ownerController)

//TODO: Add login and register and roles for insurance agent and for the owner of vehicle

module.exports = router;