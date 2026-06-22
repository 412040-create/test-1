# 英文單字卡網站與 Google Apps Script 後端設定說明

## 1. 前端：新增單字管理表單

### 1.1 更新 `index.html`
- 將網站改為「英文單字卡管理後台」。
- 新增一個表單，欄位包含：
  - 英文單字
  - 中文翻譯
  - 字根分析
  - 例句
  - 詞性
- 按鈕名稱為「儲存單字」。

### 1.2 更新 `styles.css`
- 新增表單風格、文字輸入框、按鈕與回饋訊息樣式。
- 讓表單在桌面與手機寬度下都可響應顯示。

### 1.3 更新 `script.js`
- 取得 `wordForm` 與 `formMessage` 元素。
- 綁定 `submit` 事件。
- 在送出前檢查「英文單字」與「中文翻譯」是否已填寫。
- 使用 `fetch()` 向 Google Apps Script Web App 發送 POST 請求。
- 請求 body 以 `JSON.stringify()` 傳送。
- 成功時顯示成功訊息並清空表單；失敗時顯示錯誤。

## 2. 後端：Google Apps Script 設定

### 2.1 建立 Google 試算表
1. 開啟 Google 試算表。
2. 新增工作表名稱為 `Words`。
3. 在第一列建立欄位標題：
   - Timestamp
   - English Word
   - Chinese Translation
   - Root Analysis
   - Example Sentence
   - Part of Speech
4. 取得試算表 ID，位於網址中 `https://docs.google.com/spreadsheets/d/THIS_ID/edit`。
   - 例如，你提供的試算表網址對應的 ID 為：`1bUQo0KHd0qMDoEQaCxGm4hNoc2a62YPhT_LxT2g6750`。

### 2.2 建立 Web App 腳本
1. 開啟 Google Apps Script（https://script.google.com）。
2. 建立新專案。
3. 將以下程式碼貼到 `Code.gs`：

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const sheetName = 'Words';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    if (!sheet) {
      throw new Error('找不到工作表：' + sheetName);
    }

    sheet.appendRow([
      new Date(),
      data.word || '',
      data.translation || '',
      data.rootAnalysis || '',
      data.example || '',
      data.partOfSpeech || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: '單字已儲存' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. 把 `YOUR_SPREADSHEET_ID` 換成第 2.1 步驟中取得的試算表 ID。

### 2.3 部署為 Web App
1. 在 Apps Script 編輯器中，選擇「部署」→「新增部署」。
2. 選擇「Web 應用程式」。
3. 設定：
   - 執行應用程式的身分：`我`。
   - 可存取的使用者：`任何人（即使未登入）`。
4. 部署後，複製 Web 應用程式 URL。

## 3. 前端與後端串接

### 3.1 設定 `script.js`
- 將 `scriptURL` 常數替換為您剛剛取得的 Apps Script Web App URL，例如：

```javascript
const scriptURL = 'https://script.google.com/macros/s/ABC123xyz/exec';
```

### 3.2 測試單字儲存流程
1. 開啟 `index.html` 網頁。
2. 在表單中填入：
   - 英文單字
   - 中文翻譯
   - 字根分析
   - 例句
   - 詞性
3. 按「儲存單字」。
4. 若成功，頁面會顯示「單字已成功儲存至 Google 試算表！」。
5. 打開 Google 試算表，確認新資料已新增到 `Words` 工作表。

## 4. 進階調整建議

- 若要新增欄位，可在表單與 `doPost` 函式中一併新增欄位與資料寫入順序。
- 若希望更安全，可在 Apps Script 加入驗證密鑰，前端送出時同時帶上密鑰欄位。
- 若想顯示已儲存資料，可在 Google Apps Script 中加入讀取功能，並透過另一個 `GET` API 提供前端查詢。

## 5. 注意事項

- Apps Script Web App URL 必須使用 `exec` 結尾。
- 請勿將實際的 `spreadsheetId` 與部署 URL 泄露給公開網站或未授權使用者。
- 若出現權限錯誤，請確認 Apps Script 部署時的存取設定為「任何人都可存取」。
