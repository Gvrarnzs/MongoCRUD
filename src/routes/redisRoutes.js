const express = require("express")
const router = express.Router()
const {redisControllers} = require("../controllers")
const {getUser, createUser, getUserByAccount, getUserByIdentity, deleteUser, updateUser} = redisControllers
const {verifyAccessToken} = require("../helpers/verifyToken")

router.use(verifyAccessToken)


router.get("/userlist", getUser)
router.get("/byaccnumber/:id", getUserByAccount)
router.get("/byidentity/:id",getUserByIdentity)
router.post("/createuser", createUser)
router.delete("/delete/:id",deleteUser)
router.patch("/update/:id",updateUser)

module.exports = router