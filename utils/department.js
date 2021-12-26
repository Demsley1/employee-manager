const Company = require('./company');
const inquirer = require('inquirer');
const db = require('../db/connection');

class Department extends Company{
    constructor(){
        super();
    }

    getDepartment(){
        const sql = `SELECT * FROM departments`
        db.query(sql, (err, rows) => {
            if(err){
                console.log("There was no response from database")
                return;
            }
                console.table('Departments', rows);
        });
    };

    addDepartment(){
        return inquirer.prompt([
            {
                name: 'name',
                message: 'Enter the name of the department you wish to add:',
                validate: department => {
                    if(department){
                        return true;
                    }else{
                        console.log("Add a department name")
                        return false;
                    }
                }
            }
        ]).then(departmentName => {
            const { name } = departmentName
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            const params = name
            db.query(sql, params, (err,result) => {
                if(err){
                    console.log('Department could not be added at this time. Sorry!');
                }else {
                    console.log(`The department ${name} was added to database`)
                }
            });
        });
    }

    searchEmployeeDept(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter the id of your requested department (this value can be found in department search from directory): "
            }
        ]).then(val => {
            const { id } = val
            const sql = `SELECT employees.*, departments.name 
                AS department_name, 
                roles.title AS role_title
                FROM employees
                LEFT JOIN roles 
                ON employees.role_id = roles.id
                INNER JOIN departments
                ON roles.department_id = departments.id
                WHERE departments.id = ?`;
                const params = id

                db.query(sql, params, (err, row) => {
                    if(err){
                        console.log("Could not find this department in Database")
                        return;
                    }
                    console.table("Employees in Department", row);
                });
            });
    }

    deleteDepartment(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter the id of the department you would like to delete:"
            }
        ]).then(val => {
            const { id } = val
            const sql = `DELETE FROM departments WHERE id = ?`;
            const params = id
            
            db.query(sql, params, (err, result) => {
                if(err){
                    res.statusMessage(400).json({ error: res.message });
                } else if(!result.affectedRows){
                    console.log('Department not found')  
                }
                console.log(result.affectedRows);
            });
        });
    }



}

module.exports = Department;