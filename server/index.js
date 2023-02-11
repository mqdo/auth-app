const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/database').connect();

const userRouter = require('./routes/user.route');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const app = express();

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.listen(port, () => {
  console.log('listening on port ' + port);
})