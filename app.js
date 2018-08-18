require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/helloWorld', (req, res) => res.json('Coé Rapaziada!'));
app.use('/user', userRouter());
app.use('/auth', authRouter());

module.exports = app.listen(5000, () => console.log('Tá rodando'));

