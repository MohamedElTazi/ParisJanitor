USE Janitor;

INSERT INTO Janitor.User (username, password, email, role) VALUES 
('john_doe', 'password123', 'john@example.com', 'owner'),
('jane_smith', 'password456', 'jane@example.com', 'owner'),
('admin', 'adminpassword', 'admin@example.com', 'admin'),
('mary_jones', 'password789', 'mary@example.com', 'member');

INSERT INTO Janitor.Property (name, address, city, state, price, description, image, Owner) VALUES 
('Sunny Villa', '123 Sun St', 'Los Angeles', 'CA', 350000.00, 'A beautiful sunny villa with a pool.', 'sunnyvilla.jpg', 1),
('Cozy Cottage', '456 Maple Ave', 'Portland', 'OR', 200000.00, 'A cozy cottage with a lovely garden.', 'cozycottage.jpg', 2),
('Urban Apartment', '789 Oak Blvd', 'New York', 'NY', 500000.00, 'A modern apartment in the heart of the city.', 'urbanapartment.jpg', 1);


INSERT INTO Janitor.PropertyReview (rating, review, Property) VALUES 
(5, 'Amazing place, very clean and spacious.', 1),
(4, 'Cozy and comfortable, but a bit small.', 2),
(3, 'Great location, but needs some renovation.', 3),
(5, 'Absolutely loved this villa! Would stay again.', 1),
(2, 'Not what I expected, quite noisy.', 3);


INSERT INTO Janitor.Services (name, description, price) VALUES 
('Cleaning Service', 'Comprehensive cleaning of the entire property.', 150.00),
('Gardening Service', 'Maintenance of the garden and outdoor areas.', 100.00),
('Pool Maintenance', 'Cleaning and maintenance of the swimming pool.', 80.00),
('Pest Control', 'Pest inspection and extermination services.', 120.00);


INSERT INTO Janitor.Transactions (date, amount, Property, Service) VALUES 
('2021-01-15', 150.00, 1, 1),
('2021-02-20', 100.00, 2, 2),
('2021-03-25', 80.00, 1, 3),
('2021-04-30', 120.00, 3, 4);
