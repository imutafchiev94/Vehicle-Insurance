const router = require('express').Router();
const ownerController = require('./controllers/ownerController');
const vehicleController = require('./controllers/vehicleController');
const insuranceController = require('./controllers/insuranceController');
const paymentController = require('./controllers/paymentController');

router.use('/owner', ownerController);
router.use('/vehicle', vehicleController);
router.use('/insurance', insuranceController);
router.use('/payment', paymentController);
router.get('*', (req, res) => {
    res.status(404).json({message: 'Page not found!'});
})

module.exports = router;