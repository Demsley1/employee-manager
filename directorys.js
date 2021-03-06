const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// need to change some ids for inquirer, to name values derived from database, .aybe using query to view names and pulling the value from the query
class Works{
    constructor(){
    }

    // get the employees table with roles, and department table linked by primary key. Displays only the necessary info.
    getAllEmployees(){
        const sql = `SELECT e.id,e.first_name,e.last_name,title,salary, 
        departments.name AS department,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees m
        RIGHT JOIN employees e
        ON m.id = e.manager_id
        LEFT JOIN roles
        ON e.role_id = roles.id
        LEFT JOIN departments
        ON roles.department_id = departments.id
        `;

        db.query(sql, (err, rows) => {
            if(err){
                console.log(err)
                return;
            } else{
                console.table('All Employees', rows);
                startDirectory();
            }
        });
    }

    // get the Department database and displays it as a table in the console
    getDepartment(){
        const sql = `SELECT * FROM departments`
        db.query(sql, (err, rows) => {
            if(err){
                console.log("There was no response from database")
                return;
            }
                console.table('Departments', rows);
                startDirectory();
        });
    };

    // Lets user add a new department at a new index/id by answering specific prompts
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
                    startDirectory();
                }
            });
        });
    }

    // Lets the user search for all employees that belong in a specific department, then displays the employee table with all employees that are linked to that department
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
                    startDirectory();
                });
                
            });
            
    }

    // delete a department name from the table.
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
                startDirectory();
            });
        });
    }

    // get all the available roles that exist in the company, and the associated departments that each role belongs too then displays it in a console table
    getRole(){
        const sql = `SELECT roles.id AS id, title, salary, department_id, departments.name AS department
        FROM roles
        LEFT JOIN departments
        ON  roles.department_id = departments.id`
        db.query(sql, (err, rows) => {
            if(err){
                console.log("There was no response from database")
                return;
            }
            
            console.table('Roles', rows);
            startDirectory();
        });
    }

    // Add an additional employee role to the roles table by answering specific prompts
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
                startDirectory();
            });
        });
    }

    // Delete a specific role from the table by selecting it
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
                    startDirectory();
                };
            });
        });
    }

    // add an additional employee to the database by answering prompts for employee data.
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
                name: "manager_id",
                message: "Add an id for employees manager (manager ids can be found on employees table):",
                filter: value => {
                    if(value == ""){
                        return "NULL"
                    }
                    else{
                        return value
                    }
                }
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
                startDirectory();
            });

        })
        
    }

    // delete a specific employee from database
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
                    startDirectory();
                }
            });
        });    
    }

    // update or change an employees role in company by choosing the employee then selecting the role
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
                    startDirectory();
                }
            });
        });
    }

    // update or change an employees manager in the company by choosing the employee then selecting the manager
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
                    startDirectory();
                }
            });
        });
    }

    // search for all employees in the company that belong to each specific manager.
    searchManager(){
        return inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "What is the id of the manager whose employee's you would like to see?"
            }
        ]).then(data => {
            const { id } = data;
            const sql = `SELECT e.id,
            CONCAT(e.first_name, ' ', e.last_name) AS employee,
            title,salary, departments.name AS department,
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
                startDirectory();
            });
        });
    }
}

// this funciton handles whatever the result of the query choice that user inputs, and directs script page to each method to run based on input.
function querys(command) {

    if(command.valueOf() == 'View all departments'){
        new Works().getDepartment();
    }
    if(command.valueOf() == 'View all employees'){
        new Works().getAllEmployees()
    }
    if(command.valueOf() == 'View all roles'){
        new Works().getRole()
    }
    if(command.valueOf() =='Add a department'){
        new Works().addDepartment();
    }
    if(command.valueOf() == 'Add a role'){
        new Works().addRole()
    }
    if(command.valueOf() == 'Add an employee'){
        new Works().addEmployee()
    }
    if(command.valueOf() == 'Update an employee role'){
        new Works().updateRole()
    }
    if(command.valueOf() == 'Update employee managers'){
        new Works().updateManager()
    }
    if(command.valueOf() == 'View employees by the managers'){
        new Works().searchManager()
    }
    if(command.valueOf() == 'View employees by the department'){
        new Works().searchEmployeeDept()
    }
    if(command.valueOf() == 'Delete a department'){
        new Works().deleteDepartment()
    }
    if(command.valueOf() == 'Delete a role'){
        new Works().deleteRole()
    }
    if(command.valueOf() == 'Delete an employee'){
        new Works().deleteEmployee()
    }
}

//beginning function that asks for user inout to determine what is done with employee directory next.
function startDirectory () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'directory',
            message: 'What would you like to do first?',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update employee managers',
                'View employees by the managers',
                'View employees by the department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Quit'
            ],
            default: 'View all departments'
        }
    ]).then(query => {
        const { directory } = query;
        if(directory.valueOf() == 'Quit'){
            console.log("goodbye");
            return;
        }
        return querys(directory);
    });
}

startDirectory();