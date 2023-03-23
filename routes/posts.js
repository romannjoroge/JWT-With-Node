import express from 'express'
import { privateData, publicData } from '../db.js';
import checkifAuth from '../middleware/checkifAuth.js';
import checkifAuthorized from '../middleware/checkifAuthorized.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Posts route works");
})

// A route that can be accesed by anyone
router.get('/public', (req, res) => {
    res.status(200).json(publicData);
})

router.get('/private', checkifAuth, checkifAuthorized("cool"), (req, res) => {
    console.log(`${req.username} can use site`);
    res.status(200).json(privateData);
})

export default router;