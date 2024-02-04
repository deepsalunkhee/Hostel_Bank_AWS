const express = require("express");
const { Group, User } = require("../db/schema");
const { models } = require("mongoose");
const router = express.Router();
const { verifyUser } = require("../Routes/auth");

//creating groups

router.post("/create", verifyUser, async (req, res) => {
  const { Groupname, creater } = req.body;
  console.log(req.body);
  const newGroup = new Group({
    name: Groupname,
    users: [{ email: creater }],
  });

  //saving the group
  try {
    //find the user and push the group id
    const user = await User.findOne({ email: creater });
    const savedGroup = await newGroup.save();
    const updateduser = user.groups.push({
      group_id: savedGroup._id,
      group_name: savedGroup.name,
    });
    const updated = await user.save();

    res.status(200).json({
      message: "Group created successfully",
      GroupCode: savedGroup._id,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//get the user's groups

router.post("/getgroups", verifyUser, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const groups = user.groups;

    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

//join group

router.post("/joingroup", verifyUser, async (req, res) => {
  const { groupid } = req.body;
  try {
    const group = await Group.findById(groupid);
    if (group == null) {
      res.status(207).json({ message: "Group not found" });
      console.log("Group not found");
    }

    const user = await User.findOne({ email: req.user });

    const userUpdates= user.groups.push({
      group_id: group._id,
      group_name: group.name,
    })

    const groupUpdates = group.users.push({
      email:req.user
    })

    //saving the updates
    const updatedUser = await user.save();
    const updatedGroup = await group.save();

    res.status(200).json({ message: "Group joined successfully",groupname:group.name });
    



  } catch (error) {

    res.status(400).json({ message: "Something went wrong on server" });
  }
});

module.exports = router;
