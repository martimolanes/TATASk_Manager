-- Description: This script contains the SQL commands to create the database schema and insert example data.


-- CREATING TABLES

-- Create Status table
CREATE TABLE IF NOT EXISTS Status (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    style VARCHAR(255)
);

-- Create Tag table
CREATE TABLE IF NOT EXISTS Tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255)
);

-- Create ActivityType table
CREATE TABLE IF NOT EXISTS ActivityType (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Activity table
CREATE TABLE IF NOT EXISTS Activity (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    status INTEGER REFERENCES Status(Id),
    activityType INTEGER REFERENCES ActivityType(Id)
);

-- Create Task table
CREATE TABLE IF NOT EXISTS Task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT,
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    status INTEGER REFERENCES Status(Id),
    activityId INTEGER REFERENCES Activity(Id)
);

-- Creating junction tables for Activity-Tag and Task-Tag relationships
CREATE TABLE IF NOT EXISTS ActivityTag (
    activityId INTEGER REFERENCES Activity(Id),
    tagId INTEGER REFERENCES Tag(Id),
    PRIMARY KEY (ActivityId, TagId)
);

CREATE TABLE IF NOT EXISTS TaskTag (
    taskId INTEGER REFERENCES Task(Id),
    tagId INTEGER REFERENCES Tag(Id),
    PRIMARY KEY (TaskId, TagId)
);


-- INSERT EXAMPLE DATA

-- Insert new example statuses
INSERT INTO Status (Title, Style) VALUES ('Planning', '#FFA07A');
INSERT INTO Status (Title, Style) VALUES ('Ongoing', '#20B2AA');
INSERT INTO Status (Title, Style) VALUES ('Completed', '#778899');
INSERT INTO Status (Title, Style) VALUES ('Paused', '#FFD700');

-- Insert new example tags
INSERT INTO Tag (Name, Color) VALUES ('Education', '#8A2BE2');
INSERT INTO Tag (Name, Color) VALUES ('Entertainment', '#DC143C');
INSERT INTO Tag (Name, Color) VALUES ('Fitness', '#2E8B57');
INSERT INTO Tag (Name, Color) VALUES ('Technology', '#DAA520');

-- Insert new example activity types
INSERT INTO ActivityType (Name) VALUES ('Personal Development');
INSERT INTO ActivityType (Name) VALUES ('Entertainment');
INSERT INTO ActivityType (Name) VALUES ('Exercise');
INSERT INTO ActivityType (Name) VALUES ('Educational');

-- Insert new example activities
INSERT INTO Activity (Title, Description, Url, StartDate, EndDate, Status, ActivityType)
VALUES 
('Python Programming Course', 'An intensive course to master Python programming', 'http://pythoncourse.com', NOW(), NOW() + INTERVAL '3 months', 1, 4),
('Marathon Training', 'Training schedule for upcoming marathon', NULL, NOW(), NOW() + INTERVAL '6 months', 2, 3),
('Chess Tournament Preparation', 'Preparation plan for national chess tournament', NULL, NOW(), NOW() + INTERVAL '2 months', 1, 2);

-- Insert new example tasks
INSERT INTO Task (Name, Content, StartDate, EndDate, Status, ActivityId)
VALUES 
('Install Python', 'Download and install the latest version of Python', NOW(), NOW() + INTERVAL '1 day', 1, 1),
('Daily 5K Run', 'Run 5 kilometers every day to build stamina', NOW(), NOW() + INTERVAL '1 month', 2, 2),
('Study Chess Openings', 'Study and memorize key chess openings', NOW(), NOW() + INTERVAL '2 weeks', 1, 3);

-- Inserts into ActivityTag for linking activities and tags
INSERT INTO ActivityTag (ActivityId, TagId) VALUES (1, 4); -- Python Programming Course with Technology tag
INSERT INTO ActivityTag (ActivityId, TagId) VALUES (2, 3); -- Marathon Training with Fitness tag
INSERT INTO ActivityTag (ActivityId, TagId) VALUES (3, 2); -- Chess Tournament Preparation with Entertainment tag

-- Inserts into TaskTag for linking tasks and tags
INSERT INTO TaskTag (TaskId, TagId) VALUES (1, 4); -- Install Python with Technology tag
INSERT INTO TaskTag (TaskId, TagId) VALUES (1, 3); -- Install Python with Entertainment tag
INSERT INTO TaskTag (TaskId, TagId) VALUES (2, 3); -- Daily 5K Run with Fitness tag
INSERT INTO TaskTag (TaskId, TagId) VALUES (3, 2); -- Study Chess Openings with Entertainment tag
