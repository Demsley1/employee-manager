const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck')

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

router.post('/departments', (req, res) => {
    const errors = inputCheck(req.body, 'name');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    };

    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = req.body.name
    db.query(sql, params, (err,result) => {
        if(err){
            res.status(400).json({ error: err.message });
        }
        res.json({
            data: req.body
        });
    });
});

router.delete('/departments/:id', (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.statusMessage(400).json({ error: res.message });
        } else if(!result.affectedRows){
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;