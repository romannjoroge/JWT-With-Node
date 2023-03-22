import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password ,email);
    res.send("POST Request Reached");
});

router.get('/', (req, res) => {
    res.send("Auth Working");
})

export default router;