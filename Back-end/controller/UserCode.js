const express = require('express');
const router = express.Router();
const userCode = require('../service/UserCodeService');
const SuccessResponse = require('../model/response/SuccessResponse');
const authentication = require('../service/AuthenticationService');
const asyncMiddleware = require('../util/AsyncMiddleware');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Check by the user ID if they have permission to enter code.
 *
 * @author Guilherme da Silva Martin
 */
router.get(
  '/usercode/permission/:codename/:userid',
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    const userCodeService = await userCode.init();
    const userPermission = await userCodeService.verifyUserPermission(req.params.codename, req.params.userid);

    res
      .status(200)
      .json(new SuccessResponse(200, 'Information retrieved successfully!', { hasPermission: userPermission }));
  })
);
