const router = require('express').Router();
const vehicleService = require('../services/vehicleService');

router.post('/add', async (req, res) => {
    try {
        let message = await vehicleService.addVehicle(req.body);
        res.json(message);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
});

router.post('/find-by-owner', async (req, res) => {
    try {
        let vehicles = await vehicleService.findAllVehiclesOfOwner(req.body.EGN);
        res.json(vehicles);
    } catch(err) {
        res.status(404).json({Error: err.message});
    }
});

router.post('/find', async (req, res) => {
    try {
        let vehicle = await vehicleService.findVehicle(req.body.registrationNumber);
        res.json(vehicle);
    } catch(err) {
        res.status(404).json({Error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        let vehicle = await vehicleService.getVehicle(req.params.id);
        res.json(vehicle);
    } catch(err) {
        res.status(404).json({Error: err.message})
    }
})

module.exports = router;