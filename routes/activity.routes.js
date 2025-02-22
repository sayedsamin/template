const express = require('express');
const router = express.Router();
const {
    // getAllUsers,
    getActivity,
    // createUser,
    // updateUser,
    // deleteUser
} = require('../controllers/activity.controller');

// Activity routes
// router.route('/')
//     .get(getAllUsers);
// .post(createUser);

router.route('/:id')
    .get(getActivity);
// .put(updateUser)
// .delete(deleteUser);

module.exports = router;
