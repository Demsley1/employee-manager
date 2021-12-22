const inquirer = require('inquirer');
const cTable = require('console.table');

class Employee {
    constructor () {
        this.table = '';
    }

    startDatabase() {
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
            switch(query){
                case query == 'View all departments':
                    return 
                case query == 'View all roles':
                    return
                case query == 'Add a department':
                    return
                case query == 'Add a role':
                    return
                case query == 'Add an employee':
                    return
                case query == 'Update an employee role':
                    return
                case query == 'Update employee managers':
                    return
                case query == 'View employees by the managers':
                    return
                case query == 'View employees by the depeartment':
                    return
                case query == 'Delete a department':
                    return 
                case query == 'Delete a role':
                    return 
                case query == 'Delete an employee':
                    return 
                default:
                    break;
            };
        });
    }

    
}
