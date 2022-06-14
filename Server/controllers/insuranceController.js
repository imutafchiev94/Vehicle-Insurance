const router = require('express').Router();
const insuranceService = require('../services/insuranceService');

router.post('/create', async (req, res) => {
    try {
        let message = await insuranceService.createInsurance(req.body);
        res.json(message);
    } catch(err) {
        console.log(err);
        res.status(400).json({Error: err.message})
    }
});

router.post('/find', async (req, res) => {
    try {
        let insurance = await insuranceService.findInsurance(req.body.registrationNumber);
        res.json(insurance);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
})

router.get('/:id', async (req, res) => {
    try {
        let insurance = await insuranceService.getInsurance(req.params.id);
        res.json(insurance);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
})


module.exports = router;