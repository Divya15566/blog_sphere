const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Blog = require('../models/Blog');
const { check, validationResult } = require('express-validator');

// @route   GET api/blogs
// @desc    Get all blogs with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit)
      .populate('author', 'email')
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      blogs,
      currentPage: page,
      totalPages,
      totalBlogs: total
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blogs/:id
// @desc    Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'email');
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/blogs
// @desc    Create a blog
router.post('/', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/blogs/:id
// @desc    Update a blog
router.put('/:id', auth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Check user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: { title: req.body.title, content: req.body.content } },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/blogs/:id
// @desc    Delete a blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: 'Blog not found' 
      });
    }

    // Check user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Unauthorized to delete this blog' 
      });
    }

    await Blog.deleteOne({ _id: req.params.id }); // Updated deletion method
    res.json({ 
      success: true,
      message: 'Blog deleted successfully' 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;