const inquirer = require('inquirer');
const mysql = require('mysql2');
const cfonts = require('cfonts');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'M6S1L0ass294d',
    database: 'employee_tracker_db'
});

cfonts.say('EMS', {
    font: '3d',
    align: 'left',
    colors: ['magenta', 'yellow'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 0,
    space: true,
    maxLength: '10',
    gradient: true,
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
});

cfonts.say('Employee  Management System',{
    font: 'simple3d',
    alight: 'left',
    colors: ['magentaBright'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 0,
    space: true,
    maxLength: '10',
    gradient: true,
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
})

db.connect((err) => {
    if(err) throw err;
    console.log('Connection has been created')
    tracker();
})

var tracker = function () {
    inquirer.prompt([{
        type:'list',
        name:'prompt',
        message:'Enter a command',
        choices: [
              'View All Departments',
              'View All Roles',
              'View All Employees',
              'Add A Department',
              'Add A Role',
              'Add An Employee',
              'Update An Employee Role',
              'Log Out']
        }])
        .then((response) => {
        if (response.prompt === 'View All Departments'){
            viewAllDepartments();}
        else if (response.prompt === 'View All Roles'){
            viewAllRoles();}
        else if (response.prompt === 'View All Employees'){
            viewAllEmployees();}
        else if (response.prompt === 'Add A Department'){
            addDepartment();}            
        else if (response.prompt === 'Add A Role') {
            addRole();}
        else if(response.prompt === 'Add An Employee'){
            addEmployee();}        
        else if (response.prompt === 'Update An Employee Role') {
            updateEmployee();}            
        else if (response.prompt === 'Log Out') {
                db.end();
                console.log('Thank you for using the employee tracker, have a nice day');
            }
    })};
        

        function viewAllDepartments(){
            db.query('Select * From department', (err, result) => {
                if(err) throw err;
                console.log('Now Viewing All Departments: ');
                console.log(result);
                tracker();
            })};
            
        function viewAllRoles(){
            db.query('Select * From role', (err, result) => {
                if(err) throw err;
                console.log('Now Viewing All Roles: ');
                console.log(result);
                tracker();
            })};

        function viewAllEmployees(){
            db.query('Select * From employee', (err, result) => {
                if(err) throw err;
                console.log('Now Viewing All Employees: ');
                console.log(result);
                tracker();
            })};
        
        function addDepartment(){
            inquirer.prompt([{
                type: 'input',
                name:'department',
                message:'What is the name of the department you would like to add?',
                validate: department => {
                    if(department) {
                        return true;
                    } else {
                        console.log('Invalid Input, Add a valid Department');
                        return false;
                    }
                }
        }])
        .then((response) => {
                db.query('INSERT INTO department (name) VALUES (?)', [response.department], (err, result) => {
                    if(err) throw err;
                    console.log(`Added ${response.department} to departments`)
                    tracker()})
        })};

        function addRole(){
            db.query(`SELECT * FROM department`, (err, result) =>{
                if(err) throw err;

            inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Enter the name of the role you would like to add',
                validate: role => {
                    if(role) {
                        return true;
                    } else {
                        console.log('Invalid Input, Add a Valid Role');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'enter the salary for this role', 
                validate: salary => {
                    if(salary) {
                        return true;
                    } else {
                        console.log('Invalid Input, Add a Valid salary');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'department',
                message:'To which department will this role belong to?',
                choices: () => {
                    var array = [];
                    for (var i = 0; i < result.length; i++) {
                        array.push(result[i].name);
                    }
                    return array;
                }
            }

        ])
            .then((response) => {
                for (let i = 0; i < result.length; i++) {
                    if(result[i].name === response.department){
                        var department = result[i];
                    }
                }

                db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [response.role, response.salary, department.if], (err, result) => {
                    if(err) throw err;
                    console.log(`Added ${response.role} to roles`)
                    tracker();
                });
            })
        })};

        function addEmployee(){
            db.query('SELECT * FROM employee, role', (err, result) => {
                if(err) throw err;

                inquirer.prompt([{
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee',
                    validate: firstName => {
                        if(firstName) {
                            return true;
                        } else {
                            console.log('Invalid Name Please enter a valid name')
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name:'lastName',
                    message: ' Enter the last name of the employee',
                    validate: lastName => {
                        if(lastName) {
                            return true;
                        } else {
                            console.log('Invalid Name please enter a valid name')
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What will be the employees role?',
                    choices: () => {
                        var array = [];
                        for (let i = 0; i < result.length; i++) {
                            array.push(result[i].title);                                
                        }
                        var newArray = [...new Set(array)];
                        return newArray;
                    }
                },
                {
                    type:'input',
                    name: 'manager',
                    message: 'Who is the employees manager',
                    validate: manager => {
                        if (manager) {
                            return true;
                        } else {
                            console.log('Invalid Input, please enter a valid manager')
                            return false;
                        }
                    } 
                }
                ])
                .then((response) => {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].title === response.role) {
                            var role = result[i];
                        }                            
                    }

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [response.firstName, response.lastName, role.id, response.manager], (err, result) => {
                        if(err) throw err;
                        console.log(`${response.firstName} ${response.lastName} has been added to the employee list`)
                        tracker();
                    })
                })
            })
        }

        function updateEmployee(){
            db.query('SELECT * FROM employee, role', (err, result) => {
                if(err) throw err;

                inquirer.prompt([{
                    type: 'list',
                    name:'employee',
                    message:'Select an employee to update',
                    choices: () => {
                        var array = [];
                        for (let i = 0; i < result.length; i++) {
                            array.push(result[i].last_name);                                
                        }
                        var employeeArray = [...new Set(array)];
                        return employeeArray;
                    }},
                {
                    type: 'list',
                    name: 'role',
                    message: `Select the employee's new role`,
                    choices: () => {
                        var array = [];
                        for (let i = 0; i < result.length; i++) {
                            array.push(result[i].title);                                
                        }
                        var newArray = [...new Set(array)];
                        return newArray;
                    }
                }])
                .then((response) => {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].last_name === response.employee) {
                            var name = result[i];
                        }                            
                    }

                    for (let i = 0; i < result.length; i++) {
                        if(result[i].title === response.role){
                            var role = result[i];
                        }
                    }

                    db.query(`UPDATE employee SET ? WHERE ?`, [{role_id:role}, {last_name:name}], (err, result) => {
                        if(err) throw err;
                        console.log(`Updated the role for ${response.employee}`)
                        tracker();
                    });
                })
            })}