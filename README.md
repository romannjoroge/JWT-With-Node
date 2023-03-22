# JWT-With-Node
This is a repo that I use to store the code I use while learning about implementing jwt in node. The goal of this repo is to store code for implementing authorization, authentication and hashing in Express

# Definitions
**Authentication** - The process of confirming that the user is who they say they are e.g if the user attempts to log in as Joe authentication makes sure that the user is actually Joe. This can be done by checking if a provided password or fingerprint matches that stored in the system.
**Authorization** - The process of checking whether a user is allowed to access a certain resource. For example, for a school site authorization comes into play when making sure that only lecturers can change the marks of students or view exams before giving them. *This is done using user roles*.

# Sign Up Route
The following activities take place at sign up route: 
![Sign Up Activity Diagram](signupactivitydiagram.drawio.png)

## Getting Details From Client
To get information from the client we can extract them from the body of the request.
`javascript
router.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    res.send("POST Request Recieved")
})
`
