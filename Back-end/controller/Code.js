const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const codeService = require('../service/CodeService');
const authentication = require('../service/AuthenticationService');
const SuccessResponse = require('../model/response/SuccessResponse');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Create a new code.
 *
 * @author Guilherme da Silva Martin
 */
router.post(
  '/code/:id',
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const newCode = await service.createCode(req.params.id, req.userId);

    res.status(201).json(new SuccessResponse(200, 'Success to create code!', newCode));
  })
);

/**
 * Delete a code by name.
 *
 * @author Guilherme da Silva Martin
 */
router.delete(
  '/code/:id',
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const deletedCode = await service.deleteCode(req.params.id, req.userId);

    res.status(200).json(new SuccessResponse(200, 'Success to delete code!', deletedCode));
  })
);

/**
 * Get code content folder by name.
 *
 * @author Guilherme da Silva Martin
 */
router.get(
  '/code/tree/:id',
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const codeFiles = await service.getCodeFileTree(req.params.id, req.userId);

    res.status(200).json(new SuccessResponse(200, 'Success to get folder content.', codeFiles));
  })
);

/**
 * Delete a code folder by name.
 *
 * @author Guilherme da Silva Martin
 */
router.delete(
  '/code/:id',
  authentication.verifyJWT,
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const deletedCode = await service.deleteCode(req.params.id, req.userId);

    res.status(200).json(new SuccessResponse(200, 'Success to delete code folder.', deletedCode));
  })
);

module.exports = router;
