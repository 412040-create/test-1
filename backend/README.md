# 英文單字卡 - 後台 API

## 概述
這是英文單字卡應用的後台 API 服務，使用 Node.js + Express 框架。

## 功能
- 單字增刪改查 (CRUD)
- RESTful API 設計
- 數據持久化存儲

## 安裝

```bash
cd backend
npm install
```

## 環境設定

複製 `.env.example` 為 `.env`：

```bash
cp .env.example .env
```

編輯 `.env` 文件設定環境變數。

## 啟動

### 開發模式（需要安裝 nodemon）
```bash
npm run dev
```

### 生產模式
```bash
npm start
```

伺服器將在 `http://localhost:3000` 啟動。

## API 端點

### 獲取所有單字
```
GET /api/words
```

### 新增單字
```
POST /api/words
Content-Type: application/json

{
  "word": "photograph",
  "translation": "照片",
  "partOfSpeech": "noun",
  "example": "The photograph captured the sunset.",
  "rootAnalysis": "photo- 意為光"
}
```

### 獲取特定單字
```
GET /api/words/:id
```

### 更新單字
```
PUT /api/words/:id
Content-Type: application/json

{
  "translation": "照片",
  "partOfSpeech": "noun",
  "example": "The photograph captured the sunset.",
  "rootAnalysis": "photo- 意為光"
}
```

### 刪除單字
```
DELETE /api/words/:id
```

## TODO
- [ ] 數據庫集成 (SQLite/PostgreSQL)
- [ ] 認證與授權
- [ ] 單字搜尋功能
- [ ] 單字分類管理
- [ ] 用戶進度追蹤
- [ ] 單元測試
- [ ] API 文檔 (Swagger)

## 開發

### 項目結構
```
backend/
├── server.js          # 主服務文件
├── package.json       # 依賴管理
├── .env.example       # 環境變數示例
├── README.md          # 本文件
└── data/              # 數據文件夾（待建立）
```

## 協議
MIT
