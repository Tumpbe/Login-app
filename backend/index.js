const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require("helmet");

dotenv.config();

const db = require('./db');
const UserRouter = require('./routes/user-router');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
/*
Helmet features used:
  contentSecurityPolicy
  crossOriginEmbedderPolicy
  crossOriginOpenerPolicy
  crossOriginResourcePolicy
  dnsPrefetchControl
  expectCt
  frameguard
  hidePoweredBy
  hsts
  ieNoOpen
  noSniff
  originAgentCluster
  permittedCrossDomainPolicies
  referrerPolicy
  xssFilter 
*/
app.use(helmet());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', UserRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
