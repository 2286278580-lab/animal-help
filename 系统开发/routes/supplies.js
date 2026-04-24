// 物资相关路由
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有物资
router.get('/', (req, res) => {
  pool.query('SELECT * FROM supplies', (err, results) => {
    if (err) {
      console.error('查询物资失败:', err);
      res.status(500).json({ error: '查询物资失败' });
    } else {
      res.json(results);
    }
  });
});

// 根据ID获取物资
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM supplies WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('查询物资失败:', err);
      res.status(500).json({ error: '查询物资失败' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: '物资不存在' });
      }
    }
  });
});

// 添加物资
router.post('/', (req, res) => {
  const { id, name, quantity, unit, storage_location, source, expiry_date } = req.body;
  pool.query(
    'INSERT INTO supplies (id, name, quantity, unit, storage_location, source, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, name, quantity, unit, storage_location, source, expiry_date],
    (err, results) => {
      if (err) {
        console.error('添加物资失败:', err);
        res.status(500).json({ error: '添加物资失败' });
      } else {
        res.json({ message: '添加物资成功' });
      }
    }
  );
});

// 更新物资
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity, unit, storage_location, source, expiry_date } = req.body;
  pool.query(
    'UPDATE supplies SET name = ?, quantity = ?, unit = ?, storage_location = ?, source = ?, expiry_date = ? WHERE id = ?',
    [name, quantity, unit, storage_location, source, expiry_date, id],
    (err, results) => {
      if (err) {
        console.error('更新物资失败:', err);
        res.status(500).json({ error: '更新物资失败' });
      } else {
        res.json({ message: '更新物资成功' });
      }
    }
  );
});

// 删除物资
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM supplies WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('删除物资失败:', err);
      res.status(500).json({ error: '删除物资失败' });
    } else {
      res.json({ message: '删除物资成功' });
    }
  });
});

// 获取所有物资借还记录
router.get('/loans', (req, res) => {
  pool.query('SELECT * FROM supply_loans', (err, results) => {
    if (err) {
      console.error('查询物资借还记录失败:', err);
      res.status(500).json({ error: '查询物资借还记录失败' });
    } else {
      res.json(results);
    }
  });
});

// 添加物资借还记录
router.post('/loans', (req, res) => {
  const { id, supply_id, borrower, loan_time, expected_return_time, actual_return_time, status } = req.body;
  pool.query(
    'INSERT INTO supply_loans (id, supply_id, borrower, loan_time, expected_return_time, actual_return_time, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, supply_id, borrower, loan_time, expected_return_time, actual_return_time, status],
    (err, results) => {
      if (err) {
        console.error('添加物资借还记录失败:', err);
        res.status(500).json({ error: '添加物资借还记录失败' });
      } else {
        res.json({ message: '添加物资借还记录成功' });
      }
    }
  );
});

// 获取所有投喂点
router.get('/feeding-points', (req, res) => {
  pool.query('SELECT * FROM feeding_points', (err, results) => {
    if (err) {
      console.error('查询投喂点失败:', err);
      res.status(500).json({ error: '查询投喂点失败' });
    } else {
      res.json(results);
    }
  });
});

// 添加投喂点
router.post('/feeding-points', (req, res) => {
  const { id, location, responsible_person, cat_count, feeding_rules, approval_status } = req.body;
  pool.query(
    'INSERT INTO feeding_points (id, location, responsible_person, cat_count, feeding_rules, approval_status) VALUES (?, ?, ?, ?, ?, ?)',
    [id, location, responsible_person, cat_count, feeding_rules, approval_status],
    (err, results) => {
      if (err) {
        console.error('添加投喂点失败:', err);
        res.status(500).json({ error: '添加投喂点失败' });
      } else {
        res.json({ message: '添加投喂点成功' });
      }
    }
  );
});

module.exports = router;
