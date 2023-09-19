const User = require("../models/userModels")
const bcrypt = require("bcrypt");

//@desc get All Users
//@route GET /all-users
//@access public
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            msg: "all users data",
            users

        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            msg: "Error in getting users",
            error
        })
    }
    console.log("dsa")
};

//@desc login User
//@route POST /login
//@access public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation of user details
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                msg: "Please all details"
            })
        }

        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(401).send({
                success: false,
                msg: "User Not Registered"
            })
        }
        console.log(userFound)

        //password 
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                msg: "Invalid Username or Password"
            })
        }
        return res.status(200).send({
            success: true,
            msg: "login successful",
            userFound
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            msg: "Error in login callback",
            error
        })
    }

};

//@desc Register User
//@route POST /signup
//@access public

exports.signUpUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //User Details valid
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                msg: "Fill all Details"
            })
        }
        //Existing User
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                msg: "User already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        //Save new user
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save();
        return res.status(201).send({
            success: true,
            msg: "User Registerd Sucessfully",
            newUser
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "Error in User Sign Up callback",
            success: false,
            error
        })
    }
}

