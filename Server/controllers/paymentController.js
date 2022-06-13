const router = require('express').Router();
const paymentService = require('../services/paymentService');

router.post('/all', async (req, res) => {
    try {
        let payments = await paymentService.allPaymentsForInsurance(req.body.registrationNumber);
        res.json(payments);
    } catch (err) {
        res.status(400).json({Error: err.message});
    }
});

router.post('/paid', async (req, res) => {
    try {
        let payments = await paymentService.allPaidPaymentsForInsurance(req.body.registrationNumber);
        res.json(payments);
    } catch (err) {
        res.status(400).json({Error: err.message});
    }
});

router.post('/unpaid', async (req, res) => {
    try {
        let payments = await paymentService.allUnpaidPaymentsForInsurance(req.body.registrationNumber);
        res.json(payments);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
});

router.post('/to-pay', async (req, res) => {
    try {
        let payment = await paymentService.firstPaymentToPayForInsurance(req.body.registrationNumber);
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