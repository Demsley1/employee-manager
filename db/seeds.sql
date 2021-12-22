INSERT INTO departments (name)
VALUES 
('Accounting'),
('Engineering'),
('Marketing'),
('Design'),
('HR')

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', '$95,000.00', 1),
('Junior Accountant', '$45,000.00', 1),
('Senior Accountant', '$80,000.00', 1),
('Manager', '$110,000.00', 2),
('Senior Engineer', '$98,500.00', 2),
('System Engineer', '$82,500.00', 2),
('Software Engineer', '$80,500.00', 2),
('Junior Engineer', '$60,000.00', 2), 
('Manager', '$87,500.00', 3),
('Associate', '$65,000.00', 3),
('Manager', '$87,500.00', 4),
('Senior Designer', '$82,000.00', 4),
('Mid-level Designer', '$70,000.00', 4),
('Manager', '$90,000.00', 5),
('Supervisor', '$70,000.00', 5),
('HR Representative', '$50,000.00', 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Sasha', 'Wiseman', 1, 15),
('Carl', 'Saxon', 2, 15),
('Kristen', 'Lampare', 3, 15),
('Brandon', 'Collins', 4, 28),
('Jamal', 'Mitchell', 5, 28),
('Maurice', 'Crandalf', 6, 28),
('Marie', 'Fortino', 7, 28),
('Carla', 'Stevens', 8, 28),
('Bernice', 'Watkins', 9, 32),
('Brad', 'Jackson', 10, 32),
('Gary', 'Feldman', 10, 32),
('Alesha', 'Trimane', 11, 10),
('Steve', 'Aberamie', 12, 10),
('Frank', 'Whitehall', 13, 10),
('Monique', 'Deary', 14, 54),
('Nicholas', 'Desfaye', 15, 54),
('Sara', 'Graham', 16, 54);







