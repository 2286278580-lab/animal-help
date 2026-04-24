-- 湖北大学流浪动物救助信息管理系统数据库设计

-- 创建数据库
CREATE DATABASE IF NOT EXISTS hubu_animal_rescue DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hubu_animal_rescue;

-- 动物表
CREATE TABLE IF NOT EXISTS animals (
    id VARCHAR(50) PRIMARY KEY COMMENT '唯一编号',
    species VARCHAR(50) NOT NULL COMMENT '物种',
    appearance TEXT COMMENT '外貌特征',
    personality VARCHAR(100) COMMENT '性格评估',
    sterilization_status VARCHAR(20) NOT NULL COMMENT '绝育状态',
    health_status VARCHAR(50) NOT NULL COMMENT '健康状况',
    feeding_point_id VARCHAR(50) COMMENT '常驻投喂点',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='动物档案表';

-- TNR记录表
CREATE TABLE IF NOT EXISTS tnr_records (
    id VARCHAR(50) PRIMARY KEY COMMENT 'TNR编号',
    animal_id VARCHAR(50) NOT NULL COMMENT '关联动物',
    operation_time DATETIME NOT NULL COMMENT '手术时间',
    operation_type VARCHAR(50) NOT NULL COMMENT '手术类型',
    hospital VARCHAR(100) NOT NULL COMMENT '手术医院',
    responsible_person VARCHAR(50) NOT NULL COMMENT '责任人',
    status VARCHAR(20) NOT NULL COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='TNR管理表';

-- 领养记录表
CREATE TABLE IF NOT EXISTS adoption_records (
    id VARCHAR(50) PRIMARY KEY COMMENT '领养编号',
    animal_id VARCHAR(50) NOT NULL COMMENT '关联动物',
    adopter_name VARCHAR(50) NOT NULL COMMENT '领养人姓名',
    adopter_id VARCHAR(20) NOT NULL COMMENT '领养人证件号',
    adopter_phone VARCHAR(20) NOT NULL COMMENT '领养人电话',
    adoption_time DATETIME NOT NULL COMMENT '领养时间',
    status VARCHAR(20) NOT NULL COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='领养管理表';

-- 志愿者表
CREATE TABLE IF NOT EXISTS volunteers (
    id VARCHAR(50) PRIMARY KEY COMMENT '志愿者编号',
    student_id VARCHAR(20) NOT NULL COMMENT '学号',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    department VARCHAR(100) NOT NULL COMMENT '学院/专业',
    dormitory VARCHAR(50) COMMENT '宿舍楼',
    skills TEXT COMMENT '技能标签',
    available_time TEXT COMMENT '可参与时间',
    status VARCHAR(20) NOT NULL COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='志愿者管理表';

-- 物资表
CREATE TABLE IF NOT EXISTS supplies (
    id VARCHAR(50) PRIMARY KEY COMMENT '物资编号',
    name VARCHAR(100) NOT NULL COMMENT '物资名称',
    quantity DECIMAL(10,2) NOT NULL COMMENT '库存量',
    unit VARCHAR(20) NOT NULL COMMENT '单位',
    storage_location VARCHAR(100) NOT NULL COMMENT '存放位置',
    source VARCHAR(50) NOT NULL COMMENT '来源',
    expiry_date DATE COMMENT '有效期',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物资管理表';

-- 物资借还表
CREATE TABLE IF NOT EXISTS supply_loans (
    id VARCHAR(50) PRIMARY KEY COMMENT '借还编号',
    supply_id VARCHAR(50) NOT NULL COMMENT '关联物资',
    borrower VARCHAR(50) NOT NULL COMMENT '借用人',
    loan_time DATETIME NOT NULL COMMENT '借出时间',
    expected_return_time DATETIME NOT NULL COMMENT '预计归还时间',
    actual_return_time DATETIME COMMENT '实际归还时间',
    status VARCHAR(20) NOT NULL COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (supply_id) REFERENCES supplies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物资借还记录表';

-- 投喂点表
CREATE TABLE IF NOT EXISTS feeding_points (
    id VARCHAR(50) PRIMARY KEY COMMENT '投喂点编号',
    location VARCHAR(100) NOT NULL COMMENT '位置',
    responsible_person VARCHAR(50) NOT NULL COMMENT '负责人',
    cat_count INT COMMENT '猫口数量',
    feeding_rules TEXT COMMENT '投喂规则',
    approval_status VARCHAR(20) NOT NULL COMMENT '审批状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='投喂点信息表';

-- 报销表
CREATE TABLE IF NOT EXISTS reimbursements (
    id VARCHAR(50) PRIMARY KEY COMMENT '报销编号',
    applicant VARCHAR(50) NOT NULL COMMENT '申请人',
    animal_id VARCHAR(50) COMMENT '关联动物',
    amount DECIMAL(10,2) NOT NULL COMMENT '报销金额',
    fund_source VARCHAR(50) NOT NULL COMMENT '经费来源',
    status VARCHAR(20) NOT NULL COMMENT '审批状态',
    receipt_status VARCHAR(20) NOT NULL COMMENT '凭证状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='报销管理表';

-- 安全事件表
CREATE TABLE IF NOT EXISTS safety_incidents (
    id VARCHAR(50) PRIMARY KEY COMMENT '事件编号',
    animal_id VARCHAR(50) NOT NULL COMMENT '涉事动物',
    incident_time DATETIME NOT NULL COMMENT '事发时间',
    location VARCHAR(100) NOT NULL COMMENT '事发地点',
    injured_student VARCHAR(100) NOT NULL COMMENT '受伤学生',
    vaccine_status VARCHAR(20) NOT NULL COMMENT '疫苗状态',
    handling_result TEXT NOT NULL COMMENT '处理结果',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='伤人事件记录表';

-- 投诉表
CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(50) PRIMARY KEY COMMENT '投诉编号',
    feeding_point_id VARCHAR(50) NOT NULL COMMENT '关联投喂点',
    content TEXT NOT NULL COMMENT '投诉内容',
    complainant VARCHAR(50) NOT NULL COMMENT '投诉人',
    handling_result TEXT COMMENT '处理结果',
    handling_time DATETIME COMMENT '处理时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (feeding_point_id) REFERENCES feeding_points(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='投诉记录表';

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY COMMENT '用户编号',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    phone VARCHAR(20) COMMENT '电话',
    email VARCHAR(100) COMMENT '邮箱',
    role VARCHAR(20) NOT NULL COMMENT '角色：user/volunteer/admin',
    status VARCHAR(20) NOT NULL COMMENT '状态：active/inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 添加外键约束
ALTER TABLE animals ADD FOREIGN KEY (feeding_point_id) REFERENCES feeding_points(id) ON DELETE SET NULL;

-- 插入示例数据
-- 投喂点数据
INSERT INTO feeding_points (id, location, responsible_person, cat_count, feeding_rules, approval_status) VALUES
('Feed-01', '3号宿舍楼后花园', '张三', 5, '早晚定时', '已批准'),
('Feed-02', '5教东侧草坪', '李四', 3, '每日一次', '已批准'),
('Feed-03', '图书馆前广场', '王五', 2, '傍晚投喂', '已批准');

-- 动物数据
INSERT INTO animals (id, species, appearance, personality, sterilization_status, health_status, feeding_point_id) VALUES
('CAMPUS-CAT-001', '猫', '橘白相间，左前腿有伤疤', '亲人可摸', '已绝育', '健康', 'Feed-01'),
('CAMPUS-CAT-002', '猫', '纯黑，体型较大', '胆小怕人', '已绝育', '健康', 'Feed-02'),
('CAMPUS-DOG-001', '狗', '黄白相间，中型犬', '活泼亲人', '已绝育', '健康', 'Feed-03');

-- TNR数据
INSERT INTO tnr_records (id, animal_id, operation_time, operation_type, hospital, responsible_person, status) VALUES
('TNR-001', 'CAMPUS-CAT-001', '2026-03-15 10:30:00', '绝育手术', '武汉市宠物医院', '张三', '已完成'),
('TNR-002', 'CAMPUS-CAT-002', '2026-03-20 14:00:00', '绝育手术', '武汉市宠物医院', '李四', '已完成'),
('TNR-003', 'CAMPUS-DOG-001', '2026-03-25 09:00:00', '绝育手术', '武汉市宠物医院', '王五', '已完成');

-- 领养数据
INSERT INTO adoption_records (id, animal_id, adopter_name, adopter_id, adopter_phone, adoption_time, status) VALUES
('ADOPT-001', 'CAMPUS-CAT-001', '赵六', '420106199901011234', '13800138001', '2026-04-01 10:00:00', '已领养'),
('ADOPT-002', 'CAMPUS-CAT-002', '钱七', '420106199901011235', '13800138002', '2026-04-05 14:00:00', '已领养');

-- 志愿者数据
INSERT INTO volunteers (id, student_id, name, department, dormitory, skills, available_time, status) VALUES
('VOL-001', '2024001', '张三', '计算机学院/计科2401', '3号宿舍楼', '诱捕、喂药、摄影', '周一、周三 第5-6节', '在职'),
('VOL-002', '2024002', '李四', '生命科学学院/生科2401', '5号宿舍楼', '喂药、清洁、宣传', '周二、周四 第7-8节', '在职'),
('VOL-003', '2024003', '王五', '文学院/中文2401', '4号宿舍楼', '摄影、宣传、文案', '周五 第1-4节', '在职');

-- 物资数据
INSERT INTO supplies (id, name, quantity, unit, storage_location, source, expiry_date) VALUES
('SUP-001', '皇家猫粮', 5.00, 'kg', '社团办公室2层货架', '捐赠', '2026-12-31'),
('SUP-002', '诱捕笼', 3.00, '个', '社团仓库', '自购', NULL),
('SUP-003', '猫砂', 10.00, 'kg', '社团办公室2层货架', '捐赠', '2026-12-31');

-- 物资借还数据
INSERT INTO supply_loans (id, supply_id, borrower, loan_time, expected_return_time, actual_return_time, status) VALUES
('LOAN-001', 'SUP-002', '张三', '2026-04-01 09:00:00', '2026-04-03 17:00:00', '2026-04-03 16:30:00', '已归还'),
('LOAN-002', 'SUP-001', '李四', '2026-04-05 10:00:00', '2026-04-10 17:00:00', NULL, '借出中');

-- 报销数据
INSERT INTO reimbursements (id, applicant, animal_id, amount, fund_source, status, receipt_status) VALUES
('REIM-001', '张三', 'CAMPUS-CAT-001', 300.00, '学生众筹', '已打款', '已上传'),
('REIM-002', '李四', 'CAMPUS-DOG-001', 150.00, '校外捐款', '社长审核', '已上传');

-- 安全事件数据
INSERT INTO safety_incidents (id, animal_id, incident_time, location, injured_student, vaccine_status, handling_result) VALUES
('INJ-001', 'CAMPUS-DOG-001', '2026-04-10 15:30:00', '5教东侧草坪', '王某 2024005', '已接种狂犬', '送医处理，隔离观察');

-- 投诉数据
INSERT INTO complaints (id, feeding_point_id, content, complainant, handling_result, handling_time) VALUES
('COM-001', 'Feed-01', '夜间叫春扰民', '3号楼学生', '调整投喂时间，加强管理', '2026-04-08 10:00:00');

-- 用户数据
INSERT INTO users (id, username, password, name, phone, email, role, status) VALUES
('USER-001', 'user1', '123456', '普通用户', '13800138001', 'user1@example.com', 'user', 'active'),
('USER-002', 'volunteer1', '123456', '志愿者', '13800138002', 'volunteer1@example.com', 'volunteer', 'active'),
('USER-003', 'admin1', '123456', '管理员', '13800138003', 'admin1@example.com', 'admin', 'active'),
('USER-004', 'manager13', '123456', '系统管理员', '13800138004', 'manager13@example.com', 'admin', 'active');
