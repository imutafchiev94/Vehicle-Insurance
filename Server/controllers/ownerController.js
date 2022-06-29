const router = require('express').Router();
const ownerService = require('../services/OwnerService');

router.post('/add', async (req, res) => {
    try {
        let message = await ownerService.addOwner(req.body); 
        res.json(message);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});

router.post('/find', async (req, res) => {
    try {
        let owner = await ownerService.findOwner(req.body.EGN); 
        
        res.json(owner);
    } catch(err) {
        
        res.status(404).json({Error: err.message});
    }
});

router.get ('/:id', async (req, res) => {
    try {
        let owner = await ownerService.findOwnerById(req.params.id);
        res.json(owner);
    } catch (err) {
        res.status(404).json({Error: err.message});
    }
})

router.post('/is-exists', async (req, res) => {
    try {
        let isExists = await ownerService.isExists(req.body.EGN); 
        
        res.json(isExists);
    } catch(err) {
        
        res.status(404).json({Error: err.message});
    }
});

module.exports = router;