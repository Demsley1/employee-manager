DELETE FROM departments;
DELETE FROM roles;
DELETE FROM employees;
INSERT INTO departments (name)
VALUES 
('Accounting'),
('Engineering'),
('Marketing'),
('Design'),
('HR');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', '110000.00', 1),
('Junior Accountant', '60000.00', 1),
('Senior Accountant', '92500.00', 1),
('Manager', '140000.00', 2),
('Senior Engineer', '120000.00', 2),
('System Engineer', '95500.00', 2),
('Software Engineer', '93500.00', 2),
('Junior Engineer', '70000.00', 2), 
('Manager', '105000.00', 3),
('Associate', '70000.00', 3),
('Manager', '105000.00', 4),
('Senior Designer', '90000.00', 4),
('Mid-level Designer', '70000.00', 4),
('Manager', '108500.00', 5),
('Supervisor', '90000.00', 5),
('HR Representative', '65000.00', 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Sasha', 'Wiseman', 1, NULL),
('Carl', 'Saxon', 2, 1),
('Rasha', 'Kapesh', 3, 1),
('Kristen', 'Lampare', 3, 1),
('Brandon', 'Collins', 4, NULL),
('Jamal', 'Mitchell', 5, 5),
('Maurice', 'Crandalf', 6, 5),
('Marie', 'Fortino', 7, 5),
('Carla', 'Stevens', 8, 5),
('Bernice', 'Watkins', 9, NULL),
('Brad', 'Jackson', 10, 10),
('Gary', 'Feldman', 10, 10),
('Alesha', 'Trimane', 11, NULL),
('Steve', 'Aberamie', 12, 13),
('Frank', 'Whitehall', 13, 13),
('Monique', 'Deary', 14, NULL),
('Nicholas', 'Desfaye', 15, 16),
('Sara', 'Graham', 16, 16);
