const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());

// 測試路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '後台服務運行正常' });
});

// 單字 API 路由
app.get('/api/words', (req, res) => {
  // TODO: 從數據庫獲取所有單字
  res.json({
    status: 'success',
    data: []
  });
});

app.post('/api/words', (req, res) => {
  // TODO: 保存新單字到數據庫
  const { word, translation, partOfSpeech, example, rootAnalysis } = req.body;
  
  if (!word || !translation) {
    return res.status(400).json({
      status: 'error',
      message: '請提供英文單字和中文翻譯'
    });
  }

  res.json({
    status: 'success',
    message: '單字已保存',
    data: { word, translation, partOfSpeech, example, rootAnalysis }
  });
});

app.get('/api/words/:id', (req, res) => {
  // TODO: 獲取特定單字
  res.json({
    status: 'success',
    data: {}
  });
});

app.put('/api/words/:id', (req, res) => {
  // TODO: 更新單字
  res.json({
    status: 'success',
    message: '單字已更新'
  });
});

app.delete('/api/words/:id', (req, res) => {
  // TODO: 刪除單字
  res.json({
    status: 'success',
    message: '單字已刪除'
  });
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: '伺服器錯誤'
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`後台服務已啟動，監聽端口 ${PORT}`);
  console.log(`訪問 http://localhost:${PORT}/api/health 進行測試`);
});
