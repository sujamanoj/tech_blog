const { Post } = require('../models');

const postdata =
[
  {
    "postTitle": "Need tech tips?",
    "postContent": "what ram clock speeds break the pc?",
    "userId": 1
  },
  {
    "postTitle": "What is a good movie to check out?",
    "postContent": "Dune seems like a good one.",
    "userId": 2
  },
  {
    "postTitle": "what headphones are good?",
    "postContent": "I want something withing a reasonable budget",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;