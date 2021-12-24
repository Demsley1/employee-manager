const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET employees table by itself
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            data: rows
        });
    });
});

// Get employees table with links to all tables included
router.get('/employees/all', (req, res) => {
    const sql = `SELECT * FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    ORDER BY manager_id ASC;`;

    db.query(sql, (err, rows) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            data: rows
        });
    });
});

// Add a new employee
router.post('/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    };

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            data: body
        });
    });
});

// Update an employees role
router.put('/employees/role/:id', (req , res) => {
    const errors = inputCheck(req.body, 'role_id');
    if(errors){
        res.status(400).json({ error: errors});
        return;
    }
    const sql = `UPDATE employees SET role_id = ?
    WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message })
            return;
        } else if(!result.affectedRows){
            res.json({
                message: "No employee was found"
            });
        } else {
            res.json({
                data: req.body.role_id,
                changes: result.affectedRows
            })
        }
    });
});

// Update an employees manager 
router.put('/employees/manager/:id', (req, res) => {
    const errors = inputCheck(req.body, 'manager_id');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `UPDATE employees SET manager_id = ?
    WHERE id = ?`;
    const params = [req.body.manager_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        } else if(!result.affectedRows){
            res.json({
                message: "No employees was found"
            });
        } else {
            res.json({
                data: req.body.manager_id,
                changes: result.affectedRows
            })
        }
    });
});

// Delete an employee
router.delete('/employees/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = req.params.id;

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        } else if(!result.affectedRows){
            res.json({
                message: "Employee not found"
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