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
    ('Account Manager', 140000, 2),
    ('Technical Lead', 120000, 1),
    ('Software Engineer', 100000, 1),    
    ('Accountant', 100000, 2),
    ('Sales Lead', 100000, 3),
    ('Salesperson', 80000, 3),
    ('Legal Team Lead', 180000, 4),
    ('Lawyer', 1700000, 4),
    ('HR Manager', 80000, 5);


INSERT INTO employee
    (id,first_name, last_name, role_id, manager_id)
VALUES
    (1,'Raymond','Blanks', 1, NULL),
    (2,'John', 'Brown', 2, 1),
    (3,'Mike', 'Allen', 3, 1),
    (4,'Raymond','Blanks', 4, 1),
    (5,'Pritesh', 'Shah', 5, NULL),
    (6,'Nicole', 'Williams',6, 5),
    (7,'Ashley', 'Quiroz', 7, NULL),
    (8,'Sarah', 'Landers', 8, 7),
    (9,'Vikas', 'Agarwal', 9, NULL);
    
