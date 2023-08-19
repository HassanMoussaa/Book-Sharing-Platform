// const connection = require("../configs/db.connection")
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

const getAllUsers = async (req, res) => {

  const users = await User.find();
  res.send(users)
}

const getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)


  const user = await User.findById(id).select("-password")
  res.send(user)
}

const createUser = async (req, res) => {
  const { password, first_name, last_name, email } = req.body

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    first_name,
    last_name
  })
  await user.save();

  res.send(user)

}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  if (last_name !== "") dataToUpade.last_name = last_name
  const user = await User.findByIdAndUpdate(id, {
    $set: { first_name, last_name },

  }, {
    new: true
  })

  res.send(user)
}

const deleteUser = (req, res) => {
  res.send("delete user")
}





//part for follow and unfollow users 

const followUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user; 

  try {
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found.' });
    }

    currentUser.following.push(userId);
    await currentUser.save();

    res.status(200).json({ message: 'User followed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while following the user.' });
  }
};

const unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user; 

  try {
    currentUser.following = currentUser.following.filter(id => id !== userId);
    await currentUser.save();

    res.status(200).json({ message: 'User unfollowed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while unfollowing the user.' });
  }
};










module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser
}