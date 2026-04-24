// TNR相关路由
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有TNR记录
router.get('/', (req, res) => {
  pool.query('SELECT * FROM tnr_records', (err, results) => {
    if (err) {
      console.error('查询TNR记录失败:', err);
      res.status(500).json({ error: '查询TNR记录失败' });
    } else {
      res.json(results);
    }
  });
});

// 根据ID获取TNR记录
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM tnr_records WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('查询TNR记录失败:', err);
      res.status(500).json({ error: '查询TNR记录失败' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'TNR记录不存在' });
      }
    }
  });
});

// 添加TNR记录
router.post('/', (req, res) => {
  const { id, animal_id, operation_time, operation_type, hospital, responsible_person, status } = req.body;
  pool.query(
    'INSERT INTO tnr_records (id, animal_id, operation_time, operation_type, hospital, responsible_person, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, animal_id, operation_time, operation_type, hospital, responsible_person, status],
    (err, results) => {
      if (err) {
        console.error('添加TNR记录失败:', err);
        res.status(500).json({ error: '添加TNR记录失败' });
      } else {
        res.json({ message: '添加TNR记录成功' });
      }
    }
  );
});

// 更新TNR记录
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { animal_id, operation_time, operation_type, hospital, responsible_person, status } = req.body;
  pool.query(
    'UPDATE tnr_records SET animal_id = ?, operation_time = ?, operation_type = ?, hospital = ?, responsible_person = ?, status = ? WHERE id = ?',
    [animal_id, operation_time, operation_type, hospital, responsible_person, status, id],
    (err, results) => {
      if (err) {
        console.error('更新TNR记录失败:', err);
        res.status(500).json({ error: '更新TNR记录失败' });
      } else {
        res.json({ message: '更新TNR记录成功' });
      }
    }
  );
});

// 删除TNR记录
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM tnr_records WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('删除TNR记录失败:', err);
      res.status(500).json({ error: '删除TNR记录失败' });
    } else {
      res.json({ message: '删除TNR记录成功' });
    }
  });
});

module.exports = router;
