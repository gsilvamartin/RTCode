const express = require('express');
const router = express.Router();
const user = require('../service/UserService');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Retorna um usuário por seu id
 *
 * @author Guilherme da Silva Martin
 */
router.get('/users/:id', async (req, res) => {
  let userService = await user.init();

  res.send(await userService.getUserById(req.params.id));
});

/**
 * Insere um novo usuário
 *
 * @author Guilherme da Silva Martin
 */
router.post('/users/', async (req, res) => {
  let userService = await user.init();

  res.send(await userService.createNewUser(req.body.Email, req.body.Name, req.body.Image, req.body.Password));
});

/**
 * Deleta um usuário por seu id
 *
 * @author Guilherme da Silva Martin
 */
router.delete('/users/:id', async (req, res) => {
  let userService = await user.init();

  res.send(await userService.deleteUser(req.params.id));
});

/**
 * Atualiza um usuário
 *
 * @author Guilherme da Silva Martin
 */
router.put('/users/:id', async (req, res) => {
  let userService = await user.init();

  res.send(
    await userService.updateUser(req.params.id, req.body.Name, req.body.Email, req.body.Password, req.body.Image)
  );
});

module.exports = router;
