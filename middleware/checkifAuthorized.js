import { users } from "../db.js";

export default (role) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if(! req.authenticated) {
            // Return an error
            return res.status(400).json({message:"Not Authorized 1"})
        }
        
        // Check if user has the required role provided
        let user = users.find((user) => {
            console.log(role);
            return user.role === role;
        })
    
        // If user has the role they are authorized
        if(user) {
            req.authorized = true;
            next();
        } else {
            return res.status(400).json({message: "Not Authorized 2"});
        }
    }
}