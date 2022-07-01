const { Router } = require('express');
const { Secret } = require('../models/Secret');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const secret = await Secret.getAll();
    console.log('secrets', secret);
    res.json(secret);
  } catch (e) {
    next(e);
  }
});
