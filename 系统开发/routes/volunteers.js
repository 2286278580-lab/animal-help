// 志愿者相关路由
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有志愿者
router.get('/', (req, res) => {
  pool.query('SELECT * FROM volunteers', (err, results) => {
    if (err) {
      console.error('查询志愿者失败:', err);
      res.status(500).json({ error: '查询志愿者失败' });
    } else {
      res.json(results);
    }
  });
});

// 根据ID获取志愿者
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM volunteers WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('查询志愿者失败:', err);
      res.status(500).json({ error: '查询志愿者失败' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: '志愿者不存在' });
      }
    }
  });
});

// 添加志愿者
router.post('/', (req, res) => {
  const { id, student_id, name, department, dormitory, skills, available_time, status } = req.body;
  pool.query(
    'INSERT INTO volunteers (id, student_id, name, department, dormitory, skills, available_time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, student_id, name, department, dormitory, skills, available_time, status],
    (err, results) => {
      if (err) {
        console.error('添加志愿者失败:', err);
        res.status(500).json({ error: '添加志愿者失败' });
      } else {
        res.json({ message: '添加志愿者成功' });
      }
    }
  );
});

// 更新志愿者
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { student_id, name, department, dormitory, skills, available_time, status } = req.body;
  pool.query(
    'UPDATE volunteers SET student_id = ?, name = ?, department = ?, dormitory = ?, skills = ?, available_time = ?, status = ? WHERE id = ?',
    [student_id, name, department, dormitory, skills, available_time, status, id],
    (err, results) => {
      if (err) {
        console.error('更新志愿者失败:', err);
        res.status(500).json({ error: '更新志愿者失败' });
      } else {
        res.json({ message: '更新志愿者成功' });
      }
    }
  );
});

// 删除志愿者
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM volunteers WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('删除志愿者失败:', err);
      res.status(500).json({ error: '删除志愿者失败' });
    } else {
      res.json({ message: '删除志愿者成功' });
    }
  });
});

module.exports = router;
