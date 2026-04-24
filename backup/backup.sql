-- 数据库备份脚本
-- 运行方式: mysql -u root -p hubu_animal_rescue < backup.sql

-- 备份所有表结构和数据
-- 动物表
CREATE TABLE IF NOT EXISTS animals_backup LIKE animals;
INSERT INTO animals_backup SELECT * FROM animals;

-- TNR记录表
CREATE TABLE IF NOT EXISTS tnr_records_backup LIKE tnr_records;
INSERT INTO tnr_records_backup SELECT * FROM tnr_records;

-- 领养记录表
CREATE TABLE IF NOT EXISTS adoption_records_backup LIKE adoption_records;
INSERT INTO adoption_records_backup SELECT * FROM adoption_records;

-- 志愿者表
CREATE TABLE IF NOT EXISTS volunteers_backup LIKE volunteers;
INSERT INTO volunteers_backup SELECT * FROM volunteers;

-- 物资表
CREATE TABLE IF NOT EXISTS supplies_backup LIKE supplies;
INSERT INTO supplies_backup SELECT * FROM supplies;

-- 物资借还表
CREATE TABLE IF NOT EXISTS supply_loans_backup LIKE supply_loans;
INSERT INTO supply_loans_backup SELECT * FROM supply_loans;

-- 投喂点表
CREATE TABLE IF NOT EXISTS feeding_points_backup LIKE feeding_points;
INSERT INTO feeding_points_backup SELECT * FROM feeding_points;

-- 报销表
CREATE TABLE IF NOT EXISTS reimbursements_backup LIKE reimbursements;
INSERT INTO reimbursements_backup SELECT * FROM reimbursements;

-- 安全事件表
CREATE TABLE IF NOT EXISTS safety_incidents_backup LIKE safety_incidents;
INSERT INTO safety_incidents_backup SELECT * FROM safety_incidents;

-- 投诉表
CREATE TABLE IF NOT EXISTS complaints_backup LIKE complaints;
INSERT INTO complaints_backup SELECT * FROM complaints;

SELECT '数据库备份完成' AS message;
