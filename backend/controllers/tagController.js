const Tag = require('../models/Tag');

exports.getTags = async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
};

exports.createTag = async (req, res) => {
  const { name, color } = req.body;
  const tag = await Tag.create({ name, color });
  res.json(tag);
};
