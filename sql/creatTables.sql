/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 60004
Source Host           : localhost:3306
Source Database       : salemanager

Target Server Type    : MYSQL
Target Server Version : 60004
File Encoding         : 65001

Date: 2016-03-22 15:10:07
*/

DROP DATABASE  IF EXISTS `salemanager`;

CREATE DATABASE IF NOT EXISTS `salemanager` DEFAULT CHARACTER SET utf8;
SET FOREIGN_KEY_CHECKS=0;

use `salemanager`;

-- ----------------------------
-- Table structure for `customer`
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `telephone` int(12) NOT NULL,
  `addr` char(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- -- ----------------------------
-- -- Table structure for `items`
-- -- ----------------------------
-- DROP TABLE IF EXISTS `items`;
-- CREATE TABLE `items` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` char(255) NOT NULL,
--   `cost` int(11) NOT NULL,
--   `prices` int(11) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `items`
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `sale_data`
-- ----------------------------
DROP TABLE IF EXISTS `sale_data`;
CREATE TABLE `sale_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `prices` int(11) NOT NULL,
  `sale_time` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `stock_data`
-- ----------------------------
DROP TABLE IF EXISTS `stock_data`;
CREATE TABLE `stock_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `cost`  int(11) NOT NULL,
  `stock_time` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `stock_record`
-- ----------------------------
DROP TABLE IF EXISTS `stock_record`;
CREATE TABLE `stock_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `cost`  int(11) NOT NULL,
  `stock_time` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


