const inquirer = require('inquirer');
const Company = require('./company');

class Role extends Company{
    constructor(){
        super();
    }

    getRole(){
        const sql = `SELECT * FROM roles
        LEFT JOIN departments
        ON  roles.department_id = departments.id`
        db.query(sql, (err, rows) => {
            if(err){
                console.log("There was no response from database")
                return;
            }
                console.table('Roles', rows);
        });
    }

    addRole(){
        return inquirer.prompt([
            {
                name: "title",
                message: "what is the title of the role?",
                validate: title => {
                    if(title){
                        return true;
                    } else {
                        console.log("You need to provide a title for role");
                        return false;
                    }
                }
            },
            {
                type: "number",
                name: "salary",
                message: "Input a salary for employee's role"
            },
            {
                type: "number",
                name: "department_id",
                message: "What is the id of the department that this new role will fall under?"
            }
        ]).then(data => {
            const { title, salary, department_id } = data;
            const sql = `INSERT INTO roles (title, salary, department_id)
            VALUES (?, ?, ?)`;
            const params = [ title, salary, department_id ];
        
            db.query(sql, params, (err, result) => {
                if(err){
                   console.log(err);
                }
                console.log(result)
            });
        });
    }

    deleteRole(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "What is the id of the role you would like to delete?"
            }
        ]).then(data => {
            const { id } = data;
            const sql = `DELETE FROM roles WHERE id = ?`;
        
            db.query(sql, id, (err, result) => {
                if(err){
                    console.log(err);
                    return;
                } else if(!result.affectedRows){
                    console.log("Role not found")
                }else {
                    console.log({
                        changes: result.affectedRows,
                        id: id
                    });
                };
            });
        });
    }
}

module.exports = Role;