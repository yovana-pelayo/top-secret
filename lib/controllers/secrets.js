const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Secret } = require('../models/Secret');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secret = await Secret.getAll();
    console.log('secrets', secret);
    res.json(secret);
  } catch (e) {
    next(e);
  }
});
