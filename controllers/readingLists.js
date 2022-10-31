const router = require("express").Router();

const { Blog, User, ReadingList } = require("../models");

const readingListFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.blogId);
  req.user = await User.findByPk(req.params.userId);
  next();
};

router.post("/", readingListFinder, async (req, res) => {
  try {
    const readingListEntry = await ReadingList.create({
      ...req.body,
    });
    res.json(readingListEntry);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
