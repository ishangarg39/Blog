const express = require("express");
const { signUpUser, getAllUsers, login } = require("../controllers/userControllers");
const router = express.Router();


router.get("/all-users", getAllUsers);
router.post("/signup", signUpUser);
router.post("/login", login)
// router.get('/api1',(req,res)=>{
//     res.status(200).send("get all contacts");
//  })
module.exports = router;