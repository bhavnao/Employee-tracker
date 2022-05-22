DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT  AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
      REFERENCES department(id)
         ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee( 
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) 
    REFERENCES role(id) 
        ON DELETE CASCADE,
CONSTRAINT fk_manager FOREIGN KEY (manager_id) 
    REFERENCES employee(id) 
        ON DELETE SET NULL
    
);



