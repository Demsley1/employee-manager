const db = require('../db/connection');

class Company {
    constructor(){  
    }

    showCompany(){
        const sql = `SELECT *,
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
            }
        });
    }
}

module.exports = Company;