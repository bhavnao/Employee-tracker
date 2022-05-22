const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

// main prompts
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
        case "View all roles":
            return viewRoles();
        case "View all departments":
            return viewDepartments();
        case "Add Employee":
            return addEmployee();
        case "Remove Employee":
            return removeEmployee();
        case "Update employee role":
            return updateEmployeeRole();
        case "Update employee manager":
            return updateEmployeeManager();
        case "Add Department":
            return addDepartment();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();        
        case "Add Role":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        case "Exit":
			db.closeConnection();
			console.log("Thank you!");
			break;
    }
}

//-----------------Functions for the selected prompt-----------------
// View all employees
async function viewEmployees(){
   // Get result of query from database
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.table(employees);
  
    mainPrompts();
}

// View all employees by the department name---------------
async function viewEmployeesByDepartment(){
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    // asking user to choose department
    const { departmentId } = await inquirer.prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices
      }
    ]);
  
    // querying the database
    const employees = await db.findAllEmployeesByDepartment(departmentId);
  
    console.log("\n");
    console.table(employees);
  
    mainPrompts();
}

// View all employees by manager---------------------
async function viewEmployeesByManager() {

	const managers = await db.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  // asking user to choose the manager
  const { managerId } = await inquirer.prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which employee do you want to see direct reports for?",
      choices: managerChoices
    }
  ]);
// finding the employees from database
  const employees = await db.findAllEmployeesByManager(managerId);

  console.log("\n");

  if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
  } else {
    
    console.table(employees);
  }

  mainPrompts();
}

// function to view all roles------------------------------
async function viewRoles(){
    
        const roles = await db.findAllRoles();
      
        console.log("\n");
        console.table(roles);
      
        mainPrompts();
      
}

// function to view all departments-------------------------
async function viewDepartments(){
    const departments = await db.findAllDepartments();

    console.log("\n");
    console.table(departments);
  
    mainPrompts();
}

// function to add an employee-------------------------------
async function addEmployee(){
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  // getting new employee name
    const employee = await inquirer.prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  //getting new employee role
    const { roleId } = await inquirer.prompt({
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  //choosing the employee manager
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the employee's manager?",
      choices: managerChoices
    });  
    employee.manager_id = managerId;
  
    // calling add employee query in database
    await db.addEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    mainPrompts();
}

//function to remove an employee--------------------------------
async function removeEmployee(){
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices
      }
    ]);
  
    await db.removeEmployee(employeeId);  
    console.log("Removed employee from the database");  
    mainPrompts();
}

//function to update an employee role--------------------------
async function updateEmployeeRole(){
    const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);
  console.log("Updated employee's role");
  mainPrompts();
}

//function to update employee manager---------------------------
async function updateEmployeeManager(){
    const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's manager do you want to update?",
      choices: employeeChoices
    }
  ]);

  const managers = await db.findAllPossibleManagers(employeeId);
  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message:
        "Which employee do you want to set as manager for the selected employee?",
      choices: managerChoices
    }
  ]);

  await db.updateEmployeeManager(employeeId, managerId);
  console.log("Updated employee's manager");
  mainPrompts();
}

//function to add a new department---------------------
async function addDepartment(){
    const department = await inquirer.prompt([
        {
          name: "name",
          message: "What is the name of the department?"
        }
      ]);
    
      await db.addDepartment(department);    
      console.log(`Added ${department.name} to the database`);    
      mainPrompts();
}

//function to delete a department------------------
async function removeDepartment(){
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await inquirer.prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
      choices: departmentChoices
    });
  
    await db.removeDepartment(departmentId);  
    console.log(`Removed department from the database`);  
    loadMainPrompts();
}

//function to add a new role--------------------
async function addRole(){
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await inquirer.prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);  
    console.log(`Added ${role.title} to the database`);  
    mainPrompts();
}

//function to remove a role-------------------------------------
async function removeRole(){
    const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role do you want to remove?",
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);
  console.log("Removed role from the database");
  mainPrompts();
}





// initializing the mainprompts function and creating logo
function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();
    console.log(logoText);
    mainPrompts();
}
init();