-- 数据库迁移脚本
-- 运行方式: mysql -u root -p hubu_animal_rescue < migrate.sql

-- 示例：添加新字段
-- ALTER TABLE animals ADD COLUMN new_column VARCHAR(100) AFTER health_status;

-- 示例：修改字段类型
-- ALTER TABLE animals MODIFY COLUMN appearance TEXT;

-- 示例：删除字段
-- ALTER TABLE animals DROP COLUMN old_column;

-- 示例：添加索引
-- CREATE INDEX idx_animal_species ON animals(species);

-- 示例：添加外键约束
-- ALTER TABLE tnr_records ADD FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE;

SELECT '数据库迁移完成' AS message;
