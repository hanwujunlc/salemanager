/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 60004
Source Host           : localhost:3306
Source Database       : salesalemanagerger

Target Server Type    : MYSQL
Target Server Version : 60004
File Encoding         : 65001

Date: 2016-03-22 15:10:07
*/

#drop user if exists salemanager@'%';
#drop user if exists salemanager@'localhost';

#CREATE USER 'salemanager'@'%' IDENTIFIED BY '123456';
#CREATE USER 'salemanager'@'localhost' IDENTIFIED BY '123456';

GRANT USAGE ON * . * TO 'salemanager'@'%' IDENTIFIED BY '123456'
  WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;
GRANT USAGE ON * . * TO 'salemanager'@'localhost' IDENTIFIED BY '123456'
  WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

CREATE DATABASE IF NOT EXISTS `salemanager` DEFAULT CHARACTER SET utf8 ;

GRANT ALL PRIVILEGES ON `salemanager` . * TO 'salemanager'@'%';
GRANT ALL PRIVILEGES ON `salemanager` . * TO 'salemanager'@'localhost';

--
/*