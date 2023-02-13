const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();
require('./config/database').connect();

const controller = require('./controllers/auth.controller');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');

const { API_PORT, SECRET_KEY } = process.env;
const port = process.env.PORT || API_PORT;

const app = express();

app.use(passport.initialize());

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// Use Passport's strategies
require('./auth/local');
require('./auth/google');
require('./auth/facebook');
require('./auth/github');

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/user', controller.isAuthenticated, userRouter);

app.use('/auth', authRouter);

app.get('/', controller.isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.name || 'user-' + req.user._id}`);
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
