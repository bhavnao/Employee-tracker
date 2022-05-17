INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Sales'),
    ('Legal'),
    ('Human Resources');
 

INSERT INTO role
    (title, salary, department_id)
VALUES
    
    ('Technical Lead', 120000, 1),
    ('Software Engineer', 100000, 1),
    ('Account Manager', 140000, 2),
    ('Accountant', 100000, 2),
    ('Sales Lead', 100000, 3),
    ('Salesperson', 80000, 3),
    ('Legal Team Lead', 180000, 4),
    ('Lawyer', 1700000, 4),
    ('HR Manager', 80000, 5);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Brown', 1, 3),
    ('Mike', 'Allen', 2, 3),
    ('Raymond','Blanks', 3, NULL),
    ('Pritesh', 'Shah', 4, 3),
    ('Nicole', 'Williams',5, NULL),
    ('Ashley', 'Quiroz', 6, 5),
    ('Sarah', 'Landers', 7, NULL),
    ('Vikas', 'Agarwal', 8, 7),
    ('Christina','James',9,NULL);
