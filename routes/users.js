const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 用户注册
router.post('/register', (req, res) => {
    const { username, password, name, phone, email, role } = req.body;
    
    // 生成用户ID
    const id = 'USER-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    // 检查用户名是否已存在
    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('检查用户名失败:', err);
            res.status(500).json({ error: '注册失败，请稍后重试' });
        } else if (results.length > 0) {
            res.status(400).json({ error: '用户名已存在' });
        } else {
            // 插入新用户
            pool.query(
                'INSERT INTO users (id, username, password, name, phone, email, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id, username, password, name, phone, email, role, 'active'],
                (err, results) => {
                    if (err) {
                        console.error('注册用户失败:', err);
                        res.status(500).json({ error: '注册失败，请稍后重试' });
                    } else {
                        res.json({ message: '注册成功', userId: id });
                    }
                }
            );
        }
    });
});

// 用户登录
router.post('/login', (req, res) => {
    const { username, password, role } = req.body;
    
    // 验证用户
    pool.query('SELECT * FROM users WHERE username = ? AND role = ?', [username, role], (err, results) => {
        if (err) {
            console.error('登录验证失败:', err);
            res.status(500).json({ error: '登录失败，请稍后重试' });
        } else if (results.length === 0) {
            res.status(401).json({ error: '用户名或密码错误' });
        } else {
            const user = results[0];
            
            // 验证密码（实际项目中应该使用加密密码）
            if (user.password === password) {
                res.json({ 
                    message: '登录成功', 
                    user: {
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        role: user.role,
                        status: user.status
                    }
                });
            } else {
                res.status(401).json({ error: '用户名或密码错误' });
            }
        }
    });
});

// 获取用户信息
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('获取用户信息失败:', err);
            res.status(500).json({ error: '获取用户信息失败' });
        } else if (results.length === 0) {
            res.status(404).json({ error: '用户不存在' });
        } else {
            res.json(results[0]);
        }
    });
});

// 更新用户信息
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone, email, status } = req.body;
    
    pool.query(
        'UPDATE users SET name = ?, phone = ?, email = ?, status = ? WHERE id = ?',
        [name, phone, email, status, id],
        (err, results) => {
            if (err) {
                console.error('更新用户信息失败:', err);
                res.status(500).json({ error: '更新用户信息失败' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: '用户不存在' });
            } else {
                res.json({ message: '更新用户信息成功' });
            }
        }
    );
});

// 删除用户
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    pool.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('删除用户失败:', err);
            res.status(500).json({ error: '删除用户失败' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: '用户不存在' });
        } else {
            res.json({ message: '删除用户成功' });
        }
    });
});

// 获取所有用户
router.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('获取用户列表失败:', err);
            res.status(500).json({ error: '获取用户列表失败' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;