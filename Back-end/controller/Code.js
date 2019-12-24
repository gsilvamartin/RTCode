const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const codeService = require('../service/CodeService');
const authentication = require('../service/AuthenticationService');
const SuccessResponse = require('../model/response/SuccessResponse');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Get code file content.
 *
 * @author Guilherme da Silva Martin
 */
router.get(
  '/code/file/:id/:file',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const file = await service.getFileContent(req.params.id, req.params.file, req.userId);

    res.status(200).json(new SuccessResponse(200, 'Success to get file content', { fileContent: file }));
  })
);

/**
 * Create a new code.
 *
 * @author Guilherme da Silva Martin
 */
router.post(
  '/code/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    console.log(req.userId);
    const service = await codeService.init();
    const newCode = await service.createCode(req.params.id, req.userId);

    res.status(201).json(new SuccessResponse(200, 'Success to create code!', newCode));
  })
);

/**
 * Create a new code file.
 *
 * @author Guilherme da Silva Martin
 */
router.post(
  '/code/file/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    console.log(req.userId);
    const service = await codeService.init();
    const newCode = await service.createNewCodeFile(req.params.id, req.body.FileName, req.userId);

    res.status(201).json(new SuccessResponse(201, 'Success to create code file!', newCode));
  })
);

/**
 * Returns the language of code.
 *
 * @author Guilherme da Silva Martin
 */
router.get(
  '/code/language/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const codeLanguage = await service.getCodeLanguage(req.params.id);

    res.status(200).json(new SuccessResponse(200, 'Success to get code language', { CodeLanguage: codeLanguage }));
  })
);

/**
 * Delete code file by name.
 *
 * @author Guilherme da Silva Martin
 */
router.delete(
  '/code/file/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const deletedFile = await service.deleteCodeFile(req.params.id, req.body.FileName, req.userId);

    res.status(200).json(new SuccessResponse(200, 'Success to delete code file!', deletedFile));
  })
);

/**
 * Rename code file by name.
 *
 * @author Guilherme da Silva Martin
 */
router.put(
  '/code/file/rename/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const updatedFile = await service.updateCodeFileName(
      req.params.id,
      req.body.OldFileName,
      req.body.NewFileName,
      req.userId
    );

    res.status(200).json(new SuccessResponse(200, 'Success to update file name!', updatedFile));
  })
);

/**
 * Update code file content.
 *
 * @author Guilherme da Silva Martin
 */
router.put(
  '/code/file/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const updatedFile = await service.updateCodeFileContent(req.params.id, req.body.FileName, req.body.FileContent);

    res.status(200).json(new SuccessResponse(200, 'Success to update file content!', updatedFile));
  })
);

/**
 * Delete a code by name.
 *
 * @author Guilherme da Silva Martin
 */
router.delete(
  '/code/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
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
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const codeFiles = await service.getCodeFileTree(req.params.id, req.userId);

    res
      .status(200)
      .json(
        new SuccessResponse(200, 'Success to get folder content.', { CodeName: req.params.id, CodeFiles: codeFiles })
      );
  })
);

/**
 * Delete a code folder by name.
 *
 * @author Guilherme da Silva Martin
 */
router.delete(
  '/code/:id',
  (req, res, next) => verififyTokenJWT(req, res, next),
  asyncMiddleware(async (req, res) => {
    const service = await codeService.init();
    const deletedCode = await service.deleteCode(req.params.id, req.userId);

    res.status(200).json(new SuccessResponse(200, 'Success to delete code folder.', deletedCode));
  })
);

function verififyTokenJWT(req, res, next) {
  try {
    authentication.verifyJWT(req, res, next);
  } catch (ex) {
    console.log(ex);
    const statusCode = ex.statusCode
    res.status(statusCode).send(ex.message);
  }
}

module.exports = router;
