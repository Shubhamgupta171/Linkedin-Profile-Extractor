const express = require('express');
const { Sequelize } = require('sequelize');
const Profile = require('./models/profile');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/profiles', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
