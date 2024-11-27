const BaristaAuth = require("../model/baristasAuth"); // تحقق من المسار الصحيح
const Barista = require('../model/baristas');
const path = require('path');
const fs = require('fs');

exports.createProfile = async (req, res) => {
  try {
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { phone, bio, recommendations } = req.body;

    const newProfile = new BaristaAuth({
      baristaId: req.user,
      phone,
      bio,
      recommendations,
      profileImage: req.files["profileImage"]
        ? req.files["profileImage"][0].path
        : null,
      culinarySchool: req.files["culinarySchool"]
        ? req.files["culinarySchool"][0].path
        : null,
      portfolio: req.files["portfolio"] ? req.files["portfolio"][0].path : null,
    });

    const savedProfile = await newProfile.save();
    console.log("Saved profile:", savedProfile);
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: savedProfile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------


exports.getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const profile = await BaristaAuth.findOne({ baristaId: req.user })
      .populate("baristaId", "username email")
      .exec();
      
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: error.message });
  }
};
// --------------------------------------------

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { phone, bio } = req.body;
    const updatedProfile = await BaristaAuth.findOneAndUpdate(
      { baristaId: req.user },
      { phone, bio },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: error.message });
  }
};
// --------------------------------------------

exports.updateUsername = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { username } = req.body;
    const updatedBarista = await Barista.findByIdAndUpdate(
      req.user,
      { username },
      { new: true }
    );

    if (!updatedBarista) {
      return res.status(404).json({ error: "Barista not found" });
    }

    res.status(200).json({ username: updatedBarista.username });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: error.message });
  }
};
// --------------------------------------------
exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const profile = await BaristaAuth.findOne({ baristaId: req.user });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // حذف الصورة القديمة إذا كانت موجودة
    if (profile.profileImage) {
      const oldImagePath = path.join(__dirname, '..', profile.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    profile.profileImage = req.file.path;
    await profile.save();

    res.status(200).json({ 
      message: "Profile image updated successfully", 
      profileImage: profile.profileImage 
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: error.message });
  }
};
// --------------------------------------------
exports.getApplicationStatus = async (req, res) => {
  try {
      const baristaId = req.user; 

      const barista = await BaristaAuth.findOne({ baristaId: baristaId }).select("applicationStatus");

      if (!barista) {
          return res.status(404).json({ message: "Barista not found" });
      }

      res.json({ applicationStatus: barista.applicationStatus });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};
// exports.updateUsername = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { username } = req.body;
//     const updatedBarista = await Barista.findByIdAndUpdate(
//       req.user._id,
//       { username },
//       { new: true }
//     );

//     if (!updatedBarista) {
//       return res.status(404).json({ error: "Barista not found" });
//     }

//     res.status(200).json({ username: updatedBarista.username });
//   } catch (error) {
//     console.error("Error updating username:", error);
//     res.status(500).json({ error: error.message });
//   }
// };