import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({Message: 'Unauthorized'});
    }
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(401).json({Message: 'Unauthorized'});
        }

        req.user = user;
        next();
    });
};