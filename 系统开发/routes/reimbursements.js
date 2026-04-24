// 报销相关路由
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有报销记录
router.get('/', (req, res) => {
  pool.query('SELECT * FROM reimbursements', (err, results) => {
    if (err) {
      console.error('查询报销记录失败:', err);
      res.status(500).json({ error: '查询报销记录失败' });
    } else {
      res.json(results);
    }
  });
});

// 根据ID获取报销记录
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM reimbursements WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('查询报销记录失败:', err);
      res.status(500).json({ error: '查询报销记录失败' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: '报销记录不存在' });
      }
    }
  });
});

// 添加报销记录
router.post('/', (req, res) => {
  const { id, applicant, animal_id, amount, fund_source, status, receipt_status } = req.body;
  pool.query(
    'INSERT INTO reimbursements (id, applicant, animal_id, amount, fund_source, status, receipt_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, applicant, animal_id, amount, fund_source, status, receipt_status],
    (err, results) => {
      if (err) {
        console.error('添加报销记录失败:', err);
        res.status(500).json({ error: '添加报销记录失败' });
      } else {
        res.json({ message: '添加报销记录成功' });
      }
    }
  );
});

// 更新报销记录
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { applicant, animal_id, amount, fund_source, status, receipt_status } = req.body;
  pool.query(
    'UPDATE reimbursements SET applicant = ?, animal_id = ?, amount = ?, fund_source = ?, status = ?, receipt_status = ? WHERE id = ?',
    [applicant, animal_id, amount, fund_source, status, receipt_status, id],
    (err, results) => {
      if (err) {
        console.error('更新报销记录失败:', err);
        res.status(500).json({ error: '更新报销记录失败' });
      } else {
        res.json({ message: '更新报销记录成功' });
      }
    }
  );
});

// 删除报销记录
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM reimbursements WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('删除报销记录失败:', err);
      res.status(500).json({ error: '删除报销记录失败' });
    } else {
      res.json({ message: '删除报销记录成功' });
    }
  });
});

module.exports = router;
