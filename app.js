/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERR_NOT_FOUND } = require('./errors/errors');

mongoose.connect('mongodb://127.0.0.1/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '65a820a9017906e20812b20f',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(ERR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
