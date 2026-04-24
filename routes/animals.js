// 动物相关路由
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有动物
router.get('/', (req, res) => {
  pool.query('SELECT * FROM animals', (err, results) => {
    if (err) {
      console.error('查询动物失败:', err);
      res.status(500).json({ error: '查询动物失败' });
    } else {
      res.json(results);
    }
  });
});

// 根据ID获取动物
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM animals WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('查询动物失败:', err);
      res.status(500).json({ error: '查询动物失败' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: '动物不存在' });
      }
    }
  });
});

// 添加动物
router.post('/', (req, res) => {
  const { id, species, appearance, personality, sterilization_status, health_status, feeding_point_id } = req.body;
  pool.query(
    'INSERT INTO animals (id, species, appearance, personality, sterilization_status, health_status, feeding_point_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, species, appearance, personality, sterilization_status, health_status, feeding_point_id],
    (err, results) => {
      if (err) {
        console.error('添加动物失败:', err);
        res.status(500).json({ error: '添加动物失败' });
      } else {
        res.json({ message: '添加动物成功' });
      }
    }
  );
});

// 更新动物
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { species, appearance, personality, sterilization_status, health_status, feeding_point_id } = req.body;
  pool.query(
    'UPDATE animals SET species = ?, appearance = ?, personality = ?, sterilization_status = ?, health_status = ?, feeding_point_id = ? WHERE id = ?',
    [species, appearance, personality, sterilization_status, health_status, feeding_point_id, id],
    (err, results) => {
      if (err) {
        console.error('更新动物失败:', err);
        res.status(500).json({ error: '更新动物失败' });
      } else {
        res.json({ message: '更新动物成功' });
      }
    }
  );
});

// 删除动物
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM animals WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('删除动物失败:', err);
      res.status(500).json({ error: '删除动物失败' });
    } else {
      res.json({ message: '删除动物成功' });
    }
  });
});

module.exports = router;
