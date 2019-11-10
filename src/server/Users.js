const express = require('express');
const router = express.Router();
const user = require('../service/UserService');

router.get('/users/:id', async (req, res) => {
    let userService = await user.init();

    res.send(await userService.getUserById(req.params.id));
});

module.exports = router;
