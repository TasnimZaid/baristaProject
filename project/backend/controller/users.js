const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../model/users");
const Barista = require("./../model/baristas");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      isDeleted: false,
      isActive: true,
    });
    if (!user) {
      return res
        .status(400)
        .json({
          message:
            "Invalid email or password, or account is inactive or deleted",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ message: "User logged in successfully!" });
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
};

// -----------------------------------------------------------------------
exports.loginBarista = async (req, res) => {
  try {
    const { email, password } = req.body;

    const barista = await Barista.findOne({
      email,
      isDeleted: false,
      isActive: true,
    });
    if (!barista) {
      return res
        .status(400)
        .json({
          message:
            "Invalid email or password, or account is inactive or deleted",
        });
    }

    const isMatch = await bcrypt.compare(password, barista.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: barista._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ message: "Barista logged in successfully!" });
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
};

// ---------------------------------------------------------------------
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.cookie("userId", newUser._id.toString(), {  // Ensure userId is a string
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    
    res
      .status(201)
      .json({ message: "User registered successfully (First Method)!" });
  } catch (error) {
    res
      .status(500)
      .send("Error registering user (First Method): " + error.message);
  }
};

// ---------------------------------------------------------------------
exports.registerBarista = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newBarista = new Barista({
      username,
      email,
      password: hashedPassword,
    });

    await newBarista.save();

    const token = jwt.sign({ id: newBarista._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(201).json({ message: "Barista registered successfully!" });
  } catch (error) {
    res.status(500).send("Error registering Barista: " + error.message);
  }
};
// ------------------------------google---------------------------------------
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.CLIENT_SECRET
);
exports.googleSignup = async (req, res) => {
  try {
    const { id_token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Failed to get payload from Google token");
    }

    const { email, name, picture } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        profilePicture: picture,
        googleId: payload.sub,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res
      .status(200)
      .json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Google signup error:", error);
    res.status(500).json({ message: "Error during Google signup" });
  }
};
// -----------------------------------------
exports.googleLogin = async (req, res) => {
  try {
    const { id_token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, username } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ username, email });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Google login failed", error });
  }
};