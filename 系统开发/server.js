// 主服务器文件
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 导入路由
const animalsRouter = require('./routes/animals');
const tnrRouter = require('./routes/tnr');
const adoptionRouter = require('./routes/adoption');
const volunteersRouter = require('./routes/volunteers');
const suppliesRouter = require('./routes/supplies');
const reimbursementsRouter = require('./routes/reimbursements');
const safetyRouter = require('./routes/safety');
const usersRouter = require('./routes/users');

// 创建Express应用
const app = express();

// 配置中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 配置静态文件服务
app.use(express.static('.'));

// 注册路由
app.use('/api/animals', animalsRouter);
app.use('/api/tnr', tnrRouter);
app.use('/api/adoption', adoptionRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/supplies', suppliesRouter);
app.use('/api/reimbursements', reimbursementsRouter);
app.use('/api/safety', safetyRouter);
app.use('/api/users', usersRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
