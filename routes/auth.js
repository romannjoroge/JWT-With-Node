import express from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post('/signup', 
            check('email', "Enter a Valid Email").isEmail(), 
            check('password', "Password Should Be Longer Than 8 Characters").isLength({min: 8}),
            (req, res) => {
    // Check if username and password are valid
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(404).json({erros: errors.array()});
    }
    const {username, password, email} = req.body;
    console.log(username, password ,email);
    res.send("POST Request Reached");
});

router.get('/', (req, res) => {
    res.send("Auth Working");
})

export default router;