import JWT from 'jsonwebtoken'

// We create a middle ware to check if user is authenticated
// If all is good we call the next function otherwise we return a res
export default (req, res, next) => {
    // Get token
    const token = req.header('x-auth-token');

    // Check if token exists
    if(!token) {
        return res.status(400).json({message:"Token Does Not Exist"});
    }

    // Check if token is valid
    try {
        let payload = JWT.verify(token, 'thisismysecretdonttellanyone');
        console.log(typeof payload);
        req.username = payload.username;
        req.authenticated = true;
        next();
    } catch(e) {
        // Return error if token is not valid
        return res.status(404).json({message: "Invalid Token"})
    }
}