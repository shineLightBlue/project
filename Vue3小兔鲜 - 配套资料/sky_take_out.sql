/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80033
Source Host           : localhost:3306
Source Database       : sky_take_out

Target Server Type    : MYSQL
Target Server Version : 80033
File Encoding         : 65001

Date: 2024-01-03 15:50:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address_book
-- ----------------------------
DROP TABLE IF EXISTS `address_book`;
CREATE TABLE `address_book` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户id',
  `consignee` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '收货人',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '性别',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '手机号',
  `province_code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '省级区划编号',
  `province_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '省级名称',
  `city_code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '市级区划编号',
  `city_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '市级名称',
  `district_code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '区级区划编号',
  `district_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '区级名称',
  `detail` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '详细地址',
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '标签',
  `is_default` tinyint(1) NOT NULL DEFAULT '0' COMMENT '默认 0 否 1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='地址簿';

-- ----------------------------
-- Records of address_book
-- ----------------------------
INSERT INTO `address_book` VALUES ('2', '5', '邓风楷', '0', '13790726108', '44', '广东省', '4403', '深圳市', '440307', '龙岗区', '平湖街道', '1', '1');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int DEFAULT NULL COMMENT '类型   1 菜品分类 2 套餐分类',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '分类名称',
  `sort` int NOT NULL DEFAULT '0' COMMENT '顺序',
  `status` int DEFAULT NULL COMMENT '分类状态 0:禁用，1:启用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint DEFAULT NULL COMMENT '创建人',
  `update_user` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='菜品及套餐分类';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('11', '1', '酒水饮料', '10', '1', '2022-06-09 22:09:18', '2022-06-09 22:09:18', '1', '1');
INSERT INTO `category` VALUES ('12', '1', '传统主食', '9', '1', '2022-06-09 22:09:32', '2022-06-09 22:18:53', '1', '1');
INSERT INTO `category` VALUES ('13', '2', '人气套餐', '12', '1', '2022-06-09 22:11:38', '2022-06-10 11:04:40', '1', '1');
INSERT INTO `category` VALUES ('15', '2', '商务套餐', '13', '1', '2022-06-09 22:14:10', '2022-06-10 11:04:48', '1', '1');
INSERT INTO `category` VALUES ('16', '1', '蜀味烤鱼', '4', '0', '2022-06-09 22:15:37', '2023-09-18 16:54:05', '1', '1');
INSERT INTO `category` VALUES ('17', '1', '蜀味牛蛙', '5', '1', '2022-06-09 22:16:14', '2022-08-31 14:39:44', '1', '1');
INSERT INTO `category` VALUES ('18', '1', '特色蒸菜', '6', '1', '2022-06-09 22:17:42', '2022-06-09 22:17:42', '1', '1');
INSERT INTO `category` VALUES ('19', '1', '新鲜时蔬', '7', '1', '2022-06-09 22:18:12', '2022-06-09 22:18:28', '1', '1');
INSERT INTO `category` VALUES ('20', '1', '水煮鱼', '8', '1', '2022-06-09 22:22:29', '2022-06-09 22:23:45', '1', '1');
INSERT INTO `category` VALUES ('21', '1', '汤类', '11', '1', '2022-06-10 10:51:47', '2022-06-10 10:51:47', '1', '1');
INSERT INTO `category` VALUES ('23', '1', '打算的安的', '22', '1', '2023-09-15 09:37:51', '2023-09-15 09:40:26', '1', '1');

-- ----------------------------
-- Table structure for dish
-- ----------------------------
DROP TABLE IF EXISTS `dish`;
CREATE TABLE `dish` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '菜品名称',
  `category_id` bigint NOT NULL COMMENT '菜品分类id',
  `price` decimal(10,2) DEFAULT NULL COMMENT '菜品价格',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '图片',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '描述信息',
  `status` int DEFAULT '1' COMMENT '0 停售 1 起售',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint DEFAULT NULL COMMENT '创建人',
  `update_user` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_dish_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='菜品';

-- ----------------------------
-- Records of dish
-- ----------------------------
INSERT INTO `dish` VALUES ('46', '王老吉', '11', '6.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/41bfcacf-7ad4-4927-8b26-df366553a94c.png', '', '1', '2022-06-09 22:40:47', '2022-06-09 22:40:47', '1', '1');
INSERT INTO `dish` VALUES ('47', '北冰洋', '11', '4.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/4451d4be-89a2-4939-9c69-3a87151cb979.png', '还是小时候的味道', '1', '2022-06-10 09:18:49', '2022-06-10 09:18:49', '1', '1');
INSERT INTO `dish` VALUES ('48', '雪花啤酒', '11', '4.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/bf8cbfc1-04d2-40e8-9826-061ee41ab87c.png', '', '1', '2022-06-10 09:22:54', '2022-06-10 09:22:54', '1', '1');
INSERT INTO `dish` VALUES ('49', '米饭', '12', '2.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/76752350-2121-44d2-b477-10791c23a8ec.png', '精选五常大米', '1', '2022-06-10 09:30:17', '2022-06-10 09:30:17', '1', '1');
INSERT INTO `dish` VALUES ('50', '馒头', '12', '1.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/475cc599-8661-4899-8f9e-121dd8ef7d02.png', '优质面粉', '1', '2022-06-10 09:34:28', '2022-06-10 09:34:28', '1', '1');
INSERT INTO `dish` VALUES ('51', '老坛酸菜鱼', '20', '56.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/4a9cefba-6a74-467e-9fde-6e687ea725d7.png', '原料：汤，草鱼，酸菜', '1', '2022-06-10 09:40:51', '2022-06-10 09:40:51', '1', '1');
INSERT INTO `dish` VALUES ('52', '经典酸菜鮰鱼', '20', '66.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/5260ff39-986c-4a97-8850-2ec8c7583efc.png', '原料：酸菜，江团，鮰鱼', '1', '2022-06-10 09:46:02', '2022-06-10 09:46:02', '1', '1');
INSERT INTO `dish` VALUES ('53', '蜀味水煮草鱼', '20', '38.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/a6953d5a-4c18-4b30-9319-4926ee77261f.png', '原料：草鱼，汤', '1', '2022-06-10 09:48:37', '2022-06-10 09:48:37', '1', '1');
INSERT INTO `dish` VALUES ('54', '清炒小油菜', '19', '18.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/3613d38e-5614-41c2-90ed-ff175bf50716.png', '原料：小油菜', '1', '2022-06-10 09:51:46', '2022-06-10 09:51:46', '1', '1');
INSERT INTO `dish` VALUES ('55', '蒜蓉娃娃菜', '19', '18.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/4879ed66-3860-4b28-ba14-306ac025fdec.png', '原料：蒜，娃娃菜', '1', '2022-06-10 09:53:37', '2022-06-10 09:53:37', '1', '1');
INSERT INTO `dish` VALUES ('56', '清炒西兰花', '19', '18.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/e9ec4ba4-4b22-4fc8-9be0-4946e6aeb937.png', '原料：西兰花', '1', '2022-06-10 09:55:44', '2022-06-10 09:55:44', '1', '1');
INSERT INTO `dish` VALUES ('57', '炝炒圆白菜', '19', '18.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/22f59feb-0d44-430e-a6cd-6a49f27453ca.png', '原料：圆白菜', '1', '2022-06-10 09:58:35', '2022-06-10 09:58:35', '1', '1');
INSERT INTO `dish` VALUES ('58', '清蒸鲈鱼', '18', '98.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/c18b5c67-3b71-466c-a75a-e63c6449f21c.png', '原料：鲈鱼', '1', '2022-06-10 10:12:28', '2022-06-10 10:12:28', '1', '1');
INSERT INTO `dish` VALUES ('59', '东坡肘子', '18', '138.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/a80a4b8c-c93e-4f43-ac8a-856b0d5cc451.png', '原料：猪肘棒', '1', '2022-06-10 10:24:03', '2022-06-10 10:24:03', '1', '1');
INSERT INTO `dish` VALUES ('60', '梅菜扣肉', '18', '58.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/6080b118-e30a-4577-aab4-45042e3f88be.png', '原料：猪肉，梅菜', '1', '2022-06-10 10:26:03', '2022-06-10 10:26:03', '1', '1');
INSERT INTO `dish` VALUES ('61', '剁椒鱼头', '18', '66.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/13da832f-ef2c-484d-8370-5934a1045a06.png', '原料：鲢鱼，剁椒', '1', '2022-06-10 10:28:54', '2022-06-10 10:28:54', '1', '1');
INSERT INTO `dish` VALUES ('62', '金汤酸菜牛蛙', '17', '88.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7694a5d8-7938-4e9d-8b9e-2075983a2e38.png', '原料：鲜活牛蛙，酸菜', '1', '2022-06-10 10:33:05', '2022-06-10 10:33:05', '1', '1');
INSERT INTO `dish` VALUES ('63', '香锅牛蛙', '17', '88.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/f5ac8455-4793-450c-97ba-173795c34626.png', '配料：鲜活牛蛙，莲藕，青笋', '1', '2022-06-10 10:35:40', '2022-06-10 10:35:40', '1', '1');
INSERT INTO `dish` VALUES ('64', '馋嘴牛蛙', '17', '88.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7a55b845-1f2b-41fa-9486-76d187ee9ee1.png', '配料：鲜活牛蛙，丝瓜，黄豆芽', '1', '2022-06-10 10:37:52', '2022-06-10 10:37:52', '1', '1');
INSERT INTO `dish` VALUES ('65', '草鱼2斤', '16', '68.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/b544d3ba-a1ae-4d20-a860-81cb5dec9e03.png', '原料：草鱼，黄豆芽，莲藕', '1', '2022-06-10 10:41:08', '2022-06-10 10:41:08', '1', '1');
INSERT INTO `dish` VALUES ('66', '江团鱼2斤', '16', '119.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/a101a1e9-8f8b-47b2-afa4-1abd47ea0a87.png', '配料：江团鱼，黄豆芽，莲藕', '1', '2022-06-10 10:42:42', '2022-06-10 10:42:42', '1', '1');
INSERT INTO `dish` VALUES ('67', '鮰鱼2斤', '16', '72.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/8cfcc576-4b66-4a09-ac68-ad5b273c2590.png', '原料：鮰鱼，黄豆芽，莲藕', '1', '2022-06-10 10:43:56', '2022-06-10 10:43:56', '1', '1');
INSERT INTO `dish` VALUES ('68', '鸡蛋汤', '21', '4.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/c09a0ee8-9d19-428d-81b9-746221824113.png', '配料：鸡蛋，紫菜', '1', '2022-06-10 10:54:25', '2022-06-10 10:54:25', '1', '1');
INSERT INTO `dish` VALUES ('69', '平菇豆腐汤', '21', '6.00', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/16d0a3d6-2253-4cfc-9b49-bf7bd9eb2ad2.png', '配料：豆腐，平菇', '1', '2022-06-10 10:55:02', '2022-06-10 10:55:02', '1', '1');
INSERT INTO `dish` VALUES ('70', '打济大路量较大', '11', '133.00', 'https://web85.oss-cn-shenzhen.aliyuncs.com/8329901b-275d-469f-9474-8bb413df7b14.jpg', '打打大道啊打打的3123dada', '0', '2023-09-15 11:44:19', '2023-09-20 11:44:39', '1', '1');

-- ----------------------------
-- Table structure for dish_flavor
-- ----------------------------
DROP TABLE IF EXISTS `dish_flavor`;
CREATE TABLE `dish_flavor` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dish_id` bigint NOT NULL COMMENT '菜品',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '口味名称',
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '口味数据list',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='菜品口味关系表';

-- ----------------------------
-- Records of dish_flavor
-- ----------------------------
INSERT INTO `dish_flavor` VALUES ('40', '10', '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES ('41', '7', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('42', '7', '温度', '[\"热饮\",\"常温\",\"去冰\",\"少冰\",\"多冰\"]');
INSERT INTO `dish_flavor` VALUES ('45', '6', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('46', '6', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('47', '5', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('48', '5', '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES ('49', '2', '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES ('50', '4', '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES ('51', '3', '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES ('52', '3', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('86', '52', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('87', '52', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('88', '51', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('89', '51', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('92', '53', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('93', '53', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('94', '54', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\"]');
INSERT INTO `dish_flavor` VALUES ('95', '56', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('96', '57', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('97', '60', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('101', '66', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('102', '67', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('103', '65', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('112', '63', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('113', '70', '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES ('114', '70', '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES ('115', '70', '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES ('116', '70', '温度', '[\"热饮\",\"常温\",\"去冰\",\"少冰\",\"多冰\"]');

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '姓名',
  `username` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '用户名',
  `password` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '密码',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '手机号',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '性别',
  `id_number` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '身份证号',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态 0:禁用，1:启用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint DEFAULT NULL COMMENT '创建人',
  `update_user` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='员工信息';

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('1', '管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '13812312312', '1', '110101199001010047', '1', '2022-02-15 15:51:20', '2022-02-17 09:16:20', '10', '1');
INSERT INTO `employee` VALUES ('2', 'dasdadas', 'asdada', 'e10adc3949ba59abbe56e057f20f883e', '13790726108', '1', '550307199205121112', '1', '2023-09-13 15:01:59', '2023-09-13 15:01:59', '10', '10');
INSERT INTO `employee` VALUES ('3', 'asdada', '312312312312', 'e10adc3949ba59abbe56e057f20f883e', '13790726102', '1', '330208799287120492', '1', '2023-09-13 15:15:19', '2023-09-13 15:15:19', '10', '10');
INSERT INTO `employee` VALUES ('8', 'djasjdak', 'asd32ada', 'e10adc3949ba59abbe56e057f20f883e', '13790726102', '1', '330208799287120492', '1', '2023-09-13 15:43:48', '2023-09-13 15:43:48', '10', '10');
INSERT INTO `employee` VALUES ('9', '12312', '112asda', 'e10adc3949ba59abbe56e057f20f883e', '13790726102', '1', '330208799287120492', '1', '2023-09-13 15:44:03', '2023-09-13 15:44:03', '10', '10');
INSERT INTO `employee` VALUES ('10', '12312312', '31231231', 'e10adc3949ba59abbe56e057f20f883e', '13790726102', '1', '330208799287120492', '1', '2023-09-13 15:44:22', '2023-09-13 15:44:22', '10', '10');
INSERT INTO `employee` VALUES ('11', 'casdasd', '312312', 'e10adc3949ba59abbe56e057f20f883e', '13790726107', '1', '440307199402123312', '1', '2023-09-13 16:14:02', '2023-09-13 16:14:02', '1', '1');
INSERT INTO `employee` VALUES ('12', '123add', '131dada', 'e10adc3949ba59abbe56e057f20f883e', '13333333333', '1', '222222222222222222', '0', '2023-09-13 16:14:16', '2023-09-13 16:14:16', '1', '1');
INSERT INTO `employee` VALUES ('13', '31dasd', '3132131', 'e10adc3949ba59abbe56e057f20f883e', '13333333333', '1', '112111111122223333', '1', '2023-09-13 16:14:45', '2023-09-13 16:14:45', '1', '1');
INSERT INTO `employee` VALUES ('14', '3asds313131', '21312', 'e10adc3949ba59abbe56e057f20f883e', '13222222222', '1', '112121111222221212', '0', '2023-09-13 16:14:58', '2023-09-13 17:10:30', '1', '1');
INSERT INTO `employee` VALUES ('15', 'dasdas', '12312312', 'e10adc3949ba59abbe56e057f20f883e', '13222131321', '1', '222233222221111222', '1', '2023-09-13 16:15:23', '2023-09-13 16:15:23', '1', '1');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '订单号',
  `status` int NOT NULL DEFAULT '1' COMMENT '订单状态 1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款',
  `user_id` bigint NOT NULL COMMENT '下单用户',
  `address_book_id` bigint NOT NULL COMMENT '地址id',
  `order_time` datetime NOT NULL COMMENT '下单时间',
  `checkout_time` datetime DEFAULT NULL COMMENT '结账时间',
  `pay_method` int NOT NULL DEFAULT '1' COMMENT '支付方式 1微信,2支付宝',
  `pay_status` tinyint NOT NULL DEFAULT '0' COMMENT '支付状态 0未支付 1已支付 2退款',
  `amount` decimal(10,2) NOT NULL COMMENT '实收金额',
  `remark` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '备注',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '手机号',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '地址',
  `user_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '用户名称',
  `consignee` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '收货人',
  `cancel_reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '订单取消原因',
  `rejection_reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '订单拒绝原因',
  `cancel_time` datetime DEFAULT NULL COMMENT '订单取消时间',
  `estimated_delivery_time` datetime DEFAULT NULL COMMENT '预计送达时间',
  `delivery_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '配送状态  1立即送出  0选择具体时间',
  `delivery_time` datetime DEFAULT NULL COMMENT '送达时间',
  `pack_amount` int DEFAULT NULL COMMENT '打包费',
  `tableware_number` int DEFAULT NULL COMMENT '餐具数量',
  `tableware_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '餐具数量状态  1按餐量提供  0选择具体数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='订单表';

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('4', '1695370734148', '6', '5', '2', '2023-09-22 16:18:54', null, '1', '0', '184.00', '', '13790726108', '平湖街道', null, '邓风楷', null, '菜品已销售完，暂时无法接单', '2023-09-25 17:51:19', '2023-09-22 17:18:00', '0', null, '2', '0', '0');
INSERT INTO `orders` VALUES ('5', '1695374114237', '6', '5', '2', '2023-09-22 17:15:14', null, '1', '0', '184.00', '', '13790726108', '平湖街道', null, '邓风楷', '用户取消', null, '2023-09-25 15:49:38', '2023-09-22 18:12:00', '0', null, '2', '0', '0');
INSERT INTO `orders` VALUES ('6', '1695374478621', '6', '5', '2', '2023-09-22 17:21:19', null, '1', '0', '184.00', '', '13790726108', '平湖街道', null, '邓风楷', '用户取消', null, '2023-09-25 15:45:53', '2023-09-22 18:21:00', '0', null, '2', '0', '0');
INSERT INTO `orders` VALUES ('7', '1695609362366', '6', '5', '2', '2023-09-25 10:36:02', null, '1', '0', '184.00', '', '13790726108', '平湖街道', null, '邓风楷', '用户取消', null, '2023-09-25 15:30:11', '2023-09-25 10:20:00', '0', null, '2', '0', '0');
INSERT INTO `orders` VALUES ('8', '1695630719846', '6', '5', '2', '2023-09-25 16:32:00', null, '1', '0', '184.00', '', '13790726108', '平湖街道', null, '邓风楷', null, '订单量较多，暂时无法接单', '2023-09-25 17:51:13', '2023-09-25 17:31:00', '0', null, '2', '0', '0');

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '名字',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '图片',
  `order_id` bigint NOT NULL COMMENT '订单id',
  `dish_id` bigint DEFAULT NULL COMMENT '菜品id',
  `setmeal_id` bigint DEFAULT NULL COMMENT '套餐id',
  `dish_flavor` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '口味',
  `number` int NOT NULL DEFAULT '1' COMMENT '数量',
  `amount` decimal(10,2) NOT NULL COMMENT '金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='订单明细表';

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES ('5', '金汤酸菜牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7694a5d8-7938-4e9d-8b9e-2075983a2e38.png', '4', '62', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('6', '馋嘴牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7a55b845-1f2b-41fa-9486-76d187ee9ee1.png', '4', '64', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('7', '馋嘴牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7a55b845-1f2b-41fa-9486-76d187ee9ee1.png', '5', '64', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('8', '香锅牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/f5ac8455-4793-450c-97ba-173795c34626.png', '5', '63', null, '中辣', '1', '88.00');
INSERT INTO `order_detail` VALUES ('9', '馋嘴牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7a55b845-1f2b-41fa-9486-76d187ee9ee1.png', '6', '64', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('10', '金汤酸菜牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7694a5d8-7938-4e9d-8b9e-2075983a2e38.png', '6', '62', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('11', '金汤酸菜牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7694a5d8-7938-4e9d-8b9e-2075983a2e38.png', '7', '62', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('12', '馋嘴牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7a55b845-1f2b-41fa-9486-76d187ee9ee1.png', '7', '64', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('13', '金汤酸菜牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7694a5d8-7938-4e9d-8b9e-2075983a2e38.png', '8', '62', null, null, '1', '88.00');
INSERT INTO `order_detail` VALUES ('14', '馋嘴牛蛙', 'https://sky-itcast.oss-cn-beijing.aliyuncs.com/7a55b845-1f2b-41fa-9486-76d187ee9ee1.png', '8', '64', null, null, '1', '88.00');

-- ----------------------------
-- Table structure for setmeal
-- ----------------------------
DROP TABLE IF EXISTS `setmeal`;
CREATE TABLE `setmeal` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `category_id` bigint NOT NULL COMMENT '菜品分类id',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '套餐名称',
  `price` decimal(10,2) NOT NULL COMMENT '套餐价格',
  `status` int DEFAULT '1' COMMENT '售卖状态 0:停售 1:起售',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '描述信息',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '图片',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint DEFAULT NULL COMMENT '创建人',
  `update_user` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_setmeal_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='套餐';

-- ----------------------------
-- Records of setmeal
-- ----------------------------
INSERT INTO `setmeal` VALUES ('35', '13', '阿萨德阿萨德阿水', '31231.00', '1', '阿水打是的阿水打的阿水的', 'https://web85.oss-cn-shenzhen.aliyuncs.com/4b2d6925-f35e-4ef4-9c92-3c4202dc0310.jpg', '2023-09-19 15:04:21', '2023-09-20 15:17:51', '1', '1');
INSERT INTO `setmeal` VALUES ('36', '13', '打就打了卡', '12312.00', '1', '大道阿水打打打是', 'https://web85.oss-cn-shenzhen.aliyuncs.com/4e089ea3-7378-4fb1-9785-c1993c2ec420.jpg', '2023-09-19 15:51:23', '2023-09-20 15:17:49', '1', '1');
INSERT INTO `setmeal` VALUES ('37', '13', '打算阿水打多少啊阿萨德啊', '3131.00', '1', '萨达的安的啊', 'https://web85.oss-cn-shenzhen.aliyuncs.com/641627ec-5203-4612-adaf-c27ee088eb78.jpg', '2023-09-19 15:51:49', '2023-09-20 15:17:48', '1', '1');

-- ----------------------------
-- Table structure for setmeal_dish
-- ----------------------------
DROP TABLE IF EXISTS `setmeal_dish`;
CREATE TABLE `setmeal_dish` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `setmeal_id` bigint DEFAULT NULL COMMENT '套餐id',
  `dish_id` bigint DEFAULT NULL COMMENT '菜品id',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '菜品名称 （冗余字段）',
  `price` decimal(10,2) DEFAULT NULL COMMENT '菜品单价（冗余字段）',
  `copies` int DEFAULT NULL COMMENT '菜品份数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='套餐菜品关系';

-- ----------------------------
-- Records of setmeal_dish
-- ----------------------------
INSERT INTO `setmeal_dish` VALUES ('58', '35', '55', '蒜蓉娃娃菜', '18.00', '1');
INSERT INTO `setmeal_dish` VALUES ('59', '35', '56', '清炒西兰花', '18.00', '5');
INSERT INTO `setmeal_dish` VALUES ('60', '35', '57', '炝炒圆白菜', '18.00', '5');
INSERT INTO `setmeal_dish` VALUES ('70', '37', '49', '米饭', '2.00', '5');
INSERT INTO `setmeal_dish` VALUES ('71', '37', '50', '馒头', '1.00', '5');
INSERT INTO `setmeal_dish` VALUES ('72', '37', '46', '王老吉', '6.00', '1');
INSERT INTO `setmeal_dish` VALUES ('73', '36', '56', '清炒西兰花', '18.00', '1');
INSERT INTO `setmeal_dish` VALUES ('74', '36', '57', '炝炒圆白菜', '18.00', '1');
INSERT INTO `setmeal_dish` VALUES ('75', '36', '55', '蒜蓉娃娃菜', '18.00', '3');

-- ----------------------------
-- Table structure for shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '商品名称',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '图片',
  `user_id` bigint NOT NULL COMMENT '主键',
  `dish_id` bigint DEFAULT NULL COMMENT '菜品id',
  `setmeal_id` bigint DEFAULT NULL COMMENT '套餐id',
  `dish_flavor` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '口味',
  `number` int NOT NULL DEFAULT '1' COMMENT '数量',
  `amount` decimal(10,2) NOT NULL COMMENT '金额',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='购物车';

-- ----------------------------
-- Records of shopping_cart
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '微信用户唯一标识',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '手机号',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '性别',
  `id_number` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '身份证号',
  `avatar` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '头像',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='用户信息';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('4', 'oRlQA5i9bNN0KEHyl-P5flgst-vI', null, null, null, null, null, '2023-09-19 11:18:04');
INSERT INTO `user` VALUES ('5', 'oRlQA5jV3ylc5Gaxf79Cb23y2Ln4', null, null, null, null, null, '2023-09-22 11:48:51');
