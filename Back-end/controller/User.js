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
    const authenticationService = await authentication.init();
    const token = await authenticationService.authenticateUser(req.body.Email, req.body.Password);

    res.cookie('access_token', token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: true });
    res.status(200).json(new SuccessResponse(200, 'Login success!', null));
    next();
  })
);

/**
 * Logout a user.
 *
 * @author Matheus Muriel
 */
router.delete(
  '/users/logout',
  asyncMiddleware(async (req, res) => {
    res.cookie('access_token', {expires: Date.now()});
    res.clearCookie('access_token');
    res.status(200).json(new SuccessResponse(200, 'Logout success!', null));
  })
);

/**
 * TESTE, print de cookies
 */
router.get(
  '/users/status',
  asyncMiddleware(async (req, res, next) => {
    console.log(req.cookies)
    // res.cookie('access_token', {expires: Date.now()});
    // res.status(200).json(new SuccessResponse(200, 'Logout success!', null));
    next();
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
    const userService = await user.init();
    const userResponse = await userService.getUserById(req.params.id);

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
    const userService = await user.init();
    const newUser = await userService.createNewUser(req.body.Email, req.body.Name, req.body.Image, req.body.Password);

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
    const userService = await user.init();
    const deletedUser = await userService.deleteUser(req.params.id);

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
    const userService = await user.init();
    const updatedUser = await userService.updateUser(
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
