const router = require('express').Router();
const insuranceService = require('../services/insuranceService');

router.post('/create', async (req, res) => {
    try {
        let message = await insuranceService.createInsurance(req.body);
        res.json(message);
    } catch(err) {
        res.status(400).json({Error: err.message})
    }
});

router.get('/find', async (req, res) => {
    try {
        let insurance = await insuranceService.findInsurance(req.body.EGN);
        res.json(insurance);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
})


module.exports = router;