const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')

// generate token unprotected
router.get('/token', (req, res) => {
    const key = process.env.JWT_KEY
    const token = jwt.sign({protect : "protection"}, key, { expiresIn: "12h" })
    res.status(200).send(token)
})

module.exports = router