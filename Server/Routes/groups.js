const express = require('express');
const { Group,User } = require('../db/schema');
const { models } = require('mongoose');
const router =express.Router();
const {verifyUser}=require('../Routes/auth')




//creating groups

router.post('/create',verifyUser,async (req,res)=>{
    const {Groupname,creater}=req.body;
    console.log(req.body);
    const newGroup=new Group({
        name:Groupname,
        users:[{email:creater}]
    })

    //saving the group
    try {
        //find the user and push the group id
        const user= await User.findOne({email:creater})
        const savedGroup= await newGroup.save()
        const updateduser=user.groups.push({
            group_id:savedGroup._id,
            group_name:savedGroup.name
        
        });
        const updated=await user.save()
        
        res.status(200).json({
            message:"Group created successfully",
            GroupCode:savedGroup._id
        });
    } catch (error) {
        res.status(400).json(error)
    }


})

//get the user's groups

router.get('/getgroups',verifyUser, async (req,res)=>{
        
})




module.exports=router
