import Post from "../model/Post.js";
import User from "../model/User.js";

export const createPost = async (req, res) => {
  try {
    const { title, text, pictures, tags } = req.body;

    if (!title || !text || !tags) {
      return res.status(400).json({ message: "Not all fields are filled" });
    }

    const authorId = req.user ? req.user.id : req.body.authorId;

    if (!authorId) {
      return res.status(400).json({ message: "Author ID is required" });
    }

    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = new Post({
      text,
      title,
      pictures,
      tags,
      author: authorId,
    });

    await post.save();

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name email avatar"
    );

    res.status(201).json({
      post: populatedPost,
      message: "Post created",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

export const getPosts = async (req, res) => {};

export const getOnePost = async (req, res) => {};

export const updatePost = async (req, res) => {};

export const deletePost = async (req, res) => {};
