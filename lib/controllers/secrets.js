const { Router } = require('express');
const { Secret } = require('../models/Secret');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const secret = await Secret.getAll();
    res.json(secret);
  } catch (e) {
    next(e);
  }
});
