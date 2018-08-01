const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    const token = req.headers['token'] || req.body.token;

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    message: "token is invalid"
                })
            } else {
                req.tokenData = decoded;
                console.log(decoded);
                next();
            }
        })
    } else {
        return res.status(403).json({
            message: "please send a token"
        })
    }
}

module.exports.verifyToken = verify;