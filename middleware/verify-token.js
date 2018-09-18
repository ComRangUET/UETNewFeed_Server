const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['token'];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "token is invalid"
                });
            } else {
                req.tokenData = decoded;
                next();
            }
        })
    } else {
        return res.status(403).json({
            message: "please send a token"
        })
    }
}

module.exports = {verifyToken};