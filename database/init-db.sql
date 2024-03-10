-- Description: This script contains the SQL commands to create the database schema and insert example data.


-- CREATING TABLES

-- Create Status table
CREATE TABLE IF NOT EXISTS Status (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Style VARCHAR(255)
);

-- Create Tag table
CREATE TABLE IF NOT EXISTS Tag (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Color VARCHAR(255)
);

-- Create ActivityType table
CREATE TABLE IF NOT EXISTS ActivityType (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Create Activity table
CREATE TABLE IF NOT EXISTS Activity (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Url VARCHAR(255),
    StartDate TIMESTAMP,
    EndDate TIMESTAMP,
    Status INTEGER REFERENCES Status(Id),
    Tags TEXT, -- Consider using an association table for a normalized design
    ActivityType INTEGER REFERENCES ActivityType(Id)
);

-- Create Task table
CREATE TABLE IF NOT EXISTS Task (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Content TEXT,
    StartDate TIMESTAMP,
    EndDate TIMESTAMP,
    Tags TEXT, -- Consider using an association table for a normalized design
    Status INTEGER REFERENCES Status(Id),
    ActivityId INTEGER REFERENCES Activity(Id)
);


-- INSERT EXAMPLE DATA

-- Insert example statuses (assuming these were not already added)
INSERT INTO Status (Title, Style) VALUES ('New', '#new');
INSERT INTO Status (Title, Style) VALUES ('In Progress', '#inprogress');
INSERT INTO Status (Title, Style) VALUES ('Done', '#done');
INSERT INTO Status (Title, Style) VALUES ('Cancelled', '#cancelled');

-- Insert example tags
INSERT INTO Tag (Name, Color) VALUES ('Sport', '#ff0000');
INSERT INTO Tag (Name, Color) VALUES ('Course', '#00ff00');
INSERT INTO Tag (Name, Color) VALUES ('Work', '#0000ff');
INSERT INTO Tag (Name, Color) VALUES ('Hobby', '#ffff00');

-- Insert example activity types (assuming these were not already added)
INSERT INTO ActivityType (Name) VALUES ('Hobby');
INSERT INTO ActivityType (Name) VALUES ('School');
INSERT INTO ActivityType (Name) VALUES ('Job');
INSERT INTO ActivityType (Name) VALUES ('Other');

-- Insert example activities
INSERT INTO Activity (Title, Description, Url, StartDate, EndDate, Status, Tags, ActivityType)
VALUES ('Learn Guitar', 'Learning guitar lessons online', 'http://guitarlessons.com', NOW(), NOW() + INTERVAL '1 year', 1, 'Hobby', 1),
       ('Web Development Course', 'Complete web development course with React', 'http://webdev.com', NOW(), NOW() + INTERVAL '6 months', 2, 'Course', 2),
       ('Fitness Challenge', '30 days fitness challenge', NULL, NOW(), NOW() + INTERVAL '30 days', 3, 'Sport', 3);

-- Insert example tasks
INSERT INTO Task (Name, Content, StartDate, EndDate, Tags, Status, ActivityId)
VALUES ('Setup Development Environment', 'Install Node.js, React, and setup editor', NOW(), NOW() + INTERVAL '2 days', 'Work', 1, 2),
       ('First Guitar Lesson', 'Learn the basics of guitar, focusing on chords', NOW(), NOW() + INTERVAL '1 day', 'Hobby', 1, 1),
       ('Join Fitness Club', 'Sign up for the local fitness club membership', NOW(), NOW() + INTERVAL '1 day', 'Sport', 2, 3);
