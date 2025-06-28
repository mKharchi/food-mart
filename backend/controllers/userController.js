import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ success: false, message: "All fields are mandatory" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};




const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body
    const user = await User.findOne({ email })


    if (!user) {
      return res.json({
        success: false,
        message: "No user available with this email."
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {

      return res.json({
        success: false,
        message: "Ivalid credentials."
      })
    } else {

      const token = createToken(user._id)

      return res.json({
        success: true,
        token
      })


    }

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({
        success: true, token
      })


    } else {
      res.json({
        success: false, message: "invalid credentials"
      })

    }
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })

  }
}

export { registerUser, loginUser , loginAdmin };