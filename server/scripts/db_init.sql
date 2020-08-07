SET names 'utf8mb4';
CREATE DATABASE IF NOT EXISTS testdb; 
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; 
GRANT ALL PRIVILEGES ON testdb.* TO 'user'@'localhost';

USE testdb;

SET GLOBAL net_buffer_length=1000000; 
SET GLOBAL max_allowed_packet=1000000000;