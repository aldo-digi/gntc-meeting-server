const User = require('../Models/User');

const bcrypt = require('bcrypt');

const signUp = async (req,res) => {
    const {email, password, role} = req.body;
    const newUser = new  User({email, password, role});
    newUser.save().then((data)=> {
        res.json(data)
    }).catch((error)=>res.status(400).json('Error: '+error));
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.status(200).json({ message: 'Signin successful', user: user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Error occurred, send server error (500) response
    }
}



module.exports = {signin, signUp};