const express = require('express');

const {
  initUser,
  addImageToUser,
  getUserImages,
  deleteImage,
} = require('../controllers/userController');

const router = express.Router();

router.route('/user/create').post(initUser);

router.route('/user/images').post(addImageToUser);

router.route('/user/images/:id').get(getUserImages).delete(deleteImage);

module.exports = router;
