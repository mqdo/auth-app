const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();
require('./config/database').connect();

const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');

const { API_PORT, SECRET_KEY } = process.env;
const port = process.env.PORT || API_PORT;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

// Use Passport's strategies
require('./auth/local');

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/user', userRouter);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
