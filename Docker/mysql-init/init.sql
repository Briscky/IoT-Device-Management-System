CREATE DATABASE IF NOT EXISTS bs;
USE bs;
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL
);
INSERT INTO user (name, password, email) VALUES ('chennuo', '1234567', 'yahhhh731@zju.edu.cn');

CREATE TABLE IF NOT EXISTS device (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(128),
    description VARCHAR(256),
    userid INT,
    type INT,
    activate_time mediumtext
);
INSERT INTO device (name, description, userid, type) VALUES ('device0001', 'fridge', 1, 1);
INSERT INTO device (name, description, userid, type) VALUES ('device0005', 'microwave oven', 1, 1);
INSERT INTO device (name, description, userid, type) VALUES ('device0006', 'air conditioner', 1, 3);

CREATE TABLE IF NOT EXISTS message (
    clientId VARCHAR(128) NOT NULL,
    info VARCHAR(128),
    value INT,
    alert INT,
    lng DOUBLE,
    lat DOUBLE,
    timestamp mediumtext
);