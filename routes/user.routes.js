const express = require('express');
const router = express.Router();
const {
    getUser,
    createUser,
    updateUserScore
} = require('../controllers/user.controller');

// User routes
router.route('/')
    .post(createUser);

router.route('/:id')
    .get(getUser)

router.route('/score/:id')
    .put(updateUserScore)

module.exports = router;
