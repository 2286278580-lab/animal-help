// 领养相关路由
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有领养记录
router.get('/', (req, res) => {
  pool.query('SELECT * FROM adoption_records', (err, results) => {
    if (err) {
      console.error('查询领养记录失败:', err);
      res.status(500).json({ error: '查询领养记录失败' });
    } else {
      res.json(results);
    }
  });
});

// 根据ID获取领养记录
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM adoption_records WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('查询领养记录失败:', err);
      res.status(500).json({ error: '查询领养记录失败' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: '领养记录不存在' });
      }
    }
  });
});

// 添加领养记录
router.post('/', (req, res) => {
  const { id, animal_id, adopter_name, adopter_id, adopter_phone, adoption_time, status } = req.body;
  pool.query(
    'INSERT INTO adoption_records (id, animal_id, adopter_name, adopter_id, adopter_phone, adoption_time, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, animal_id, adopter_name, adopter_id, adopter_phone, adoption_time, status],
    (err, results) => {
      if (err) {
        console.error('添加领养记录失败:', err);
        res.status(500).json({ error: '添加领养记录失败' });
      } else {
        res.json({ message: '添加领养记录成功' });
      }
    }
  );
});

// 更新领养记录
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { animal_id, adopter_name, adopter_id, adopter_phone, adoption_time, status } = req.body;
  pool.query(
    'UPDATE adoption_records SET animal_id = ?, adopter_name = ?, adopter_id = ?, adopter_phone = ?, adoption_time = ?, status = ? WHERE id = ?',
    [animal_id, adopter_name, adopter_id, adopter_phone, adoption_time, status, id],
    (err, results) => {
      if (err) {
        console.error('更新领养记录失败:', err);
        res.status(500).json({ error: '更新领养记录失败' });
      } else {
        res.json({ message: '更新领养记录成功' });
      }
    }
  );
});

// 删除领养记录
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM adoption_records WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('删除领养记录失败:', err);
      res.status(500).json({ error: '删除领养记录失败' });
    } else {
      res.json({ message: '删除领养记录成功' });
    }
  });
});

module.exports = router;
