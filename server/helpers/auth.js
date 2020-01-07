const jwt = require('express-jwt');
const { getFailureResponse, getSuccessResponse } = require('./response');
const user = require('../models/user');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  console.log('---- get header ---' , headers , authorization);

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const authenticateWorker = (req, res, next) => {
  const tokenH = getTokenFromHeaders(req);
  if (tokenH == null) {
    res.status(404).json(getFailureResponse('authentication failed'));
  } else {
    user.findOne({ role: 'worker', token: { $eq: tokenH } })
      .then(doc => {
        if (doc) {
          next();
        } else {
          res.status(404).json(getFailureResponse('authentication failed'));
        }
      })
  }
}

const authenticateAdmin = (req, res, next) => {
  
  const tokenH = getTokenFromHeaders(req);
  console.log('----- authentication ----' , tokenH);
  if (tokenH == null) {
    res.status(404).json(getFailureResponse('authentication failed'));
  } else {
    user.findOne({ role: 'admin', token: { $eq: tokenH } })
      .then(doc => {
        if (doc) {
          next();
        } else {
          res.status(404).json(getFailureResponse('authentication failed'));
        }
      })
  }
}

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = { auth, authenticateWorker, authenticateAdmin };