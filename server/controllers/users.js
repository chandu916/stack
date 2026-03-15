import mongoose from "mongoose";
import User from '../models/auth.js';

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const allUserDetails = [];
    allUsers.forEach((users) => {
      allUserDetails.push({
        _id: users._id,
        name: users.name,
        about: users.about,
        tags: users.tags,
        joinedOn: users.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    console.error('getAllUsers failed:', error);
    res.status(500).json({ code: 500, message: error.message || 'Failed to fetch users' });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, email, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("user unavailable...");
  }

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  // Prevent duplicates when updating email
  const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
  if (existingUser && String(existingUser._id) !== String(_id)) {
    return res.status(409).json({ message: "Email is already in use." });
  }

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      _id,
      { $set: { name: name.trim(), email: email.trim().toLowerCase(), about: (about || '').trim(), tags } },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(409).json({ message: "Email is already in use." });
    }
    res.status(500).json({ message: error.message });
  }
};