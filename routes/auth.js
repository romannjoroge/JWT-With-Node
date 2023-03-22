import express from 'express';
import { check, validationResult } from 'express-validator';
import users from '../db.js'
import bcrypt from 'bcrypt';

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
    
    // Check if user already exists
    let user = users.find((user) => {
        return user.username === username;
    });

    if(user) {
        return res.status(404).json({
            errors: [
                {
                    "value": username,
                    "msg": "User Already Exists",
                    "param": "username",
                    "location": "body"
                }
            ]
        })
    }

    bcrypt.hash(password, 10).then(data => {
        // Store New User
        console.log(data);
        users.push({
            username,
            email,
            password: data
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    })


    res.send("User Created");
});

router.get('/', (req, res) => {
    res.send("Auth Working");
})

export default router;