
const User = require("../model/users");
const mongoose = require("mongoose");

exports.getUsers = async (req, res) => {
  try {
    const { search, isActive, page = 1, limit = 7 } = req.query;
    const query = { isDeleted: false };

    if (search) {
      query.$or = [
        { username: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Find users with pagination
    const users = await User.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select("-password -confirmPassword");

    // Count total number of users matching the query for pagination
    const totalUsers = await User.countDocuments(query);

    res.json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting user" });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error toggling user status" });
  }
};