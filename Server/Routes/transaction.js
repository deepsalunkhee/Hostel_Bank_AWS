const express = require("express");
const { Group, User } = require("../db/schema");
const { models } = require("mongoose");
const router = express.Router();
const { verifyUser } = require("../Routes/auth");

//creating a money request

router.post("/request",verifyUser,async(req,res)=>{
    const{groupid,requestfrom,requestto,amount}=req.body;
    // console.log(req.body);

    try {
        
        const group = await Group.findById(groupid);
        // console.log(group);
        const from= group.users.findIndex((user)=>user.email==requestfrom);
        //console.log(from);
        const from_id=group.users[from].member_id;
        //console.log(from_id);
        const to=group.users.findIndex((user)=>user.email==requestto);
        const to_id=group.users[to].member_id;

        group.transction_matrix[from_id][to_id]=amount;

        const updatedgroup=await group.save();



        res.status(200).json({
            message: "Request sent successfully",
        });
        
    } catch (error) {
        console.log(error);
    }

})




module.exports = router;