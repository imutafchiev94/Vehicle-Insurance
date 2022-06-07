const router = require('express').Router();
const vehicleService = require('../services/vehicleService');

router.post('/add', async (req, res) => {
    try {
        let message = await vehicleService.addVehicle(req.body);
        res.json(message);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
})

module.exports = router;