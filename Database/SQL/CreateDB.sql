SET FOREIGN_KEY_CHECKS=0;

DROP TABLE Users;
DROP TABLE Event_Types;
DROP TABLE Events;
DROP TABLE Tickets;
DROP TABLE Riders;
DROP TABLE Roles;
DROP TABLE Role_count;

CREATE TABLE Users(
  userID int NOT NULL AUTO_INCREMENT UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  hash varchar(255) NOT NULL,
  salt varchar(255) NOT NULL,
  navn varchar(255) NOT NULL,
  tlf varchar(8),
  profile_picture varchar(255),
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
  location varchar(255) NOT NULL,
  event_start datetime NOT NULL,
  event_end datetime NOT NULL,
  archived boolean NOT NULL DEFAULT TRUE,
  event_typeID int,
  FOREIGN KEY (event_typeID) REFERENCES Event_Types(event_typeID),
  PRIMARY KEY(eventID)
);

CREATE TABLE Tickets(
  ticketID int NOT NULL AUTO_INCREMENT UNIQUE,
  ticket_name varchar(40) NOT NULL,
  price int NOT NULL,
  max_amount int NOT NULL,
  date_start datetime NOT NULL,
  date_end datetime NOT NULL,
  eventID int NOT NULL,
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  PRIMARY KEY(ticketID)
);

CREATE TABLE Riders(
  riderID int NOT NULL AUTO_INCREMENT UNIQUE,
  description varchar(40) NOT NULL,
  PRIMARY KEY(riderID)
);

CREATE TABLE Demands(
  riderID int NOT NULL,
  eventID int NOT NULL,
  userID int NOT NULL,
  FOREIGN KEY (riderID) REFERENCES Riders(riderID),
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  PRIMARY KEY(riderID, eventID, userID);
);

CREATE TABLE Roles(
  roleID int NOT NULL AUTO_INCREMENT UNIQUE,
  role_name varchar(40) NOT NULL,
  PRIMARY KEY(roleID)
);

CREATE TYPE Role_count(
  amount int NOT NULL,
  eventID int NOT NULL,
  roleID int NOT NULL,
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  FOREIGN KEY (roleID) REFERENCES Roles(roleID),
  PRIMARY KEY(eventID, roleID)
);

CREATE TABLE User_Role(
  userID int NOT NULL,
  eventID int NOT NULL,
  roleID int NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  FOREIGN KEY (roleID) REFERENCES Roles(roleID),
  PRIMARY KEY(userID, eventID, roleID)
);
