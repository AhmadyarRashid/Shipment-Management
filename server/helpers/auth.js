const jwt = require('express-jwt');
const { getFailureResponse, getSuccessResponse } = require('./response');
const user = require('../models/user');

// get token from header
const getTokenFromHeaders = (req) => {
  const auth = req.get('Authorization');

  if (auth && auth.split(' ')[0] == 'Token') {
    return auth.split(' ')[1];
  }
  return null;
};

// check that request is generated from worker or not
const authenticateWorker = (req, res, next) => {
  const tokenH = getTokenFromHeaders(req);
  if (tokenH == null) {
    res.status(404).json(getFailureResponse('worker authentication failed'));
  } else {
    user.findOne({ role: 'worker', token: { $eq: tokenH } })
      .then(doc => {
        if (doc) {
          next();
        } else {
          res.status(404).json(getFailureResponse('worker authentication failed'));
        }
      })
  }
}

// check that request is generated from admin or not
const authenticateAdmin = (req, res, next) => {
  const tokenH = getTokenFromHeaders(req);
  if (tokenH == null) {
    res.status(404).json(getFailureResponse('admin authentication failed'));
  } else {
    user.findOne({ role: 'admin', token: { $eq: tokenH } })
      .then(doc => {
        if (doc) {
          next();
        } else {
          res.status(404).json(getFailureResponse('admin authentication failed'));
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
