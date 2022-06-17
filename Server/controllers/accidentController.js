const router = require('express').Router();
const accidentService = require('../services/accidentService');

router.post('/add', async (req, res) => {
    try {
        let message = await accidentService.addAccident(req.body);
        res.json(message);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
})

router.get('/', async (req, res) => {
    try {
        let accidents = await accidentService.getAllAccidents();
        res.json(accidents);
    } catch(err) {
        res.status(404).json({Error: err.message});
    }
})

router.get('/:id', async (req, res) => {
    try {
        let accident = await accidentService.getAccident(req.params.id);
        res.json(accident);
    } catch(err) {
        res.status(404).json({Error: err.message});
    }
})

router.post('/find', async (req, res) => {
    try {
        
        let accident = await accidentService.findAccident(req.body.vehicleRegistrationNumber);
        res.json(accident);
    } catch(err) {
        res.status(404).json({Error: err.message});
    }
})

module.exports = router;