import User from "../models/user.js";

// Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    console.log("login data aaya:",req.body);//
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    res.status(200).json({ 

      success: true, 
      message: "login successful", 
      userId: user._id // <-- Ye line add kar do
    });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error.message });
  }
};

