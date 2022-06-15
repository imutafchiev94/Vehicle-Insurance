const router = require('express').Router();
const homeService = require('../services/homeService');

router.get('/', async (req, res) => {
    try {
        let image = await homeService.getDashboardImage();
        res.json(image);
    } catch(err) {
        res.status(404).json(err);
    }
})

module.exports = router;