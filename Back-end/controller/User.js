const express = require('express');
const router = express.Router();
const user = require('../service/UserService');
const SuccessResponse = require('../model/response/SuccessResponse');
const authentication = require('../service/AuthenticationService');
const asyncMiddleware = require('../util/AsyncMiddleware');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Login a user by email and password
 *
 * @author Guilherme da Silva Martin
 */
router.post(
  '/users/login',
  asyncMiddleware(async (req, res, next) => {
    let authenticationService = await authentication.init();
    let token = await authenticationService.authenticateUser(req.body.Email, req.body.Password);

    res.status(200).json(new SuccessResponse(200, 'Success to generate token!', { token: token }));
  })
);

/**
 * Returns a user by their id.
 *
 * @author Guilherme da Silva Martin
 */
router.get(
  '/users/:id',
  asyncMiddleware(async (req, res) => {
    let userService = await user.init();

    res.send(await userService.getUserById(req.params.id));
  })
);

/**
 * Create a new user.
 *
 * @author Guilherme da Silva Martin
 */
router.post(
  '/users/',
  asyncMiddleware(async (req, res) => {
    let userService = await user.init();

    res.send(await userService.createNewUser(req.body.Email, req.body.Name, req.body.Image, req.body.Password));
  })
);

/**
 * Delete a user by id.
 *
 * @author Guilherme da Silva Martin
 */
router.delete(
  '/users/:id',
  asyncMiddleware(async (req, res) => {
    let userService = await user.init();

    res.send(await userService.deleteUser(req.params.id));
  })
);

/**
 * Update a user.
 *
 * @author Guilherme da Silva Martin
 */
router.put(
  '/users/:id',
  asyncMiddleware(async (req, res) => {
    let userService = await user.init();

    res.send(
      await userService.updateUser(req.params.id, req.body.Name, req.body.Email, req.body.Password, req.body.Image)
    );
  })
);

module.exports = router;
