/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80033
Source Host           : localhost:3306
Source Database       : db1

Target Server Type    : MYSQL
Target Server Version : 80033
File Encoding         : 65001

Date: 2024-01-03 09:19:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_brand
-- ----------------------------
DROP TABLE IF EXISTS `tb_brand`;
CREATE TABLE `tb_brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ordered` int DEFAULT NULL,
  `description` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tb_brand
-- ----------------------------
INSERT INTO `tb_brand` VALUES ('1', '苹果', '苹果公司', '88888', '3nm', '0');
INSERT INTO `tb_brand` VALUES ('2', '华为', '华为技术有限公司', '100', '华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界', '0');
INSERT INTO `tb_brand` VALUES ('3', '小米', '小米科技有限公司', '50', 'are you ok', '1');
INSERT INTO `tb_brand` VALUES ('4', '123', '456', '3', '11111', '1');
INSERT INTO `tb_brand` VALUES ('5', 'adada', '313131', '3333', '313131ddddd 1111', '1');
