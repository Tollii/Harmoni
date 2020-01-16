SET FOREIGN_KEY_CHECKS=0;

DROP TABLE Roles;
DROP TABLE Users;
DROP TABLE Event_Types;
DROP TABLE Events;
DROP TABLE Tickets;
DROP TABLE Contracts;
DROP TABLE Rider_Types;
DROP TABLE Riders;

CREATE TABLE Roles(
  roleID int NOT NULL AUTO_INCREMENT UNIQUE,
  role_name varchar(40) NOT NULL,
  PRIMARY KEY(roleID)
);


CREATE TABLE Users(
  userID int NOT NULL AUTO_INCREMENT UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  hash varchar(255) NOT NULL,
  salt varchar(255) NOT NULL,
  username varchar(40) NOT NULL,
  phone_number varchar(8),
  profile_picture text,
  roleID int NOT NULL,
  FOREIGN KEY (roleID) REFERENCES Roles(roleID),
  PRIMARY KEY(userID)
);

CREATE TABLE Event_Types(
  event_typeID int NOT NULL AUTO_INCREMENT UNIQUE,
  event_type varchar(40) NOT NULL,
  PRIMARY KEY(event_typeID)
);

CREATE TABLE Events(
  eventID int NOT NULL AUTO_INCREMENT UNIQUE,
  event_name varchar(40) NOT NULL,
  location blob NOT NULL,
  event_start datetime NOT NULL,
  event_end datetime NOT NULL,
  personnel text,
  description text,
  archived boolean NOT NULL DEFAULT FALSE,
  event_typeID int,
  FOREIGN KEY (event_typeID) REFERENCES Event_Types(event_typeID),
  PRIMARY KEY(eventID)
);

CREATE TABLE Tickets(
  ticketID int NOT NULL AUTO_INCREMENT UNIQUE,
  ticket_name varchar(40) NOT NULL,
  price int NOT NULL,
  ticket_amount int NOT NULL,
  date_start datetime NOT NULL,
  date_end datetime NOT NULL,
  eventID int NOT NULL,
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  PRIMARY KEY(ticketID)
);

CREATE TABLE Contracts(
  contract text,
  userID int NOT NULL,
  eventID int NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  PRIMARY KEY(userID, eventID)
);

CREATE TABLE Rider_Types(
  rider_typeID int NOT NULL AUTO_INCREMENT UNIQUE,
  description text NOT NULL,
  PRIMARY KEY(rider_typeID)
);

CREATE TABLE Riders(
  additions text,
  rider_typeID int NOT NULL,
  eventID int NOT NULL,
  userID int NOT NULL,
  FOREIGN KEY (rider_typeID) REFERENCES Rider_types(rider_typeID),
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  PRIMARY KEY(rider_typeID, eventID, userID)
);
