/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

const {
  ERR_UNAUTHORIZED,
} = require('../errors/errors');

module.exports.auth = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    token = req?.cookies?.jwt;
  } else if (token.split(' ')[0] === 'Bearer') {
    token = token.split(' ')[1];
  }

  if (!token) {
    return next(res.status(ERR_UNAUTHORIZED).send({ message: 'Отказ в доступе' }));
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(res.status(ERR_UNAUTHORIZED).send({ message: 'Отказ в доступе' }));
  }
  req.user = payload;
  return next();
};
