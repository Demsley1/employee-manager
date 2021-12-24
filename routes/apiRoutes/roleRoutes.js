const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck')

router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

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

router.post('/roles', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    };

    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)`;
    const params = [ body.title, body.salary, body.department_id ];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message })
        }
        res.json({
            data: body
        });
    });
});

router.delete('/roles/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = req.params.id;

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        } else if(!result.affectedRows){
            res.json({
                message: "Role not found"
            });
        } else {
            res.json({
                changes: result.affectedRows,
                id: req.params.id
            });
        };
    });
});

module.exports = router;