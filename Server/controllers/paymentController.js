const router = require('express').Router();
const paymentService = require('../services/paymentService');

router.get('/:id/all', async (req, res) => {
    try {
        let payments = await paymentService.allPaymentsForInsurance(req.params.id);
        res.json(payments);
    } catch (err) {
        res.status(404).json({Error: err.message});
    }
});

router.get('/:id/to-pay', async (req, res) => {
    try {
        let payment = await paymentService.firstPaymentToPayForInsurance(req.params.id);
        res.json(payment);
    } catch (err) {
        res.status(404).json({Error: err.message});
    }
});

router.post('/:id/pay', async (req, res) => {
    try {
        let message = await paymentService.payPaymentForInsurance(req.params.id);
        res.json(message);
    } catch(err) {
        res.status(400).json({Error: err.message});
    }
})

module.exports = router; 