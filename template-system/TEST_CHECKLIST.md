# 測試檢查清單

## 📋 本地測試步驟

### 準備工作

#### 1. 啟動本地伺服器

選擇以下任一方式:

**方式 A: 使用 Python**
```bash
cd c:\Users\LESERVER\projects\HNPTC\RegistrationForm
python -m http.server 8000
```

**方式 B: 使用 VS Code Live Server**
1. 安裝 Live Server 擴充功能
2. 右鍵點擊 `config-editor.html`
3. 選擇 "Open with Live Server"

---

## ✅ 測試項目

### 測試 1: 配置編輯器基本功能

**測試網址**: `http://localhost:8000/template-system/config-editor.html`

- [ ] **頁面載入**
  - 編輯器正常顯示
  - 左右分欄布局正確
  - 無 JavaScript 錯誤

- [ ] **預設配置載入**
  - 表單標題顯示「頭頸專研活動報名表」
  - LIFF ID 已填入
  - 欄位列表顯示 6 個欄位

- [ ] **基本設定編輯**
  - 可以修改表單標題
  - 可以修改 LIFF ID
  - 可以修改 LINE OA ID
  - 可以修改 GAS URL

- [ ] **橫幅設定**
  - 可以切換「顯示橫幅」開關
  - 可以修改圖片網址
  - 可以修改替代文字

---

### 測試 2: 欄位管理功能

**測試網址**: `http://localhost:8000/template-system/config-editor.html`

- [ ] **欄位開關**
  - 點擊切換按鈕可啟用/停用欄位
  - 停用的欄位在預覽中不顯示
  - 切換後預覽即時更新

- [ ] **編輯欄位**
  - 點擊「編輯」按鈕可修改欄位標題
  - 可以修改選項內容 (針對 radio/checkbox)
  - 修改後預覽正確更新

- [ ] **新增欄位**
  - 點擊「+ 新增欄位」
  - 可以選擇欄位類型
  - 新欄位出現在列表中
  - 新欄位在預覽中顯示

- [ ] **刪除欄位**
  - 點擊「刪除」按鈕
  - 確認對話框出現
  - 確認後欄位被移除
  - 預覽中不再顯示該欄位

---

### 測試 3: 即時預覽功能

**測試網址**: `http://localhost:8000/template-system/config-editor.html`

- [ ] **預覽顯示**
  - 右側 iframe 正常載入
  - 顯示完整的表單
  - 樣式正確套用

- [ ] **預覽更新**
  - 點擊「🔄 更新預覽」按鈕
  - 預覽內容即時更新
  - 修改後的內容正確顯示

- [ ] **預覽互動**
  - 可以在預覽中填寫表單
  - 單選/複選功能正常
  - 提醒設定可展開

---

### 測試 4: 匯入匯出功能

**測試網址**: `http://localhost:8000/template-system/config-editor.html`

- [ ] **匯出 JSON**
  - 點擊「匯出 JSON」
  - 輸入檔案名稱
  - JSON 檔案成功下載
  - 檔案內容格式正確

- [ ] **匯入 JSON**
  - 點擊「匯入 JSON」
  - 選擇 JSON 檔案
  - 配置成功載入
  - 表單內容正確顯示

- [ ] **載入配置**
  - 點擊「載入配置」
  - 輸入 `default-config`
  - 配置成功載入
  - 輸入 `example-health-lecture`
  - 範例配置成功載入

---

### 測試 5: 動態表單渲染

**測試網址**: `http://localhost:8000/template-system/form-template.html?config=default-config`

- [ ] **頁面載入**
  - 表單正常顯示
  - 載入動畫消失
  - 無 JavaScript 錯誤

- [ ] **基本元素**
  - 版本號顯示
  - 表單標題顯示
  - 橫幅圖片顯示
  - 活動內容區塊顯示
  - 地點資訊顯示
  - Google 地圖連結可點擊

- [ ] **表單欄位**
  - 報名場次 (單選) 顯示
  - 姓名 (文字輸入) 顯示
  - 性別 (單選) 顯示
  - 年齡區段 (單選) 顯示
  - 從哪得知 (複選) 顯示
  - 提醒設定區塊顯示

---

### 測試 6: 表單互動功能

**測試網址**: `http://localhost:8000/template-system/form-template.html?config=default-config`

- [ ] **必填驗證**
  - 不填寫必填欄位點擊送出
  - 瀏覽器顯示驗證訊息
  - 無法送出表單

- [ ] **提醒設定互動**
  - 選擇「是」接收提醒
  - 提醒設定區塊展開
  - 選擇「否」
  - 提醒設定區塊收起

- [ ] **Line 提醒**
  - 勾選「Line 通知」
  - 「連結 Line 帳號」按鈕顯示
  - 取消勾選
  - 按鈕隱藏

- [ ] **Email 提醒**
  - 勾選「Email 通知」
  - Email 輸入框顯示
  - 取消勾選
  - 輸入框隱藏

---

### 測試 7: 範例配置

**測試網址**: `http://localhost:8000/template-system/form-template.html?config=example-health-lecture`

- [ ] **配置載入**
  - 表單標題為「2026年2月健康講座報名表」
  - 場次為 2 月日期
  - 顯示「聯絡電話」欄位
  - 顯示「感興趣的主題」欄位

- [ ] **欄位正確性**
  - 所有欄位正常顯示
  - 選項內容正確
  - 必填標記正確

---

### 測試 8: 錯誤處理

**測試網址**: `http://localhost:8000/template-system/form-template.html?config=non-existent`

- [ ] **配置不存在**
  - 顯示錯誤訊息
  - 顯示「載入失敗」畫面
  - 顯示配置檔名稱
  - 「重新載入」按鈕可用

---

## 🌐 GitHub Pages 測試 (部署後)

### 部署前準備

```bash
# 1. 查看所有變更
git status

# 2. 添加所有新檔案
git add .

# 3. 提交變更
git commit -m "新增樣板化表單系統 v1.0"

# 4. 推送到 GitHub
git push origin main
```

### 啟用 GitHub Pages

1. 進入 GitHub 儲存庫
2. Settings → Pages
3. Source: main branch
4. Save
5. 等待部署完成 (1-5 分鐘)

### 線上測試

- [ ] **編輯器可訪問**
  - `https://[USERNAME].github.io/RegistrationForm/template-system/config-editor.html`
  - 頁面正常載入
  - 功能正常運作

- [ ] **表單可訪問**
  - `https://[USERNAME].github.io/RegistrationForm/template-system/form-template.html?config=default-config`
  - 表單正常顯示
  - 所有功能正常

- [ ] **範例配置可訪問**
  - `https://[USERNAME].github.io/RegistrationForm/template-system/form-template.html?config=example-health-lecture`
  - 範例表單正常顯示

---

## 🔧 LIFF 整合測試 (需要 LINE 帳號)

### 前置作業

1. 建立 LINE LIFF 應用
2. 設定 Endpoint URL
3. 複製 LIFF ID
4. 更新配置檔中的 LIFF ID

### 測試項目

- [ ] **LIFF 初始化**
  - 在 LINE 中開啟 LIFF 連結
  - 頁面正常載入
  - 無錯誤訊息

- [ ] **LINE 登入**
  - 點擊「連結 Line 帳號」
  - LINE 登入畫面出現
  - 授權後返回表單
  - 顯示「您好 [姓名],Line 已連結」

- [ ] **資料提交**
  - 填寫完整表單
  - 點擊「送出報名」
  - 顯示「報名成功」畫面
  - Google Sheets 收到資料

---

## 📊 測試結果記錄

### 本地測試

| 測試項目 | 狀態 | 備註 |
|---------|------|------|
| 配置編輯器基本功能 | ⬜ 待測試 | |
| 欄位管理功能 | ⬜ 待測試 | |
| 即時預覽功能 | ⬜ 待測試 | |
| 匯入匯出功能 | ⬜ 待測試 | |
| 動態表單渲染 | ⬜ 待測試 | |
| 表單互動功能 | ⬜ 待測試 | |
| 範例配置 | ⬜ 待測試 | |
| 錯誤處理 | ⬜ 待測試 | |

### GitHub Pages 測試

| 測試項目 | 狀態 | 備註 |
|---------|------|------|
| 編輯器可訪問 | ⬜ 待測試 | |
| 表單可訪問 | ⬜ 待測試 | |
| 範例配置可訪問 | ⬜ 待測試 | |

### LIFF 整合測試

| 測試項目 | 狀態 | 備註 |
|---------|------|------|
| LIFF 初始化 | ⬜ 待測試 | |
| LINE 登入 | ⬜ 待測試 | |
| 資料提交 | ⬜ 待測試 | |

---

## 🐛 問題回報

如果發現問題,請記錄以下資訊:

1. **問題描述**: 
2. **重現步驟**: 
3. **預期結果**: 
4. **實際結果**: 
5. **瀏覽器**: 
6. **錯誤訊息** (如有): 

---

## ✅ 測試完成後

- [ ] 所有本地測試通過
- [ ] GitHub Pages 部署成功
- [ ] 線上版本功能正常
- [ ] LIFF 整合測試通過 (如適用)
- [ ] 文檔已更新
- [ ] 準備交付使用

---

**測試日期**: ___________  
**測試人員**: ___________  
**測試版本**: 1.0
