
CREATE DATABASE IF NOT EXISTS MovieRentalDB;
USE MovieRentalDB;

DROP TABLE IF EXISTS Returns;
DROP TABLE IF EXISTS RentalItems;
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Rentals;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Movies;

CREATE TABLE Movies (
    MovieID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Year YEAR,
    Duration INT,
    NumOfCopies INT NOT NULL,
    DefaultPrice DECIMAL(10,2) NOT NULL, 
    Description TEXT,
    Rating VARCHAR(5)
);

ALTER TABLE Movies 
ADD Genre VARCHAR(50);

INSERT INTO Movies (Title, Year, Duration, NumOfCopies, DefaultPrice, Description, Rating, Genre) VALUES
('Inception',2010,148,5,5.00,'A mind-bending thriller','PG-13','Sci-Fi'),
('The Matrix',1999,136,4,5.00,'A computer hacker discovers reality','R','Sci-Fi'),
('Interstellar',2014,169,6,6.00,'Exploring space and time','PG-13','Sci-Fi'),
('The Godfather',1972,175,3,8.00,'Crime family saga','R','Crime'),
('The Dark Knight',2008,152,5,5.00,'Batman faces the Joker','PG-13','Action'),
('Pulp Fiction',1994,154,4,6.00,'Crime stories intertwined','R','Crime'),
('Forrest Gump',1994,142,5,5.00,'Life story of Forrest Gump','PG-13','Drama'),
('Gladiator',2000,155,4,6.00,'Roman general seeks revenge','R','Action'),
('Titanic',1997,195,6,7.00,'Shipwreck romance','PG-13','Romance'),
('Avatar',2009,162,5,7.00,'Humans explore Pandora','PG-13','Sci-Fi'),
('Jurassic Park',1993,127,5,5.00,'Dinosaurs brought back to life','PG-13','Adventure'),
('The Avengers',2012,143,6,6.00,'Superheroes unite','PG-13','Action'),
('Toy Story',1995,81,5,4.00,'Animated toys adventure','G','Animation'),
('The Lion King',1994,88,4,4.00,'Animated lion prince story','G','Animation'),
('Finding Nemo',2003,100,5,5.00,'Clownfish lost in ocean','G','Animation'),
('Star Wars: A New Hope',1977,121,4,5.00,'Space opera adventure','PG','Sci-Fi'),
('Star Wars: Empire Strikes Back',1980,124,4,5.00,'Darker chapter of saga','PG','Sci-Fi'),
('The Lord of the Rings: Fellowship',2001,178,5,6.00,'Fantasy epic begins','PG-13','Fantasy'),
('The Lord of the Rings: Two Towers',2002,179,5,6.00,'Second part of epic','PG-13','Fantasy'),
('The Lord of the Rings: Return of the King',2003,201,5,6.00,'Final epic battle','PG-13','Fantasy'),
('Harry Potter and the Sorcerer''s Stone',2001,152,6,5.00,'Boy wizard discovers magic','PG','Fantasy'),
('Harry Potter and the Chamber of Secrets',2002,161,6,5.00,'Second year at Hogwarts','PG','Fantasy'),
('Frozen',2013,102,5,4.00,'Animated princess adventure','PG','Animation'),
('Coco',2017,105,4,4.00,'Musical journey of a boy','PG','Animation'),
('Moana',2016,107,5,5.00,'Polynesian princess adventure','PG','Animation'),
('Avengers: Endgame',2019,181,5,6.00,'Heroes fight Thanos','PG-13','Action'),
('Black Panther',2018,134,5,6.00,'Marvel superhero in Wakanda','PG-13','Action'),
('Spider-Man: No Way Home',2021,148,6,6.00,'Spider-Man multiverse adventure','PG-13','Action'),
('Guardians of the Galaxy',2014,121,5,5.00,'Space adventurers unite','PG-13','Action'),
('Deadpool',2016,108,4,4.00,'Merc with a mouth','R','Comedy');


CREATE TABLE Customers (
    UserName VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Address VARCHAR(255),
    Phone VARCHAR(15)
);

INSERT INTO Customers (UserName, FirstName, LastName, Address, Phone) VALUES
('jdoe','John','Doe','123 Main St','555-1234'),
('asmith','Alice','Smith','456 Elm St','555-5678'),
('bwayne','Bruce','Wayne','1007 Mountain Dr','555-1111'),
('ckent','Clark','Kent','344 Clinton St','555-2222'),
('pparker','Peter','Parker','20 Ingram St','555-3333'),
('tstark','Tony','Stark','10880 Malibu Point','555-4444'),
('srogers','Steve','Rogers','569 Leaman Pl','555-5555'),
('nromanoff','Natasha','Romanoff','Unknown','555-6666'),
('bbanner','Bruce','Banner','1500 Science Rd','555-7777'),
('dprince','Diana','Prince','Themyscira','555-8888'),
('hpotter','Harry','Potter','4 Privet Drive','555-9999'),
('rweasley','Ron','Weasley','The Burrow','555-0001'),
('hgranger','Hermione','Granger','Hogwarts','555-0002'),
('lskywalker','Luke','Skywalker','Tatooine','555-0003'),
('dleia','Leia','Organa','Alderaan','555-0004'),
('ehan','Ethan','Hunt','Unknown','555-0005'),
('jjackson','Jack','Jackson','789 Oak St','555-0006'),
('mscott','Michael','Scott','1725 Slough Ave','555-0007'),
('jdavis','Jennifer','Davis','987 Pine St','555-0008'),
('cparker','Cindy','Parker','20 Ingram St','555-0009');


CREATE TABLE Rentals (
    RentalID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(50),
    RentalDate DATE NOT NULL,
    DueDate DATE NOT NULL,
    TotalPrice DECIMAL(10,2),
    FOREIGN KEY (UserName) REFERENCES Customers(UserName),
    INDEX idx_user (UserName)
);

CREATE TABLE RentalItems (
    RentalItemID INT AUTO_INCREMENT PRIMARY KEY,
    RentalID INT,
    MovieID INT,
    Price DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (RentalID) REFERENCES Rentals(RentalID),
    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID),
    INDEX idx_movie (MovieID)
);

CREATE TABLE Returns (
    ReturnID INT AUTO_INCREMENT PRIMARY KEY,
    RentalItemID INT,
    ReturnDate DATE NOT NULL,
    Fine DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (RentalItemID) REFERENCES RentalItems(RentalItemID)
);

CREATE TABLE Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    PaymentDate DATE NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    RentalID INT,
    PaymentMethod VARCHAR(20),
    FOREIGN KEY (RentalID) REFERENCES Rentals(RentalID)
);

DROP TRIGGER IF EXISTS CalculateFine;
DROP TRIGGER IF EXISTS RentalRulesCheck;

-- Fine calculation: only positive fines
DELIMITER $$

CREATE TRIGGER CalculateFine
BEFORE INSERT ON Returns
FOR EACH ROW
BEGIN
    DECLARE due DATE;
    DECLARE daysLate INT;

    SELECT rn.DueDate INTO due
    FROM Rentals rn
    JOIN RentalItems ri ON rn.RentalID = ri.RentalID
    WHERE ri.RentalItemID = NEW.RentalItemID;

    SET daysLate = DATEDIFF(NEW.ReturnDate, due);

    IF daysLate > 0 THEN
        SET NEW.Fine = daysLate * 2;
    ELSE
        SET NEW.Fine = 0;
    END IF;
END$$
DELIMITER ;
-- Rental rules: available copies + max 5 rentals
DELIMITER $$

CREATE TRIGGER RentalRulesCheck
BEFORE INSERT ON RentalItems
FOR EACH ROW
BEGIN
    DECLARE rented INT;
    DECLARE totalCopies INT;
    DECLARE activeRentals INT;
    DECLARE customerName VARCHAR(50);

    -- Get customer username
    SELECT UserName INTO customerName
    FROM Rentals
    WHERE RentalID = NEW.RentalID;

    -- Count copies of movie currently rented
    SELECT COUNT(*) INTO rented
    FROM RentalItems ri
    LEFT JOIN Returns r ON ri.RentalItemID = r.RentalItemID
    WHERE ri.MovieID = NEW.MovieID
      AND r.ReturnID IS NULL;

    -- Get total copies from Movies
    SELECT NumOfCopies INTO totalCopies
    FROM Movies
    WHERE MovieID = NEW.MovieID;

    IF rented >= totalCopies THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No copies available to rent!';
    END IF;

    -- Count active rentals for this customer
    SELECT COUNT(*) INTO activeRentals
    FROM RentalItems ri
    JOIN Rentals r ON ri.RentalID = r.RentalID
    LEFT JOIN Returns ret ON ri.RentalItemID = ret.RentalItemID
    WHERE r.UserName = customerName
      AND ret.ReturnID IS NULL;

    IF activeRentals >= 5 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Customer cannot rent more than 5 movies at a time!';
    END IF;
END$$

DELIMITER ;


CREATE OR REPLACE VIEW AvailableCopies AS
SELECT m.MovieID, m.Title, m.NumOfCopies - IFNULL(rented.RentedCount,0) AS Available
FROM Movies m
LEFT JOIN (
    SELECT ri.MovieID, COUNT(*) AS RentedCount
    FROM RentalItems ri
    LEFT JOIN Returns ret ON ri.RentalItemID = ret.RentalItemID
    WHERE ret.ReturnID IS NULL
    GROUP BY ri.MovieID
) AS rented ON m.MovieID = rented.MovieID;


INSERT INTO Rentals (UserName, RentalDate, DueDate, TotalPrice) VALUES
('jdoe','2025-11-01','2025-11-07',10.00),
('asmith','2025-11-02','2025-11-08',12.00),
('bwayne','2025-11-03','2025-11-09',8.00),
('ckent','2025-11-04','2025-11-10',9.00),
('pparker','2025-11-05','2025-11-11',7.00),
('tstark','2025-11-06','2025-11-12',15.00),
('srogers','2025-11-07','2025-11-13',11.00),
('nromanoff','2025-11-08','2025-11-14',13.00),
('bbanner','2025-11-09','2025-11-15',10.00),
('dprince','2025-11-10','2025-11-16',9.00),
('hpotter','2025-11-11','2025-11-17',8.00),
('rweasley','2025-11-12','2025-11-18',12.00),
('hgranger','2025-11-13','2025-11-19',14.00),
('lskywalker','2025-11-14','2025-11-20',11.00),
('dleia','2025-11-15','2025-11-21',10.00),
('ehan','2025-11-16','2025-11-22',9.00),
('jjackson','2025-11-17','2025-11-23',8.00),
('mscott','2025-11-18','2025-11-24',7.00),
('jdavis','2025-11-19','2025-11-25',10.00),
('cparker','2025-11-20','2025-11-26',11.00);

INSERT INTO RentalItems (RentalID, MovieID, Price) VALUES
(1,1,5.00),(1,2,5.00),
(2,3,6.00),(2,4,6.00),
(3,5,8.00), 
(4,6,9.00),
(5,7,7.00),
(6,8,15.00),
(7,9,11.00),
(8,10,13.00),
(9,11,10.00),
(10,12,9.00),
(11,13,8.00),
(12,14,12.00),
(13,15,14.00),
(14,16,11.00),
(15,17,10.00),
(16,18,9.00),
(17,19,7.00),
(18,20,10.00),
(19,21,10.00),
(20,22,11.00),
(1,23,4.00),
(2,24,4.00),
(3,25,5.00),
(4,26,6.00),
(5,27,6.00),
(6,28,6.00),
(7,29,5.00),
(8,30,4.00),
(9,21,5.00),
(10,22,5.00);


INSERT INTO Returns (RentalItemID, ReturnDate) VALUES
(1,'2025-11-08'),
(2,'2025-11-07'),
(3,'2025-11-09'),
(4,'2025-11-08'),
(5,'2025-11-11'),
(6,'2025-11-12'),
(7,'2025-11-13'),
(8,'2025-11-15'),
(9,'2025-11-16'),
(10,'2025-11-17'),
(11,'2025-11-18'),
(12,'2025-11-19'),
(13,'2025-11-20'),
(14,'2025-11-21'),
(15,'2025-11-22'),
(16,'2025-11-23'),
(17,'2025-11-24'),
(18,'2025-11-25'),
(19,'2025-11-26'),
(20,'2025-11-27');


INSERT INTO Payments (PaymentDate, Amount, RentalID, PaymentMethod) VALUES
('2025-11-08',10.00,1,'Cash'),
('2025-11-07',12.00,2,'Credit'),
('2025-11-09',8.00,3,'Cash'),
('2025-11-08',9.00,4,'Credit'),
('2025-11-11',7.00,5,'Cash'),
('2025-11-12',15.00,6,'Credit'),
('2025-11-13',11.00,7,'Cash'),
('2025-11-15',13.00,8,'Credit'),
('2025-11-16',10.00,9,'Cash'),
('2025-11-17',9.00,10,'Credit'),
('2025-11-18',8.00,11,'Cash'),
('2025-11-19',12.00,12,'Credit'),
('2025-11-20',14.00,13,'Cash'),
('2025-11-21',11.00,14,'Credit'),
('2025-11-22',10.00,15,'Cash'),
('2025-11-23',9.00,16,'Credit'),
('2025-11-24',7.00,17,'Cash'),
('2025-11-25',10.00,18,'Credit'),
('2025-11-26',10.00,19,'Cash'),
('2025-11-27',11.00,20,'Credit');

-- Show all movies
SELECT * FROM Movies;

-- Show all customers
SELECT * FROM Customers;

-- Show current rentals
SELECT * FROM Rentals;

-- Show rented movies and prices
SELECT * FROM RentalItems;

-- Check available copies
SELECT * FROM AvailableCopies;

-- Show returns with fines
SELECT * FROM Returns;

-- Show payments
SELECT * FROM Payments;
