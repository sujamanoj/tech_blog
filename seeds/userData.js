const { User } = require('../models');

const userdata =
[
  {
    "username": "Randy",
    "password": "password"
  },
  {
    "username": "Jeff",
    "password": "password"
  },
  {
    "username": "Akira",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;

