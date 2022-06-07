const router = require('express').Router();
const paymentService = require('../services/paymentService');

router.get('/all', async (req, res) => {
    try {
        let payments = await paymentService.allPaymentsForInsurance(req.body.EGN);
        res.json(payments);
    } catch (err) {
        res.status(400).json({Error: err.message});
    }
});

router.get('/paid', async (req, res) => {
    try {
        let payments = await paymentService.allPaidPaymentsForInsurance(req.body.EGN);
        res.json(payments);
    } catch (err) {
        res.status(400).json({Error: err.message});
    }
});

router.get('/unpaid', async (req, res) => {
    try {
        let payments = await paymentService.allUnpaidPaymentsForInsurance(req.body.EGN);
        res.json(payments);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
});

router.get('/to-pay', async (req, res) => {
    try {
        let payment = await paymentService.firstPaymentToPayForInsurance(req.body.EGN);
        res.json(payment);
    } catch (err) {
        res.status(400).json({Error: err.message});
    }
});

router.post('/pay/:id', async (req, res) => {
    try {
        let message = await paymentService.payPaymentForInsurance(req.params.id);
        res.json(message);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
})

module.exports = router; 