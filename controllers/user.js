/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const User = require('../models/user');
const {
  ERR_BAD_REQUEST,
  ERR_DEFAULT,
  ERR_NOT_FOUND,
} = require('../errors/errors');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(ERR_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res
          .status(ERR_NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_BAD_REQUEST).send({
          message: 'Пользователь не существует',
        });
      }
      if (err.message === 'NotFound') {
        return res.status(ERR_NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      }
      return res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT).send({ message: 'Что-то пошло не так' });
    });
};
