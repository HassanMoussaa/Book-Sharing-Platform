const Post = require("../models/book.model")

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.send(posts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching posts.' });
  }
}
const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate("author");
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.send(post);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the post.' });
  }
}

const createPost = async (req, res) => {
  const { title, author, picture, review } = req.body;

  const post = new Post({
    title,
    author,
    picture,
    review
  })
  res.send(post)
   try {
    const savedBook = await post.save();
    res.send(post)
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while posting the book.' });
  }
}

const addComment = async (req, res) => {
  const { bookId } = req.params;
  const { author, content } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $push: { comments: { author, content } } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(201).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the comment.' });
  }
};

const likeBook = async (req, res) => {
  const { bookId } = req.params;
  const currentUser = req.user; 

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    book.liked_by.push(currentUser._id);
    await book.save();

    res.status(200).json({ message: 'Book liked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while liking the book.' });
  }
};


const unlikeBook = async (req, res) => {
  const { bookId } = req.params;
  const currentUser = req.user; 

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    book.liked_by = book.liked_by.filter(id => id.toString() !== currentUser._id.toString());
    await book.save();

    res.status(200).json({ message: 'Book unliked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while unliking the book.' });
  }
};

const getLikedBooks = async (req, res) => {
  const currentUser = req.user; 

  try {
    const likedBooks = await Book.find({ liked_by: currentUser._id }).populate("liked_by");
    res.status(200).json(likedBooks);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching liked books.' });
  }
};



const getFeed = async (req, res) => {
  const currentUser = req.user; 

  try {
    const followingIds = currentUser.following;
    const feed = await Post.find({ author: { $in: followingIds } }).populate("author");
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the feed.' });
  }
};

const getRecommendedBooks = async (req, res) => {
  const currentUser = req.user; 

  try {
    const followingIds = currentUser.following;
    const recommendedBooks = await Post.find({ author: { $in: followingIds } }).populate("author");
    res.status(200).json(recommendedBooks);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching recommended books.' });
  }
};

const searchBooks = async (req, res) => {
  const { genre, author, keywords } = req.query;

  try {
    const query = {};
    if (genre) {
      query.genre = genre;
    }
    if (author) {
      query.author = author;
    }
    if (keywords) {
      query.$text = { $search: keywords };
    }

    const searchResults = await Book.find(query);
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while searching for books.' });
  }
};




module.exports = {
  createPost,
  getAllPosts,
  getPost,
  addComment,
  likeBook,
  unlikeBook,
  getLikedBooks,
  getFeed,
  getRecommendedBooks
}