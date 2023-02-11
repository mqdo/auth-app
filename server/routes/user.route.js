const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.post('/', controller.createUser);

router.get('/:id', controller.getUserById);

router.put('/:id', controller.updateUserById);

// router.delete('/:id', controller.removeUserById);

module.exports = router;