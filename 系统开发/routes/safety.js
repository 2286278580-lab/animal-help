// 安全事件相关路由
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有安全事件记录
router.get('/', (req, res) => {
  pool.query('SELECT * FROM safety_incidents', (err, results) => {
    if (err) {
      console.error('查询安全事件记录失败:', err);
      res.status(500).json({ error: '查询安全事件记录失败' });
    } else {
      res.json(results);
    }
  });
});

// 根据ID获取安全事件记录
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM safety_incidents WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('查询安全事件记录失败:', err);
      res.status(500).json({ error: '查询安全事件记录失败' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: '安全事件记录不存在' });
      }
    }
  });
});

// 添加安全事件记录
router.post('/', (req, res) => {
  const { id, animal_id, incident_time, location, injured_student, vaccine_status, handling_result } = req.body;
  pool.query(
    'INSERT INTO safety_incidents (id, animal_id, incident_time, location, injured_student, vaccine_status, handling_result) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, animal_id, incident_time, location, injured_student, vaccine_status, handling_result],
    (err, results) => {
      if (err) {
        console.error('添加安全事件记录失败:', err);
        res.status(500).json({ error: '添加安全事件记录失败' });
      } else {
        res.json({ message: '添加安全事件记录成功' });
      }
    }
  );
});

// 更新安全事件记录
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { animal_id, incident_time, location, injured_student, vaccine_status, handling_result } = req.body;
  pool.query(
    'UPDATE safety_incidents SET animal_id = ?, incident_time = ?, location = ?, injured_student = ?, vaccine_status = ?, handling_result = ? WHERE id = ?',
    [animal_id, incident_time, location, injured_student, vaccine_status, handling_result, id],
    (err, results) => {
      if (err) {
        console.error('更新安全事件记录失败:', err);
        res.status(500).json({ error: '更新安全事件记录失败' });
      } else {
        res.json({ message: '更新安全事件记录成功' });
      }
    }
  );
});

// 删除安全事件记录
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM safety_incidents WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('删除安全事件记录失败:', err);
      res.status(500).json({ error: '删除安全事件记录失败' });
    } else {
      res.json({ message: '删除安全事件记录成功' });
    }
  });
});

// 获取所有投诉记录
router.get('/complaints', (req, res) => {
  pool.query('SELECT * FROM complaints', (err, results) => {
    if (err) {
      console.error('查询投诉记录失败:', err);
      res.status(500).json({ error: '查询投诉记录失败' });
    } else {
      res.json(results);
    }
  });
});

// 添加投诉记录
router.post('/complaints', (req, res) => {
  const { id, feeding_point_id, content, complainant, handling_result, handling_time } = req.body;
  pool.query(
    'INSERT INTO complaints (id, feeding_point_id, content, complainant, handling_result, handling_time) VALUES (?, ?, ?, ?, ?, ?)',
    [id, feeding_point_id, content, complainant, handling_result, handling_time],
    (err, results) => {
      if (err) {
        console.error('添加投诉记录失败:', err);
        res.status(500).json({ error: '添加投诉记录失败' });
      } else {
        res.json({ message: '添加投诉记录成功' });
      }
    }
  );
});

module.exports = router;
