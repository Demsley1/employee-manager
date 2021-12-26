const inquirer = require('inquirer');
const Company = require('./company');
 
class Employee extends Company{
    constructor(){
        super()
    }

    addEmployee(){
        return inquirer.prompt([
            {
                name: "first_name",
                message: "Input new employees first name:",
                validate: name => {
                    if(name){
                        return true;
                    }else {
                        console.log("please provide a first name for employee")
                        return false;
                    }
                }
            },
            {
                name: "last_name",
                message: "Input new employees last name:",
                validate: name => {
                    if(name){
                        return true;
                    }else {
                        console.log("provide a last name for employee")
                        return false;
                    } 
                }
            },
            {
                type: "number",
                name: "role_id",
                message: "Add an id for employee role {1-16 are default values}"
            },
            {
                type: "number",
                name: "manager_id",
                message: "Add an id for employees manager (manager ids can be found on employees table):"
            }
        ]).then(data => {
            console.log(data)
            const { first_name, last_name, role_id, manager_id } = data
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`;
            const params = [ first_name, last_name, role_id, manager_id ]

            db.query(sql, params, (err, result) => {
                if(err){
                    console.log("Employee could not be added")
                    return;
                }
                console.log(result)
            });

        })
        
    }

    deleteEmployee(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Provide the id for the employee you would like to delete:"
            }
        ]).then(data => {
            const { id } = data
            const sql = `DELETE FROM employees WHERE id = ?`;

            db.query(sql, id, (err, result) => {
                if(err){
                    console.log(err)
                    return;
                } else if(!result.affectedRows){
                    console.log("Employee not found");
                } else {
                   console.log({
                       changes: result.affectedRows,
                       id: id
                    })
                }
            });
        });    
    }

    updateRole(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "What is the id of the employee you would like to update?"
            },
            {
                type: "number",
                name: "role_id",
                message: "Please provide the new id of the role you would like to assign to employee:"
            }
        ]).then(data => {
            const { id, role_id } = data
            const sql = `UPDATE employees SET role_id = ?
                WHERE id = ?`;
            const params = [role_id, id];
            db.query(sql, params, (err, result) => {
                if(err){
                    console.log(err)
                    return;
                } else if(!result.affectedRows){                
                    console.log("No employee was found");
                } else {
                    console.log(result.affectedRows)
                }
            });
        });
    }

    updateManager(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "What is the id of the employee you would like to update?"
            },
            {
                type: "number",
                name: "manager_id",
                message: "Please provide the id of the manager you are assigning to employee:"
            }
        ]).then(data => {
            const { id, manager_id } = data;
            const sql = `UPDATE employees SET manager_id = ?
                WHERE id = ?`;
            const params = [manager_id, id];
        
            db.query(sql, params, (err, result) => {
                if(err){
                    console.log(err);
                    return;
                } else if(!result.affectedRows){
                    console.log("No employees was found")
                } else {
                    console.log({
                        changes: result.affectedRows,
                        data: params
                    });
                }
            });
        });
    }

    searchManager(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "What is the id of the manager whose employee's you would like to see?"
            }
        ]).then(data => {
            const { id } = data;
            const sql = `SELECT *,
            CONCAT(e.first_name, ' ', e.last_name) AS employee ,
            CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employees e
            INNER JOIN employees m
            ON m.id = e.manager_id
            LEFT JOIN roles
            ON e.role_id = roles.id
            LEFT JOIN departments
            ON roles.department_id = departments.id
            WHERE e.manager_id = ?`;

            db.query(sql, id, (err, rows) => {
                if(err){
                   console.log(err)
                    return;
                }
                console.table('Employees by Manager', rows);
            });
        });
    }

}

module.exports = Employee