const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/chat/', (req, res) => {
  return null;
});

module.exports = router;
