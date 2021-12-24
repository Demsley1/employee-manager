const router = require('express').Router();

router.use(require('./departRoutes'));
router.use(require('./roleRoutes'));

module.exports = router;