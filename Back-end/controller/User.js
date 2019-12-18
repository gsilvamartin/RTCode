const express = require('express');
const router = express.Router();
const user = require('../service/UserService');
const SuccessResponse = require('../model/response/SuccessResponse');
const authentication = require('../service/AuthenticationService');
const asyncMiddleware = require('../util/AsyncMiddleware');
const bodyParser = require('body-parser');
const fs = require('../service/FileService');

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
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    let userService = await user.init();
    let userResponse = await userService.getUserById(req.params.id);

    res.status(200).json(new SuccessResponse(200, 'Success to return user.', userResponse));
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
    let newUser = await userService.createNewUser(req.body.Email, req.body.Name, req.body.Image, req.body.Password);

    res.status(200).json(new SuccessResponse(201, 'Success to create user.', newUser));
  })
);

/**
 * Delete a user by id.
 *
 * @author Guilherme da Silva Martin
 */
router.delete(
  '/users/:id',
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    let userService = await user.init();
    let deletedUser = await userService.deleteUser(req.params.id);

    res.status(200).json(new SuccessResponse(200, 'Success to delete user.', deletedUser));
  })
);

/**
 * Update a user.
 *
 * @author Guilherme da Silva Martin
 */
router.put(
  '/users/:id',
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    let userService = await user.init();
    let updatedUser = await userService.updateUser(
      req.params.id,
      req.body.Name,
      req.body.Email,
      req.body.Password,
      req.body.Image
    );

    res.status(200).json(new SuccessResponse(200, 'Success to update user.', updatedUser));
  })
);

module.exports = router;
