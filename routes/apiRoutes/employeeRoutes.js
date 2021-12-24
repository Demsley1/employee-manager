const router = require('express').Router();
const db = require('../../db/connection');

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
});

module.exports = router;