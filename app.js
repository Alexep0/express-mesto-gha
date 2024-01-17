// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '65a820a9017906e20812b20f',
  };

  next();
});

app.listen(PORT, () => {

});
