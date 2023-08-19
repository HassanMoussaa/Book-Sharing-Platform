const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).send({ message: "Email and Password are required" })

  try {
  const user = await User.findOne({email}).lean()
  
  if (!user){
    return res.status(401).send({ message: "Email not found" })
  }

 const isValid = await bcrypt.compare(password, user.password);
 if (!isValid) return res.status(401).send({ message: "Email and Password are required" })
 const { password: hashedPassword, ...userInfo } = user

const token =  jwt.sign(userInfo, process.env.SECRET_KEY)
    return res.send({
      token,
      user: userInfo
    }) 
  
}catch(err){
  console.err
}

}

module.exports = { login }