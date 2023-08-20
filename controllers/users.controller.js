// const connection = require("../configs/db.connection")
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

const getAllUsers = async (req, res) => {
  try {
    const currentUser = req.user; 

    const users = await User.find({ _id: { $ne: currentUser._id } });

    
    const usersWithFollowStatus = users.map(user => {
      const isFollowed = currentUser.following.includes(user._id);
      return { ...user.toObject(), is_followed: isFollowed };
    });

    return res.status(200).json(usersWithFollowStatus);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching users.' });
  }
};


const getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)


  const user = await User.findById(id).select("-password")
  res.send(user)
}

const createUser = async (req, res) => {
  const { password, first_name, last_name, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

   if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: 'All fields are required.' });
   }
   
    if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
    if (password.length < 3) {
    return res.status(400).json({ message: 'Password must be at least 4 characters.' });
  }

    const user = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully!',
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the user.' });
  }
};



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
    console.log(currentUser)
    await currentUser.save();

    res.status(200).json({ message: 'User followed successfully.' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'An error occurred while following the user.' });
  }
};

const unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user;

  try {
   
    const index = currentUser.following.indexOf(userId);
    
    
    if (index !== -1) {
      currentUser.following.splice(index, 1);
      await currentUser.save();
      return res.status(200).json({ message: 'User unfollowed successfully.' });
    } else {
      return res.status(404).json({ message: 'User not found in the following list.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while unfollowing the user.' });
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