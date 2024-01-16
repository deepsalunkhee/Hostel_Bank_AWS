//all the user realted routes are here
const express = require("express");
const router = express.Router();
const { User } = require("../db/schema");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const salt = bcrypt.genSaltSync(saltRounds);

// console.log(JWT_SECRET);
// console.log(saltRounds);

//data validation schema
const signupSchema = zod.object({
  name: zod.string().min(3).max(50),
  email: zod.string().email(),
  password: zod.string().min(6).max(50),
});

const signinSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6).max(50)
})

//signup route

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  //validate the data
  
    const validatedData = signupSchema.parse(req.body);
 

  //create new user
  if (validatedData) {
    const newUser = new User({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, salt),
    });

    //save the user
    try {
      const savedUser = await newUser.save();
      res.json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }else{
      res.status(400).json({error:"Invalid data"});
  }
});


//signin route

router.post("/signin",async(req,res)=>{

    const {email,password}=req.body;
    const validatedData=signinSchema.parse(req.body);
    if(validatedData){
        try {

            //check if the user exists
            const user=await User.findOne({email:email});
            if(!user){
                return res.status(400).json({error:"User does not exist"});
            }

            //check if the password is correct
            const isPasswordCorrect=bcrypt.compareSync(password,user.passwordHash);
            if(!isPasswordCorrect){
                return res.status(400).json({error:"Password is incorrect"});
            }

            //sign the token
            const token=jwt.sign({id:user._id},JWT_SECRET);
            res.json({token:token});
            
            
        } catch (error) {
            
        }
    }else{
        res.status(400).json({error:"Invalid data"});
    }


})

module.exports = router;
