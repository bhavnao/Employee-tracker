const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

async function mainPrompts() {
    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'View all roles',
                'View all departments',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update employee role',
                'Update employee manager',
                'Remove Employee',
                'Exit'
            ]
        }
    ]);
    switch (choice) {
        case "View all employees":
            return viewEmployees();
        case "View all employees by department":
            return viewEmployeesByDepartment();
        case "View all employees by manager":
            return viewEmployeesByManager();
        case "Add Employee":
            return addEmployee();
        case "Remove Employee":
            return removeEmployee();
        case "Update employee role":
            return updateEmployeeRole();
        case "Update employee manager":
            return updateEmployeeManager();
        case "View all departments":
            return viewDepartments();
        case "Add Department":
            return addDepartment();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();
        case "View all roles":
            return viewRoles();
        case "Add Role":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        case "Exit":
			db.closeConnection();
			console.log("Connection closed!");
			break;
    }
}
// initializing the mainprompts function and creating logo
function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();
    console.log(logoText);
    mainPrompts();
}
init();