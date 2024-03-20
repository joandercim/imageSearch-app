const Joi = require('joi');
const fs = require('fs').promises;

const { userSchema } = require('../schemas/UserSchema');
const { saveImgSchema } = require('../schemas/SaveImgSchema');
const { getUsers } = require('../services.js/userServices');

exports.initUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ success: false, error: error.details });
  }

  const { users } = await getUsers(req.body);

  const isUser = users.some((user) => user.userId === req.body.userId);

  if (isUser) {
    return res.status(200).json({ success: true, msg: 'User already in db.' });
  }

  users.push(req.body);

  await fs.writeFile(
    './db/users.json',
    JSON.stringify({ users: users }, null, 2)
  );

  res.status(201).json({ success: true, data: req.body });
};

exports.addImageToUser = async (req, res, next) => {
  const { error } = saveImgSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ success: false, error: error.details });
  }

  const { users } = await getUsers();
  const myUser = users.find(u => u.userId === req.body.userId);
  const favImgs = myUser.userDetails.favoriteImages;
  favImgs.push((req.body.image))

  await fs.writeFile('./db/users.json', JSON.stringify({ users }, null, 2));
  res.status(201).json({ success: true, data: myUser.userDetails.favoriteImages });
};

exports.getUserImages = async (req, res, next) => {
  try {
    const { users } = await getUsers();
    const currUser = users.find(u => u.userId === req.params.id)
    res.status(200).json({ success: true, images: currUser.userDetails.favoriteImages });
    
  } catch (error) {
    console.error('Error fetching user images', error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { users } = await getUsers();

    const currUser = users.find(u => u.userId === req.query.user)

    const favoriteImages = currUser.userDetails.favoriteImages
    const newFavoriteImages = favoriteImages.filter(image => image.id !== req.params.id)

    currUser.userDetails.favoriteImages = newFavoriteImages;

    await fs.writeFile('./db/users.json', JSON.stringify({ users }, null, 2));

  res.status(200).json({success: true, data: {}})
  } catch (error) {
    console.error(error)
  }
}
