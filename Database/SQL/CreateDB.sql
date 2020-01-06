SET FOREIGN_KEY_CHECKS=0;

DROP TABLE Users;
DROP TABLE Events;

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
