const express = require('express');
const router = express.Router();
const simpleUserController = require('../controllers/simpleUserController');

// Route to register a user
router.post('/register', simpleUserController.createSimpleUser);

module.exports = router;
