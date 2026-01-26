# 快速開始指南

## 🎯 系統已建立完成!

樣板化表單系統已經建立完成,包含以下核心功能:

### ✅ 已完成的功能

1. **JSON 配置系統**
   - `default-config.json` - 預設配置範本
   - `field-library.json` - 可重複使用的欄位庫

2. **表單渲染引擎** (`form-renderer.js`)
   - 動態渲染表單
   - LIFF 整合
   - 表單驗證與提交

3. **動態表單頁面** (`form-template.html`)
   - 透過 URL 參數載入配置
   - 支援預覽模式

4. **圖形化配置編輯器** (`config-editor.html`)
   - 視覺化編輯介面
   - 即時預覽
   - 匯入/匯出 JSON

---

## 🚀 如何使用

### 方法 1: 本地測試 (推薦先測試)

#### 1. 啟動本地伺服器

使用 Python (如果已安裝):
```bash
cd c:\Users\LESERVER\projects\HNPTC\RegistrationForm
python -m http.server 8000
```

或使用 VS Code 的 Live Server 擴充功能。

#### 2. 開啟編輯器

在瀏覽器中訪問:
```
http://localhost:8000/template-system/config-editor.html
```

#### 3. 編輯配置

- 修改表單標題、LIFF ID 等基本設定
- 調整欄位 (開關、編輯、刪除)
- 查看右側即時預覽

#### 4. 匯出配置

- 點擊「匯出 JSON」
- 儲存為 `my-event.json`
- 將檔案放入 `template-system/configs/` 目錄

#### 5. 測試表單

訪問:
```
http://localhost:8000/template-system/form-template.html?config=my-event
```

---

### 方法 2: 部署到 GitHub Pages

#### 1. 推送到 GitHub

```bash
cd c:\Users\LESERVER\projects\HNPTC\RegistrationForm

# 查看變更
git status

# 添加所有新檔案
git add .

# 提交
git commit -m "新增樣板化表單系統"

# 推送
git push origin main
```

#### 2. 啟用 GitHub Pages

1. 進入 GitHub 儲存庫設定
2. 點擊 "Pages"
3. Source 選擇 "main" 分支
4. 點擊 "Save"
5. 等待部署完成 (約 1-2 分鐘)

#### 3. 取得連結

表單連結格式:
```
https://[USERNAME].github.io/RegistrationForm/template-system/form-template.html?config=default-config
```

編輯器連結:
```
https://[USERNAME].github.io/RegistrationForm/template-system/config-editor.html
```

---

## 📝 建立新活動表單的流程

### 步驟 1: 開啟編輯器
```
本地: http://localhost:8000/template-system/config-editor.html
線上: https://[USERNAME].github.io/RegistrationForm/template-system/config-editor.html
```

### 步驟 2: 載入範本
點擊「載入配置」→ 輸入 `default-config`

### 步驟 3: 修改內容
- **基本設定**: 更新標題、LIFF ID、LINE OA ID
- **橫幅**: 更換圖片網址
- **欄位**: 調整場次、開關不需要的欄位

### 步驟 4: 匯出 JSON
點擊「匯出 JSON」→ 儲存為 `event-2026-02.json`

### 步驟 5: 部署
將 JSON 檔案放入 `template-system/configs/` 並推送到 GitHub

### 步驟 6: 使用表單
訪問: `form-template.html?config=event-2026-02`

---

## 🔧 設定 LIFF

### 1. 建立 LIFF 應用

1. 登入 [LINE Developers Console](https://developers.line.biz/)
2. 選擇您的 Provider
3. 選擇 Channel (或建立新的 Messaging API Channel)
4. 進入 "LIFF" 頁籤
5. 點擊 "Add"

### 2. 設定 LIFF

- **LIFF app name**: 活動報名表單
- **Size**: Full
- **Endpoint URL**: 
  ```
  https://[USERNAME].github.io/RegistrationForm/template-system/form-template.html?config=your-event
  ```
- **Scopes**: 勾選 `profile`
- **Bot link feature**: 選擇 On (Normal)

### 3. 複製 LIFF ID

建立後會得到 LIFF ID (例: `2008806287-9a1hHluF`)

### 4. 更新配置

在編輯器中將 LIFF ID 填入「基本設定」區塊

---

## 📊 設定 Google Apps Script

### 1. 建立 Google Sheets

建立新的 Google Sheets 作為資料庫

### 2. 建立 Apps Script

1. 在 Sheets 中點擊「擴充功能」→「Apps Script」
2. 貼上接收資料的程式碼 (參考原有的 GAS 程式碼)
3. 部署為 Web App
4. 複製部署 URL

### 3. 更新配置

在編輯器中將 GAS URL 填入「基本設定」區塊

---

## 🎨 自訂欄位

### 新增欄位

1. 在編輯器中點擊「+ 新增欄位」
2. 選擇欄位類型
3. 填寫標題和選項
4. 更新預覽確認

### 編輯欄位

1. 點擊欄位右側的「編輯」按鈕
2. 修改標題或選項
3. 儲存

### 停用欄位

點擊欄位右側的切換按鈕 (綠色 = 啟用,灰色 = 停用)

---

## 📂 檔案結構說明

```
template-system/
├── config-editor.html      # 圖形化編輯器
├── form-template.html      # 動態表單頁面
├── form-renderer.js        # 渲染引擎
├── editor-app.js           # 編輯器邏輯
└── configs/
    ├── default-config.json # 預設配置
    └── field-library.json  # 欄位庫
```

---

## ❓ 常見問題

### Q: 預覽區沒有更新?
**A**: 點擊「🔄 更新預覽」按鈕手動更新

### Q: 如何修改活動內容和地點?
**A**: 目前需要直接編輯 JSON 檔案,未來版本會加入編輯器支援

### Q: 可以新增自訂欄位類型嗎?
**A**: 可以,但需要修改 `form-renderer.js` 中的 `renderField()` 方法

### Q: 如何備份配置?
**A**: 使用「匯出 JSON」功能定期下載備份

---

## 📖 更多資訊

- **實作計畫**: `docs/implementation-plan.md`
- **工作流程**: `docs/workflow.md`
- **使用指南**: `docs/user-guide.md`
- **專案說明**: `README.md`

---

## 🎉 下一步

1. **本地測試**: 啟動本地伺服器測試編輯器和表單
2. **建立範例**: 建立一個測試活動配置
3. **部署測試**: 推送到 GitHub 並測試線上版本
4. **設定 LIFF**: 建立 LIFF 應用並測試完整流程

祝您使用愉快! 🚀
