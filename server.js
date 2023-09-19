const express = require("express");
const mmorgan = require("morgan");
const colors = require("colors");
const connectdb = require("./config/db");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const cors = require("cors");
//const bodyParser=require("body-parser");
dotenv.config();//configure env

PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(mmorgan('dev'));

// app.use(bodyParser.json({extended:true}));
// app.use(bodyParser.urlencoded({extended:true}));
connectdb();

app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);
// app.get('/api',(req,res)=>{
//     res.status(200).send("get all contacts");
//  })
app.listen(PORT, () => { console.log(`server ${PORT}`) })