/**
 * 配置編輯器應用邏輯
 */

let currentConfig = null;

/**
 * 頁面載入時初始化
 */
window.onload = function () {
    loadDefaultConfig();
};

/**
 * 載入預設配置
 */
async function loadDefaultConfig() {
    try {
        const response = await fetch('./configs/default-config.json');
        currentConfig = await response.json();
        populateForm(currentConfig);
        renderFieldsList();
        updatePreview();
    } catch (error) {
        console.error('載入預設配置失敗:', error);
        alert('無法載入預設配置檔案');
    }
}

/**
 * 填充表單
 */
function populateForm(config) {
    document.getElementById('formTitle').value = config.formMeta.title || '';
    document.getElementById('formVersion').value = config.formMeta.version || '1.0';
    document.getElementById('liffId').value = config.formMeta.liffId || '';
    document.getElementById('lineOaId').value = config.formMeta.lineOaId || '';
    document.getElementById('gasUrl').value = config.formMeta.gasUrl || '';

    if (config.banner) {
        document.getElementById('bannerEnabled').checked = config.banner.enabled || false;
        document.getElementById('bannerUrl').value = config.banner.imageUrl || '';
        document.getElementById('bannerAlt').value = config.banner.altText || '';
    }
}

/**
 * 渲染欄位列表
 */
function renderFieldsList() {
    const container = document.getElementById('fieldsList');
    if (!currentConfig || !currentConfig.formFields) {
        container.innerHTML = '<p style="color: #999;">尚無欄位</p>';
        return;
    }

    let html = '';
    currentConfig.formFields.forEach((field, index) => {
        html += `
            <div class="field-item">
                <div>
                    <span class="field-item-title">${field.title}</span>
                    <span class="field-item-type">${getFieldTypeLabel(field.type)}</span>
                </div>
                <div class="field-controls">
                    <div class="toggle-switch ${field.enabled ? 'active' : ''}" 
                         onclick="toggleField(${index})"
                         title="${field.enabled ? '停用' : '啟用'}">
                    </div>
                    <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 12px;" 
                            onclick="editField(${index})">編輯</button>
                    <button class="btn btn-danger" style="padding: 4px 12px; font-size: 12px;" 
                            onclick="deleteField(${index})">刪除</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/**
 * 取得欄位類型標籤
 */
function getFieldTypeLabel(type) {
    const labels = {
        'text': '文字',
        'email': 'Email',
        'radio': '單選',
        'checkbox': '複選',
        'textarea': '文字區域',
        'remind-section': '提醒設定'
    };
    return labels[type] || type;
}

/**
 * 切換欄位啟用狀態
 */
function toggleField(index) {
    if (currentConfig && currentConfig.formFields[index]) {
        currentConfig.formFields[index].enabled = !currentConfig.formFields[index].enabled;
        renderFieldsList();
        updatePreview();
    }
}

/**
 * 編輯欄位
 */
function editField(index) {
    const field = currentConfig.formFields[index];
    const newTitle = prompt('欄位標題:', field.title);

    if (newTitle !== null && newTitle.trim() !== '') {
        field.title = newTitle.trim();

        // 如果是選項類型,允許編輯選項
        if (field.options && Array.isArray(field.options)) {
            const optionsStr = prompt('選項 (每行一個,用換行分隔):', field.options.join('\n'));
            if (optionsStr !== null) {
                field.options = optionsStr.split('\n').filter(opt => opt.trim() !== '');
            }
        }

        renderFieldsList();
        updatePreview();
    }
}

/**
 * 刪除欄位
 */
function deleteField(index) {
    if (confirm('確定要刪除此欄位嗎?')) {
        currentConfig.formFields.splice(index, 1);
        renderFieldsList();
        updatePreview();
    }
}

/**
 * 新增欄位
 */
function addField() {
    const type = prompt('欄位類型:\n1. text (文字)\n2. email (Email)\n3. radio (單選)\n4. checkbox (複選)\n5. textarea (文字區域)', 'text');

    if (!type) return;

    const title = prompt('欄位標題:', '新欄位');
    if (!title) return;

    const newField = {
        id: 'field_' + Date.now(),
        type: type,
        enabled: true,
        required: confirm('是否為必填欄位?'),
        title: title
    };

    // 根據類型添加額外屬性
    if (type === 'text' || type === 'email' || type === 'textarea') {
        newField.placeholder = prompt('佔位符文字 (可選):', '') || '';
    }

    if (type === 'radio' || type === 'checkbox') {
        const optionsStr = prompt('選項 (每行一個,用換行分隔):', '選項1\n選項2\n選項3');
        newField.options = optionsStr ? optionsStr.split('\n').filter(opt => opt.trim() !== '') : [];

        if (type === 'radio') {
            newField.layout = confirm('是否水平排列?') ? 'horizontal' : 'vertical';
        }
    }

    currentConfig.formFields.push(newField);
    renderFieldsList();
    updatePreview();
}

/**
 * 更新預覽
 */
function updatePreview() {
    // 收集當前表單數據
    const config = getCurrentConfig();

    // 將配置傳送到預覽 iframe
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame && previewFrame.contentWindow) {
        // 重新載入預覽頁面並傳遞配置
        const configJson = JSON.stringify(config);
        localStorage.setItem('preview_config', configJson);
        previewFrame.src = 'form-template.html?preview=true&t=' + Date.now();
    }
}

/**
 * 取得當前配置
 */
function getCurrentConfig() {
    if (!currentConfig) {
        currentConfig = {
            formMeta: {},
            banner: {},
            infoBlocks: [],
            formFields: []
        };
    }

    // 更新基本設定
    currentConfig.formMeta.title = document.getElementById('formTitle').value;
    currentConfig.formMeta.version = document.getElementById('formVersion').value;
    currentConfig.formMeta.liffId = document.getElementById('liffId').value;
    currentConfig.formMeta.lineOaId = document.getElementById('lineOaId').value;
    currentConfig.formMeta.gasUrl = document.getElementById('gasUrl').value;

    // 更新橫幅設定
    currentConfig.banner.enabled = document.getElementById('bannerEnabled').checked;
    currentConfig.banner.imageUrl = document.getElementById('bannerUrl').value;
    currentConfig.banner.altText = document.getElementById('bannerAlt').value;

    return currentConfig;
}

/**
 * 匯出 JSON
 */
function exportJSON() {
    const config = getCurrentConfig();
    const json = JSON.stringify(config, null, 2);

    // 建立下載連結
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    const filename = prompt('檔案名稱 (不含 .json):', 'my-event-config');
    if (!filename) return;

    a.href = url;
    a.download = filename + '.json';
    a.click();

    URL.revokeObjectURL(url);
    alert('配置已匯出！');
}

/**
 * 匯入 JSON
 */
function importJSON() {
    document.getElementById('fileInput').click();
}

/**
 * 處理檔案匯入
 */
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const config = JSON.parse(e.target.result);
            currentConfig = config;
            populateForm(config);
            renderFieldsList();
            updatePreview();
            alert('配置已成功匯入！');
        } catch (error) {
            console.error('解析 JSON 失敗:', error);
            alert('無效的 JSON 檔案');
        }
    };
    reader.readAsText(file);

    // 重置 input 以允許重複匯入同一檔案
    event.target.value = '';
}

/**
 * 載入配置
 */
async function loadConfig() {
    const configName = prompt('配置檔名稱 (不含 .json):', 'default-config');
    if (!configName) return;

    try {
        const response = await fetch(`./configs/${configName}.json`);
        if (!response.ok) {
            throw new Error('找不到配置檔');
        }

        currentConfig = await response.json();
        populateForm(currentConfig);
        renderFieldsList();
        updatePreview();
        alert('配置已載入！');
    } catch (error) {
        console.error('載入配置失敗:', error);
        alert('無法載入配置檔: ' + configName + '.json');
    }
}

// 修改 form-template.html 的載入邏輯以支援預覽模式
// 在 form-template.html 中添加以下程式碼:
/*
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('preview') === 'true') {
    const previewConfig = localStorage.getItem('preview_config');
    if (previewConfig) {
        const config = JSON.parse(previewConfig);
        const renderer = new FormRenderer(config);
        renderer.render('formContainer');
        // 預覽模式不初始化 LIFF
    }
} else {
    // 原有的載入邏輯
}
*/
