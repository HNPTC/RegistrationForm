# 樣板表單系統工作流程

## 目錄
- [非技術人員操作流程](#非技術人員操作流程)
- [技術人員操作流程](#技術人員操作流程)
- [GitHub 部署流程](#github-部署流程)
- [常見問題](#常見問題)

---

## 非技術人員操作流程

### 情境 1: 建立新活動表單

#### 步驟:
1. **開啟編輯器**
   - 在瀏覽器中開啟 `template-system/config-editor.html`
   - 或訪問線上版本: `https://yourusername.github.io/RegistrationForm/template-system/config-editor.html`

2. **載入基礎範本**
   - 點擊「載入範本」按鈕
   - 選擇 `default-config.json` 作為起點

3. **編輯基本設定**
   - 修改表單標題 (例: "2026年2月健康講座報名表")
   - 更新 LIFF ID (如果有新的 LIFF 應用)
   - 更新 LINE OA ID (如果使用不同的官方帳號)
   - 更新 GAS URL (如果使用不同的 Google Apps Script)

4. **修改橫幅圖片**
   - 在「橫幅設定」區塊
   - 貼上新的圖片網址
   - 或點擊「停用橫幅」隱藏圖片

5. **編輯活動資訊**
   - 修改「活動內容」文字
   - 更新「地點」資訊
   - 調整「場次」選項 (新增、刪除或修改時間)

6. **調整表單欄位**
   - **開關欄位**: 點擊欄位右側的切換按鈕
   - **調整順序**: 拖曳欄位上下移動
   - **編輯欄位**: 點擊「編輯」按鈕修改標題或選項
   - **新增欄位**: 點擊「+ 新增欄位」或從欄位庫選擇

7. **即時預覽**
   - 右側預覽區會即時顯示表單外觀
   - 確認所有內容正確無誤

8. **匯出配置**
   - 點擊「匯出 JSON」按鈕
   - 儲存檔案為 `event-2026-02.json`

9. **交付給技術人員**
   - 將 JSON 檔案傳送給技術人員
   - 或自行上傳到 GitHub (需學習 Git 操作)

---

### 情境 2: 修改現有表單

#### 步驟:
1. **開啟編輯器**
   - 開啟 `config-editor.html`

2. **匯入現有配置**
   - 點擊「匯入 JSON」按鈕
   - 選擇要修改的配置檔 (例: `event-2026-01.json`)

3. **進行修改**
   - 按照「情境 1」的步驟 3-7 進行編輯

4. **匯出並替換**
   - 匯出 JSON 檔案
   - 使用相同檔名覆蓋原檔案
   - 交付給技術人員更新

---

### 情境 3: 使用欄位庫快速建立表單

#### 步驟:
1. **開啟編輯器並建立空白表單**
   - 或載入最小範本

2. **從欄位庫新增欄位**
   - 點擊「從欄位庫新增」
   - 瀏覽可用欄位:
     - **基本資訊**: 姓名、性別、電話、Email
     - **人口統計**: 年齡區段
     - **行銷**: 從哪得知

3. **選擇並新增**
   - 勾選需要的欄位
   - 點擊「新增到表單」
   - 欄位會自動加入到表單中

4. **調整與匯出**
   - 調整欄位順序
   - 修改必要內容
   - 匯出 JSON

---

## 技術人員操作流程

### 初次設定

#### 1. 建立 LIFF 應用
```
1. 登入 LINE Developers Console
2. 建立新的 LIFF 應用
3. 設定 Endpoint URL: https://yourusername.github.io/RegistrationForm/template-system/form-template.html
4. 複製 LIFF ID
```

#### 2. 設定 Google Apps Script
```
1. 建立新的 Google Sheets
2. 建立 Apps Script 專案
3. 部署為 Web App
4. 複製部署 URL
```

#### 3. 更新預設配置
```json
// 在 default-config.json 中更新
{
  "formMeta": {
    "liffId": "YOUR_LIFF_ID",
    "lineOaId": "@YOUR_OA_ID",
    "gasUrl": "YOUR_GAS_URL"
  }
}
```

---

### 部署新配置

#### 方法 1: 使用 Git 命令列

```bash
# 1. 接收非技術人員提供的 JSON 檔案
# 2. 將檔案放入 configs 目錄
cp event-2026-02.json template-system/configs/

# 3. 提交變更
git add template-system/configs/event-2026-02.json
git commit -m "新增 2026年2月活動配置"

# 4. 推送到 GitHub
git push origin main

# 5. 等待 GitHub Pages 部署 (通常 1-2 分鐘)
```

#### 方法 2: 使用 GitHub 網頁介面

```
1. 訪問 GitHub 儲存庫
2. 進入 template-system/configs/ 目錄
3. 點擊 "Add file" → "Upload files"
4. 拖曳 JSON 檔案上傳
5. 填寫 Commit message
6. 點擊 "Commit changes"
```

---

### 測試流程

#### 本地測試
```bash
# 1. 使用 Live Server 或 Python HTTP Server
python -m http.server 8000

# 2. 開啟瀏覽器訪問
http://localhost:8000/template-system/form-template.html?config=event-2026-02

# 3. 測試項目:
# - 表單渲染正確
# - LIFF 登入功能
# - 資料提交到 GAS
# - 提醒功能設定
```

#### 線上測試
```
1. 推送到 GitHub 後訪問:
   https://yourusername.github.io/RegistrationForm/template-system/form-template.html?config=event-2026-02

2. 使用 LINE 開啟 LIFF 連結測試完整流程

3. 檢查 Google Sheets 是否正確接收資料
```

---

## GitHub 部署流程

### 啟用 GitHub Pages

#### 步驟:
```
1. 進入 GitHub 儲存庫設定
2. 點擊 "Pages" 選項
3. Source 選擇 "main" 分支
4. 資料夾選擇 "/ (root)"
5. 點擊 "Save"
6. 等待部署完成
```

### 取得表單連結

#### 格式:
```
https://[USERNAME].github.io/[REPO_NAME]/template-system/form-template.html?config=[CONFIG_NAME]
```

#### 範例:
```
https://leserver.github.io/RegistrationForm/template-system/form-template.html?config=event-2026-01
```

### 設定 LIFF Endpoint

```
1. 回到 LINE Developers Console
2. 編輯 LIFF 應用
3. 更新 Endpoint URL 為上述連結
4. 儲存變更
```

---

## 常見問題

### Q1: 如何在不同活動間切換?

**A:** 透過 URL 參數 `?config=` 指定不同的配置檔:
```
活動1: ?config=event-2026-01
活動2: ?config=event-2026-02
預設: ?config=default-config (或不帶參數)
```

---

### Q2: 修改配置後多久生效?

**A:** 
- **本地測試**: 立即生效 (重新整理頁面)
- **GitHub Pages**: 推送後 1-5 分鐘內生效

---

### Q3: 可以同時運行多個活動嗎?

**A:** 可以！每個活動使用不同的配置檔和 URL:
```
活動A: form-template.html?config=event-a
活動B: form-template.html?config=event-b
活動C: form-template.html?config=event-c
```

---

### Q4: 如何備份配置?

**A:** 
1. **Git 版本控制**: 所有變更都有歷史紀錄
2. **本地備份**: 定期下載 `configs/` 目錄
3. **雲端備份**: 將 JSON 檔案上傳到 Google Drive

---

### Q5: 非技術人員可以直接線上編輯嗎?

**A:** 
- **目前方案**: 需要本地編輯 → 匯出 → 交付技術人員
- **進階方案**: 可整合 GitHub API 實現線上編輯 (需額外開發)

---

### Q6: 如何新增自訂欄位類型?

**A:** 需要技術人員修改 `form-renderer.js`:
```javascript
// 在 renderField() 函數中新增 case
case 'custom-type':
  return renderCustomField(field);
```

---

### Q7: 配置檔案損壞怎麼辦?

**A:** 
1. 使用 JSON 驗證工具檢查語法: https://jsonlint.com/
2. 從 Git 歷史還原上一個版本
3. 重新從 `default-config.json` 開始編輯

---

### Q8: 如何追蹤誰修改了配置?

**A:** 查看 Git commit 歷史:
```bash
git log template-system/configs/event-2026-01.json
```

---

## 快速參考

### 檔案對照表

| 檔案 | 用途 | 誰使用 |
|------|------|--------|
| `config-editor.html` | 圖形化編輯器 | 非技術人員 |
| `form-template.html` | 實際表單頁面 | 使用者填寫 |
| `*.json` | 配置檔 | 系統讀取 |
| `field-library.json` | 欄位庫 | 編輯器參考 |

### URL 參數說明

| 參數 | 說明 | 範例 |
|------|------|------|
| `config` | 指定配置檔名稱 (不含 .json) | `?config=event-2026-01` |

### Git 常用指令

```bash
# 查看狀態
git status

# 新增檔案
git add template-system/configs/new-event.json

# 提交變更
git commit -m "新增活動配置"

# 推送到 GitHub
git push origin main

# 查看歷史
git log --oneline

# 還原檔案
git checkout HEAD -- template-system/configs/event.json
```
