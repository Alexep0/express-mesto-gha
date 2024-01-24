/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERR_NOT_FOUND } = require('./errors/errors');
const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');

const errorHandler = require('./middlewares/error');

mongoose.connect('mongodb://127.0.0.1/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(ERR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
