const express = require('express');
const { Group,User } = require('../db/schema');
const { models } = require('mongoose');
const router =express.Router();


//creating groups

router.post('/create', async (req,res)=>{
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
        
        res.status(200).json("Group Created");
    } catch (error) {
        res.status(400).json(error)
    }


})




module.exports=router
