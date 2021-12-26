const inquirer = require('inquirer');
const fetch = require('node-fetch');
const db = require('../db/connection');
const startDirectory = require('../directory')

const getDepartment = () => {
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, rows) => {
        if(err){
            console.log("There was no response from database")
            return;
        }
        else {
            console.table('Departments', rows);
        };
    });
};

const addDepartment = () => {
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
        fetch('http://localhost:3001/api/departments', {
            method: 'POST',
            body: JSON.stringify(departmentName),
            headers: {'Content-Type': 'application/json'}
        }).then(response => { response.json().then(data => { console.log("Added: data to the database") }) });
        
    });
}

const getEmployeeDept = () => {
    return inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Enter the id of your requested department (this value can be found in department search from directory): "
        }
    ]).then(val => {
        const { id } = val
        fetch(`http://localhost:3001/api/departments/${id}`).then(response => {
            response.json().then(table => {
                const { data } = table;
                console.table('Employees by Department', data);
            });
        });
    });
};

module.exports = {
    getDepartment,
    addDepartment,
    getEmployeeDept
}