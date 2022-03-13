const User = require("../../models/users")



module.exports = {
    getUser: async (req,res) => {
        try {
            const user = await User.find()
            // hasilnya array
            return res.status(200).send(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    createUser: async(req,res) => {
        const { id, userName, accountNumber, emailAddress, identityNumber } = req.body;
        // console.log("masuk create")
        const user = new User({
            id : id,
            userName : userName,
            accountNumber : accountNumber, 
            emailAddress : emailAddress, 
            identityNumber : identityNumber
        })
        try {
            const newUser = await user.save()
            // 201 means successfully created an object
            return res.status(201).send(newUser)
        } catch (error) {
            //400 means bad data, something wrong with users input
            res.status(400).json({message: error.message})
        }
    },
    getUserByAccount: async(req,res) => {
        try {
            const user = await User.findOne({accountNumber : req.params.id})
            if (user == null){
                return res.status(404).send({message: 'Cannot Find User Account Number'})
            }
            return res.status(200).send(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    getUserByIdentity: async(req,res) => {
        try {
            const user = await User.findOne({identityNumber : req.params.id})
            if (!user){
                throw {message: 'Cannot Find User Identity Number'}
            }
            return res.status(200).send(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    deleteUser : async (req, res) => {
        try {
            const dataUser = await User.deleteOne({id : req.params.id})
            if (dataUser.deletedCount === 0){
                throw {message: 'User Doesnt Exist!'}
            }
            return res.status(200).send("User Deleted")
        } catch (error) {
            console.log({message: error.message})
            res.status(500).json({message: error.message})
        }
    },
    updateUser : async (req,res) => {
        try {
            const updateAccount = {...req.body}
            for (var key in updateAccount) {
                if (updateAccount.hasOwnProperty(key)) {
                    //Now, updateAccount[key] is the current value
                    if (updateAccount[key] === undefined || updateAccount[key] === "")
                        delete updateAccount[key];
                }
            }
            // console.log(updateAccount)
            if(!Object.keys(updateAccount).length){
                throw {message: "No Updated Data"}
            }
            console.log(updateAccount)
            const dataUser = await User.updateOne({id : req.params.id}, {
                $set: {...updateAccount}
            })
            if(dataUser.modifiedCount === 0){
                throw {message: "No User"}
            }
            console.log(dataUser)
            return res.status(200).send(dataUser)
        } catch (error) {
            console.log({message: error.message})
            res.status(500).json({message: error.message})
        }
    }
}