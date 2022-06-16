const router = require('express').Router();
const ownerController = require('./controllers/ownerController');
const vehicleController = require('./controllers/vehicleController');
const insuranceController = require('./controllers/insuranceController');
const paymentController = require('./controllers/paymentController');
const homeController = require('./controllers/homeController');
const accidentController = require('./controllers/accidentController');

router.use('/owner', ownerController);
router.use('/vehicle', vehicleController);
router.use('/insurance', insuranceController);
router.use('/payment', paymentController);
router.use('/accident', accidentController)
router.use('/', homeController);
router.get('*', (req, res) => {
    res.status(404).json({message: 'Page not found!'});
})

module.exports = router;