const jwt = require('jsonwebtoken');


module.exports = {
    verifyAccessToken: (req,res, next) => {
        const token = req.token
        const key = process.env.JWT_KEY
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(401).send({message: 'user unauthorized'})
            }
            if (decoded.protect !== "protection"){
                return res.status(401).send({message: 'wrong data'})
            }
            next()
        })
    }
}