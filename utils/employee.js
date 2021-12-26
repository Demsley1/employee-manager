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


}

module.exports = Employee