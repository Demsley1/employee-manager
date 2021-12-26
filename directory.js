const inquirer = require('inquirer');
const cTable = require('console.table');
// Import functions that start the query for each choice
const Department = require('./utils/department');
const Employee = require('./utils/employee');
const Role = require('./utils/role');

const startDirectory = () => {
    return inquirer.prompt([
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
        switch (directory.valueOf()) {
            case 'View all departments':
                new Department().getDepartment()
                return startDirectory();
            case 'View all employees':
                new Employee().showCompany()
                return startDirectory();
            case 'View all roles':
                new Role().getRole()
                return startDirectory();
            case 'Add a department':
                new Department().addDepartment()
                return startDirectory();
            case 'Add a role':
                new Role().addRole()
                return startDirectory();
            case 'Add an employee':
                new Employee().addEmployee()
                return startDirectory();
            case 'Update an employee role':
                new Employee().updateRole()
                return startDirectory();
            case 'Update employee managers':
                new Employee().updateManager()
                return startDirectory();
            case 'View employees by the managers':
                new Employee().searchManager()
                return startDirectory();
            case 'View employees by the department':
                new Department().searchEmployeeDept()
                return startDirectory();
            case 'Delete a department':
                new Department().deleteDepartment()
                return startDirectory();
            case 'Delete a role':
                new Role().deleteRole()
                return startDirectory();
            case 'Delete an employee':
                new Employee().deleteEmployee()
                return startDirectory();
            default:
                break;
        };
    });
}

module.exports = startDirectory() 


