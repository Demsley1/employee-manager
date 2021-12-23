const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartment } = require('./Departments');

class Company {
    constructor () {
        this.table = '';
    }

    startDirectory() {
        return inquirer.prompt ([
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
                'View employees by the depeartment',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Quit'
                ],
                default:'View all departments'
            }
        ]).then(query => {
            const { directory } = query;
            switch(directory.valueOf()){
                case 'View all departments':
                    return this.Departments();
                case 'View all employees':
                    return this.Employees();
                case 'View all roles':
                    return this.Roles();
                case 'Add a department':
                    return this.Departments();
                case 'Add a role':
                    return this.Roles();
                case 'Add an employee':
                    return this.Employees();
                case 'Update an employee role':
                    return this.Employees();
                case 'Update employee managers':
                    return this.Employees();
                case 'View employees by the managers':
                    return this.Employees();
                case 'View employees by the department':
                    return this.Employees();
                case 'Delete a department':
                    return this.Departments();
                case 'Delete a role':
                    return this.Roles();
                case 'Delete an employee':
                    return this.Employees();
                default:
                    return;
            };
        });
    }

    Departments() {    
        getDepartment();  
        
        this.startDirectory();
    }

    Employees() {

    };

    Roles() {

    };

};

module.exports = Company ;