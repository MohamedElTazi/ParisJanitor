DROP DATABASE IF EXISTS Janitor;

CREATE DATABASE Janitor;

USE Janitor;

CREATE TABLE Janitor.User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    abonnement INT NOT NULL
);

CREATE TABLE Janitor.Property(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    OwnerId INT NOT NULL,
    FOREIGN KEY (OwnerId) REFERENCES Janitor.User(id)
);

CREATE TABLE Janitor.Property_Review(
    id INT PRIMARY KEY AUTO_INCREMENT,
    rating INT NOT NULL,
    review TEXT NOT NULL,
    PropertyId INT NOT NULL,
    FOREIGN KEY (PropertyId) REFERENCES Janitor.Property(id)
);

CREATE TABLE Janitor.Service(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Janitor.Transactions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    Property INT NOT NULL,
    Service INT NOT NULL,
    FOREIGN KEY (Property) REFERENCES Janitor.Property(id),
    FOREIGN KEY (Service) REFERENCES Janitor.Services(id)
);

CREATE TABLE Janitor.Abonnement(
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    User INT NOT NULL,
    Service INT NOT NULL,
    FOREIGN KEY (User) REFERENCES Janitor.User(id),
    FOREIGN KEY (Service) REFERENCES Janitor.Services(id)
);