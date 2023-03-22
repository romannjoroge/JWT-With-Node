# JWT-With-Node
This is a repo that I use to store the code I use while learning about implementing jwt in node. The goal of this repo is to store code for implementing authorization, authentication and hashing in Express

# Definitions
**Authentication** - The process of confirming that the user is who they say they are e.g if the user attempts to log in as Joe authentication makes sure that the user is actually Joe. This can be done by checking if a provided password or fingerprint matches that stored in the system.

**Authorization** - The process of checking whether a user is allowed to access a certain resource. For example, for a school site authorization comes into play when making sure that only lecturers can change the marks of students or view exams before giving them. *This is done using user roles*.

# Sign Up Flow
The following activities take place at sign up route: 
![Sign Up Activity Diagram](signupactivitydiagram.drawio.png)

## Getting Details From Client
To get information from the client we can extract them from the body of the request.
```javascript
router.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    res.send("POST Request Recieved")
})
```

## Email and Password Validation
Simple validation can be carried out using the ===express-validator== package. It gives you middleware functions that you can add to your routes to perform validation. For example, to check if password is at least 8 characters long and that email is written nicely:
```javascript
import {body, validateResult} from 'express-validator'
/// Setting up router
router.post('/signup',
            // Check if req.body.email is a valid email and return error message if not
            body('email', 'Error Message').isEmail(),
            // Check if req.body.password has a minimum length of 8
            body('password', 'Password Should Be Greater Than 8 Characters').isLength({min:8}),
            (req, res) => {
                // Do stuff in route body
            }
);
```

## Check if user exists
You make a request to the database to see if the user already exists. If the user exists an error is thrown. It's good practice to make the error thrown consistent to the errors thrown by express-validator.

## Password Hashing
There are multiple ways to store passwords in a database:
1. **Store the password as plain text**. The issue with this is that if anyone get's access to your database they are able to see all the passwords used by your users.
2. **Encrypt the stored password with a key**. This is better than the previous method but if a hacker were to get the key used to encrypt the system they would basically have access to all passwords in the system
3. **Use a function to hash password**. This is an improvement. The function will allow you to hash the password and to take the hashed password and convert it to plain text. This can be bruteforced though where a hacker can hash a known password and check if the password is in the database.
4. **Use a one way hash**. You cannot get the plain text password from the stored hash
5. **Add salt to password and perform one way hash**. Prepend a postpend a random sequence of strings to the password before hashing it and storing in the system.

To use *Method 5* we use a package called ==bcrypt==. bcrypt allows you to add salt to a password and to hash it.
```javascript
import bcrypt from 'bcrypt'
bcrypt.hash(password, salt) // salt is the number of random letters to add to password before hashing. Recommended value is 10
```

## Storing Details
The hashed password, and the rest of the details are stored in the database

## Sending The JWT
The JWT is the only way for our server to know that the client is who they say they are. It allows the client to log in once and while the token hasn't expired continue to use resources from the server with the server still being sure that the client is who they say they are.