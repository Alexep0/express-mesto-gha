/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

const UnauthorizedErr = require('../errors/UnauthorizedErr');

module.exports.auth = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    token = req?.cookies?.jwt;
  } else if (token.split(' ')[0] === 'Bearer') {
    token = token.split(' ')[1];
  }

  if (!token) {
    return next(new UnauthorizedErr('Отказ в доступе'));
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedErr('Отказ в доступе'));
  }
  req.user = payload;
  return next();
};
