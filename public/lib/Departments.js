const fetch = require('node-fetch');

const getDepartment = () => {
    fetch('http://localhost:3001/api/departments').then(response => {
        response.json().then(table => {
            console.log(table)
            const { data } = table;
            console.table('Departments', data);
        });   
    }); 
};


module.exports = {
    getDepartment,

}