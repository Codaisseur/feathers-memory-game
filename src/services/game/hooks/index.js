'use strict';

const gameHost = require('./game-host');

const globalHooks = require('../../../hooks');
const auth = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks');

const populateHostedBy = hooks.populate('hostedBy', {
  service: 'users',
  field: 'userId'
});


exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [gameHost()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [populateHostedBy],
  get: [populateHostedBy],
  create: [populateHostedBy],
  update: [],
  patch: [],
  remove: []
};
