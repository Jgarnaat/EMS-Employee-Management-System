INSERT INTO department ( name ) VALUES
     ('sales'),
     ('warehouse'),
     ('customer_service'),
     ('quality_assurance'),
     ('accounting'),
     ('management');


INSERT INTO role ( title, salary, department_id ) VALUES
    ('salesperson',       60000, 1),
    ('accountant',        75000, 2),
    ('product_tester',    54000, 3),
    ('dock_worker',       50000, 4),
    ('customer_assistant',60000, 5),
    ('regional_manager',  65000, 6);


INSERT INTO employee ( first_name, last_name, role_id, manager_id ) VALUES
    ('Dwight', 'Schrute', 1, 1),
    ('Jim',    'Halpert', 1, 1),
    ('Kelly',  'Kapoor',  3, 5),
    ('Creed',  'Branton', 4, 4),
    ('Darrly', 'Philbin', 2, 4),
    ('Kevin',  'Malone',  5, 2),
    ('Michael','Scott',   6, 6),


