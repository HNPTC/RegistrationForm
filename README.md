# 樣板化表單系統

一個視覺化的 LINE LIFF 表單配置系統,讓非技術人員也能輕鬆建立和管理活動報名表單。

## 專案特色

- 🎨 **圖形化編輯器** - 拖曳、點擊即可編輯表單
- 👀 **即時預覽** - 左側編輯,右側即時顯示效果
- 🔄 **欄位重複使用** - 預設欄位庫快速建立表單
- 📱 **LINE 整合** - 完整支援 LIFF 和 LINE 官方帳號
- 🌐 **GitHub Pages 部署** - 靜態網站,免費託管
- 💾 **配置版本控制** - Git 追蹤所有變更

## 目錄結構

```
RegistrationForm/
├── index.html                    # 原有表單 (保持不動)
├── template-system/              # 樣板系統
│   ├── config-editor.html        # 圖形化配置編輯器
│   ├── form-template.html        # 動態表單樣板
│   ├── form-renderer.js          # 表單渲染引擎
│   ├── editor-app.js             # 編輯器邏輯
│   ├── styles.css                # 共用樣式
│   └── configs/                  # 配置檔目錄
│       ├── default-config.json   # 預設配置
│       └── field-library.json    # 欄位庫
└── docs/                         # 文檔
    ├── implementation-plan.md    # 實作計畫
    ├── workflow.md               # 工作流程
    └── user-guide.md             # 使用指南
```

## 快速開始

### 非技術人員

1. **開啟編輯器**
   ```
   開啟 template-system/config-editor.html
   ```

2. **載入範本**
   - 點擊「載入範本」
   - 選擇 `default-config.json`

3. **編輯表單**
   - 修改標題、場次、欄位等
   - 右側即時預覽效果

4. **匯出配置**
   - 點擊「匯出 JSON」
   - 儲存檔案

5. **交付部署**
   - 將 JSON 檔案交給技術人員

### 技術人員

1. **部署配置**
   ```bash
   # 將 JSON 檔案放入 configs 目錄
   cp new-event.json template-system/configs/
   
   # 提交並推送
   git add template-system/configs/new-event.json
   git commit -m "新增活動配置"
   git push origin main
   ```

2. **取得表單連結**
   ```
   https://[USERNAME].github.io/RegistrationForm/template-system/form-template.html?config=new-event
   ```

3. **設定 LIFF**
   - 在 LINE Developers Console 設定 Endpoint URL

## 使用情境

### 情境 1: 建立新活動表單
1. 載入預設範本
2. 修改活動資訊和場次
3. 調整欄位 (開關、排序、編輯)
4. 匯出並部署

### 情境 2: 修改現有表單
1. 匯入現有配置
2. 進行必要修改
3. 匯出並替換原檔案

### 情境 3: 重複使用欄位
1. 從欄位庫選擇常用欄位
2. 快速建立表單
3. 微調後匯出

## 文檔

- **[實作計畫](docs/implementation-plan.md)** - 系統架構與技術細節
- **[工作流程](docs/workflow.md)** - 完整操作流程與常見問題
- **[使用指南](docs/user-guide.md)** - 編輯器使用說明與案例

## 系統需求

### 開發環境
- 現代瀏覽器 (Chrome, Firefox, Safari, Edge)
- 本地 HTTP Server (用於測試)
- Git (用於版本控制)

### 部署環境
- GitHub 帳號
- GitHub Pages 啟用
- LINE Developers 帳號 (用於 LIFF)
- Google 帳號 (用於 Apps Script)

## 技術架構

### 前端技術
- HTML5 + CSS3
- Vanilla JavaScript (無框架依賴)
- Tailwind CSS (CDN)
- LINE LIFF SDK

### 資料流程
```
使用者填寫表單
    ↓
LIFF 驗證 (可選)
    ↓
表單驗證
    ↓
提交到 Google Apps Script
    ↓
寫入 Google Sheets
```

### 配置載入
```
URL 參數 (?config=xxx)
    ↓
載入對應 JSON 配置
    ↓
動態渲染表單
    ↓
使用者互動
```

## 欄位類型

| 類型 | 說明 | 用途 |
|------|------|------|
| `text` | 文字輸入 | 姓名、備註 |
| `email` | Email 輸入 | Email 地址 |
| `radio` | 單選 | 性別、場次 |
| `checkbox` | 複選 | 從哪得知、興趣 |
| `remind-section` | 提醒設定 | Line/Email 提醒 |

## 配置檔格式

```json
{
  "formMeta": {
    "title": "表單標題",
    "liffId": "LIFF_ID",
    "lineOaId": "@OA_ID",
    "gasUrl": "GAS_URL"
  },
  "banner": {
    "enabled": true,
    "imageUrl": "圖片網址"
  },
  "formFields": [
    {
      "id": "fieldId",
      "type": "text|radio|checkbox|email|remind-section",
      "enabled": true,
      "required": true,
      "title": "欄位標題",
      "options": ["選項1", "選項2"]
    }
  ]
}
```

## 部署到 GitHub Pages

### 1. 啟用 Pages
```
Settings → Pages → Source: main branch → Save
```

### 2. 推送配置
```bash
git add .
git commit -m "更新配置"
git push origin main
```

### 3. 訪問表單
```
https://[USERNAME].github.io/[REPO]/template-system/form-template.html?config=[CONFIG_NAME]
```

## 常見問題

### Q: 可以同時運行多個活動嗎?
**A:** 可以!每個活動使用不同的配置檔和 URL 參數。

### Q: 修改配置後多久生效?
**A:** GitHub Pages 通常 1-5 分鐘內生效。

### Q: 非技術人員可以直接線上編輯嗎?
**A:** 目前需要本地編輯後匯出,未來可整合 GitHub API 實現線上編輯。

### Q: 如何備份配置?
**A:** Git 自動版本控制,也可定期下載 configs 目錄備份。

## 未來規劃

- [ ] 線上編輯功能 (整合 GitHub API)
- [ ] 主題系統 (多種視覺風格)
- [ ] 資料統計儀表板
- [ ] 自動化提醒排程
- [ ] 多語系支援
- [ ] 行動裝置編輯器優化

## 授權

本專案為內部使用,請勿公開分享配置檔中的 LIFF ID、LINE OA ID 和 GAS URL。

## 聯絡資訊

如有問題或建議,請聯絡技術團隊。

---

**版本**: 1.0  
**最後更新**: 2026-01-26
