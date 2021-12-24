const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck')

// Get the departments table
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

// get employees table by which department they are in
router.get('/departments/:id', (req,res) => {
    const sql = `SELECT employees.*, departments.name 
    AS departments_name, 
    roles.title AS role_title
    FROM employees
    LEFT JOIN roles 
    ON employees.role_id = roles.id
    INNER JOIN departments
    ON roles.department_id = departments.id
    WHERE departments.id = ?`;
    const params = req.params.id

    db.query(sql, params, (err, row) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }else if(row == []){
            res.json({
                message: "No employees are available for this department"
            })
            return;
        }
        res.json ({
            data: row
        });
    });
});

// Add a department
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

// Delete a department
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