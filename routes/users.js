/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getMe,
} = require('../controllers/user');

router.get('/users/me', getMe);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
