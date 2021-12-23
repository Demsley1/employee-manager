const router = require('express').Router();
const db = require('../../db/connection');

router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`

    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({ error: err.message })
            return;
        }
        res.json({
            data: rows
        });
    });
});

module.exports = router;