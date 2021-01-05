const { Router } = require('express');
const router = Router();

const { getUsers, deleteUser, createUser, updateUsername } = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .delete(deleteUser)
    .put(updateUsername);

module.exports = router;