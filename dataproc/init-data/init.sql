-- Create USERS table
CREATE TABLE USERS (
    id SERIAL PRIMARY KEY,              -- Auto-incrementing ID
    username VARCHAR(255) NOT NULL,    -- Username
    countryname VARCHAR(3) NOT NULL,   -- Country code (ISO Alpha-3 format)
    cityname VARCHAR(255) NOT NULL,   -- City name
    streetname VARCHAR(255) NOT NULL, -- Street name
    transactionref VARCHAR(255) NOT NULL -- Transaction reference
);

-- Insert sample data into USERS table
INSERT INTO USERS (username, countryname, cityname, streetname, transactionref) VALUES
('john_doe', 'USA', 'New York', '5th Avenue', 'TXN12345'),
('jane_smith', 'CAN', 'Toronto', 'Queen St', 'TXN67890'),
('alice_jones', 'GBR', 'London', 'Baker St', 'TXN11223'),
('bob_brown', 'AUS', 'Sydney', 'George St', 'TXN44556'),
('carol_white', 'IND', 'Mumbai', 'MG Road', 'TXN77889'),
('david_black', 'DEU', 'Berlin', 'Unter den Linden', 'TXN99001'),
('emily_green', 'FRA', 'Paris', 'Champs-Élysées', 'TXN22334'),
('frank_gray', 'JPN', 'Tokyo', 'Shibuya', 'TXN55667'),
('grace_wilson', 'BRA', 'São Paulo', 'Paulista Ave', 'TXN88900'),
('henry_adams', 'ZAF', 'Cape Town', 'Long St', 'TXN33445');
