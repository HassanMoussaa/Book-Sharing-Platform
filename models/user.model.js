const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: String,
  last_name: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  liked_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
