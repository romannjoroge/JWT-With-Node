import express from 'express';
import { check, validationResult } from 'express-validator';
import users from '../db.js'
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

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

    // Create and send JWT
    let token = JWT.sign({email}, 'thisismysecretdonttellanyone', {expiresIn:3600});

    return res.status(200).json({token});
});

router.get('/', (req, res) => {
    res.send("Auth Working");
})

export default router;