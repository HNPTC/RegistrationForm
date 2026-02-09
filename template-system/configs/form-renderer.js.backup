/**
 * 表單渲染引擎
 * 負責根據 JSON 配置動態生成表單
 */

class FormRenderer {
    constructor(config) {
        this.config = config;
        this.userProfile = { userId: '', displayName: '' };
        this.isGuest = true;
        this.isFriend = false; // 是否為官方帳號好友
        this.friendshipChecked = false; // 是否已檢查過好友狀態
    }

    /**
     * 初始化 LIFF
     */
    async initLiff() {
        if (!this.config.formMeta.liffId) {
            console.warn('未設定 LIFF ID');
            return;
        }

        try {
            await liff.init({ liffId: this.config.formMeta.liffId });

            // 還原表單資料
            this.restoreFormData();

            if (liff.isLoggedIn()) {
                this.isGuest = false;
                const profile = await liff.getProfile();
                this.userProfile.userId = profile.userId;
                this.userProfile.displayName = profile.displayName;

                // 檢查好友狀態
                await this.checkFriendshipStatus();

                this.updateLineStatusUI(true);
            } else {
                this.isGuest = true;
                this.isFriend = false;
                this.updateLineStatusUI(false);
            }
        } catch (err) {
            console.error('LIFF Init Error:', err);
            this.showStatus('系統初始化失敗,請重新整理。', 'error');
        }
    }

    /**
     * 渲染完整表單
     */
    render(containerId = 'formContainer') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('找不到容器元素:', containerId);
            return;
        }

        let html = '';

        // 版本號
        html += this.renderVersion();

        // 標題
        html += this.renderTitle();

        // 橫幅
        if (this.config.banner && this.config.banner.enabled) {
            html += this.renderBanner();
        }

        // 資訊區塊
        if (this.config.infoBlocks) {
            this.config.infoBlocks.forEach(block => {
                if (block.enabled) {
                    html += this.renderInfoBlock(block);
                }
            });
        }

        // 表單開始
        html += '<form id="mainForm">';

        // 表單欄位
        if (this.config.formFields) {
            this.config.formFields.forEach(field => {
                if (field.enabled) {
                    html += this.renderField(field);
                }
            });
        }

        // 提交按鈕
        html += this.renderSubmitButton();

        // 表單結束
        html += '</form>';

        // 狀態訊息
        html += '<div id="status"></div>';

        container.innerHTML = html;

        // 綁定事件
        this.bindEvents();
    }

    /**
     * 渲染版本號
     */
    renderVersion() {
        return `
            <div style="text-align: right; font-size: 12px; color: #aaa; margin-bottom: 0;">
                ${this.config.formMeta.title} ver${this.config.formMeta.version}
            </div>
        `;
    }

    /**
     * 渲染標題
     */
    renderTitle() {
        return `<h1>📝 ${this.config.formMeta.title}</h1>`;
    }

    /**
     * 渲染橫幅
     */
    renderBanner() {
        return `
            <div class="w-full mb-5">
                <img src="${this.config.banner.imageUrl}" 
                     alt="${this.config.banner.altText || '活動橫幅'}" 
                     class="w-full h-auto block rounded-lg">
            </div>
        `;
    }

    /**
     * 渲染資訊區塊
     */
    renderInfoBlock(block) {
        if (block.id === 'location') {
            return this.renderLocationBlock(block);
        }

        return `
            <div class="form-group">
                <div style="margin-bottom: 10px; font-weight: bold; color: #333; font-size: 1.05em; border-left: 4px solid var(--primary-color); padding-left: 8px;">
                    ${block.title}
                </div>
                <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff; line-height: 1.5;">
                    <div style="color: #666; font-size: 16px;">
                        ${block.content.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染地點區塊
     */
    renderLocationBlock(block) {
        return `
            <div class="form-group">
                <div style="margin-bottom: 10px; font-weight: bold; color: #333; font-size: 1.05em; border-left: 4px solid var(--primary-color); padding-left: 8px;">
                    ${block.title}
                </div>
                <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff; line-height: 1.5;">
                    <div style="font-weight: bold; font-size: 1.1em; color: #333; margin-bottom: 4px;">
                        ${block.placeName}
                    </div>
                    <div style="color: #666; font-size: 16px; margin-bottom: 10px;">
                        ${block.address}
                    </div>
                    ${block.showMap ? `
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(block.mapQuery)}" 
                           target="_blank" 
                           style="display: inline-flex; align-items: center; color: var(--primary-color); text-decoration: none; font-weight: bold; font-size: 0.9em; border: 1px solid var(--primary-color); padding: 6px 12px; border-radius: 20px;">
                            📍 開啟 Google 地圖
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * 渲染欄位
     */
    renderField(field) {
        switch (field.type) {
            case 'text':
            case 'email':
                return this.renderTextInput(field);
            case 'radio':
                return this.renderRadio(field);
            case 'checkbox':
                return this.renderCheckbox(field);
            case 'remind-section':
                return this.renderRemindSection(field);
            case 'textarea':
                return this.renderTextarea(field);
            default:
                console.warn('未知的欄位類型:', field.type);
                return '';
        }
    }

    /**
     * 渲染文字輸入
     */
    renderTextInput(field) {
        return `
            <div class="form-group">
                <label class="section-title" for="${field.id}">${field.title}${field.required ? '<span style="color: #e53935;"> *</span>' : ''}</label>
                <input type="${field.type}" 
                       id="${field.id}" 
                       placeholder="${field.placeholder || ''}" 
                       ${field.required ? 'required' : ''}>
            </div>
        `;
    }

    /**
     * 渲染單選
     */
    renderRadio(field) {
        const isHorizontal = field.layout === 'horizontal';
        const options = field.options.map((option, index) => `
            <label class="option-label" style="${isHorizontal ? 'flex:1' : ''}">
                <input type="radio" 
                       name="${field.id}" 
                       value="${option}" 
                       ${index === 0 && field.required ? 'required' : ''}>
                ${option}
            </label>
        `).join('');

        return `
            <div class="form-group">
                <label class="section-title">${field.title}${field.required ? '<span style="color: #e53935;"> *</span>' : ''}</label>
                <div class="radio-group" style="${isHorizontal ? 'flex-direction: row; gap: 20px;' : ''}">
                    ${options}
                </div>
            </div>
        `;
    }

    /**
     * 渲染複選
     */
    renderCheckbox(field) {
        const options = field.options.map(option => `
            <label class="option-label">
                <input type="checkbox" name="${field.id}" value="${option}">
                ${option}
            </label>
        `).join('');

        return `
            <div class="form-group">
                <label class="section-title">${field.title}${field.required ? '<span style="color: #e53935;"> *</span>' : ''}</label>
                <div class="checkbox-group">
                    ${options}
                </div>
            </div>
        `;
    }

    /**
     * 渲染文字區域
     */
    renderTextarea(field) {
        return `
            <div class="form-group">
                <label class="section-title" for="${field.id}">${field.title}${field.required ? '<span style="color: #e53935;"> *</span>' : ''}</label>
                <textarea id="${field.id}" 
                          placeholder="${field.placeholder || ''}" 
                          rows="4"
                          style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; box-sizing: border-box; font-family: inherit;"
                          ${field.required ? 'required' : ''}></textarea>
            </div>
        `;
    }

    /**
     * 渲染提醒設定區塊
     */
    renderRemindSection(field) {
        return `
            <div class="form-group">
                <label class="section-title">${field.title}${field.required ? '<span style="color: #e53935;"> *</span>' : ''}</label>
                <div class="radio-group" style="flex-direction: row; gap: 20px;">
                    <label class="option-label" style="flex:1">
                        <input type="radio" name="needRemind" value="是" onclick="window.toggleRemindSection(true)" ${field.required ? 'required' : ''}>
                        是
                    </label>
                    <label class="option-label" style="flex:1">
                        <input type="radio" name="needRemind" value="否" onclick="window.toggleRemindSection(false)">
                        否
                    </label>
                </div>

                <div id="remindDetails" class="remind-settings">
                    <div style="font-size: 0.9em; color: #666; margin-bottom: 10px;">請選擇至少一種提醒方式：</div>
                    
                    ${field.methods.line.enabled ? `
                    <div class="remind-sub-item">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" id="checkLine" onchange="window.toggleLineInput()">
                            <span style="font-weight: bold; margin-left: 5px;">Line 通知</span>
                        </label>
                        <div id="lineConnectArea" style="margin-top: 10px; display: none;">
                            <button type="button" id="btnLineLogin" class="connect-btn" onclick="window.handleLineLogin()">
                                加入 Line 好友並連結帳號
                            </button>
                            <span id="lineStatusText" class="line-status-text hidden"></span>
                        </div>
                    </div>
                    ` : ''}

                    ${field.methods.email.enabled ? `
                    <div class="remind-sub-item">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" id="checkEmail" onchange="window.toggleEmailInput()">
                            <span style="font-weight: bold; margin-left: 5px;">Email 通知</span>
                        </label>
                        <div id="emailInputArea" style="margin-top: 10px; display: none;">
                            <input type="email" id="emailInput" placeholder="請填寫您的 Email">
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * 渲染提交按鈕
     */
    renderSubmitButton() {
        return `
            <div class="action-area">
                <button type="button" id="btnSubmit" class="submit-btn" onclick="window.handleSubmit()">
                    送出報名
                </button>
            </div>
        `;
    }

    /**
     * 綁定事件
     */
    bindEvents() {
        // 將方法綁定到 window 供 HTML 使用
        window.toggleRemindSection = this.toggleRemindSection.bind(this);
        window.toggleLineInput = this.toggleLineInput.bind(this);
        window.toggleEmailInput = this.toggleEmailInput.bind(this);
        window.handleLineLogin = this.handleLineLogin.bind(this);
        window.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 切換提醒區域顯示
     */
    toggleRemindSection(show) {
        const div = document.getElementById('remindDetails');
        if (div) {
            div.style.display = show ? 'block' : 'none';

            if (!show) {
                const checkLine = document.getElementById('checkLine');
                const checkEmail = document.getElementById('checkEmail');
                if (checkLine) checkLine.checked = false;
                if (checkEmail) checkEmail.checked = false;
                this.toggleLineInput();
                this.toggleEmailInput();
            }
        }
    }

    /**
     * 切換 Line 連結按鈕顯示
     */
    toggleLineInput() {
        const isChecked = document.getElementById('checkLine')?.checked;
        const area = document.getElementById('lineConnectArea');
        if (area) {
            if (isChecked) {
                area.style.display = 'block';
                // 更新 UI 以反映當前的登入和好友狀態
                this.updateLineStatusUI(!this.isGuest);
            } else {
                area.style.display = 'none';
            }
        }
    }

    /**
     * 切換 Email 輸入框顯示
     */
    toggleEmailInput() {
        const isChecked = document.getElementById('checkEmail')?.checked;
        const area = document.getElementById('emailInputArea');
        if (area) {
            area.style.display = isChecked ? 'block' : 'none';
            if (isChecked) {
                document.getElementById('emailInput')?.focus();
            }
        }
    }

    /**
     * 檢查好友狀態 (呼叫 GAS API)
     */
    async checkFriendshipStatus() {
        if (!this.userProfile.userId || this.friendshipChecked) {
            return;
        }

        try {
            // 從配置中取得 GAS URL,並加上查詢參數
            const gasUrl = this.config.formMeta.gasUrl;
            const checkUrl = `${gasUrl}?action=checkFriendship&userId=${encodeURIComponent(this.userProfile.userId)}`;

            const response = await fetch(checkUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                this.isFriend = result.isFriend;
                this.friendshipChecked = true;
                console.log('好友狀態:', this.isFriend ? '已加好友' : '未加好友');
            } else {
                console.warn('好友狀態檢查失敗:', result.error);
                this.isFriend = false;
            }
        } catch (error) {
            console.error('好友狀態檢查錯誤:', error);
            this.isFriend = false;
        }
    }


    /**
     * 更新 Line 狀態 UI
     */
    updateLineStatusUI(isLoggedIn) {
        const btn = document.getElementById('btnLineLogin');
        const txt = document.getElementById('lineStatusText');

        // 除錯訊息
        console.log('=== updateLineStatusUI 除錯 ===');
        console.log('isLoggedIn:', isLoggedIn);
        console.log('this.isGuest:', this.isGuest);
        console.log('this.isFriend:', this.isFriend);
        console.log('this.friendshipChecked:', this.friendshipChecked);
        console.log('btn 存在:', !!btn);
        console.log('txt 存在:', !!txt);

        if (btn && txt) {
            if (isLoggedIn && this.isFriend) {
                // 已登入且已加好友
                console.log('→ 狀態: 已登入且已加好友 - 隱藏按鈕');
                btn.classList.add('hidden');
                txt.classList.remove('hidden');
                txt.innerText = `您好 ${this.userProfile.displayName},已加入好友並連結`;
            } else if (isLoggedIn && !this.isFriend) {
                // 已登入但未加好友
                console.log('→ 狀態: 已登入但未加好友 - 顯示按鈕');
                btn.classList.remove('hidden');
                txt.classList.add('hidden');
                btn.innerText = '加入 Line 好友並連結帳號';
            } else {
                // 未登入
                console.log('→ 狀態: 未登入 - 顯示按鈕');
                btn.classList.remove('hidden');
                txt.classList.add('hidden');
                btn.innerText = '加入 Line 好友並連結帳號';
            }
        }
    }

    /**
     * 處理 Line 登入
     */
    handleLineLogin() {
        // 儲存表單資料
        this.saveFormData();

        // 開啟加好友連結
        const lineOaId = this.config.formMeta.lineOaId || '@246trduk';
        const lineUrl = `https://line.me/R/ti/p/${lineOaId}`;

        liff.openWindow({
            url: lineUrl,
            external: true
        });

        // 延遲後執行登入或重新整理
        setTimeout(() => {
            if (!liff.isLoggedIn()) {
                // 未登入: 執行登入
                liff.login({ redirectUri: window.location.href });
            } else {
                // 已登入但未加好友: 重新整理以更新好友狀態
                window.location.reload();
            }
        }, 2000);
    }

    /**
     * 處理表單提交
     */
    async handleSubmit() {
        const form = document.getElementById('mainForm');

        // 基本驗證
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 收集表單資料
        const formData = this.collectFormData();

        // 自訂驗證
        if (!this.validateFormData(formData)) {
            return;
        }

        // 準備提交
        const btnSubmit = document.getElementById('btnSubmit');
        btnSubmit.disabled = true;
        btnSubmit.innerText = '資料傳送中...';

        try {
            await this.submitToGAS(formData);
            this.showSuccessView(formData);
        } catch (error) {
            console.error('Submit Error:', error);
            this.showStatus('❌ 傳送失敗,請檢查網路或稍後再試', 'error');
            btnSubmit.disabled = false;
            btnSubmit.innerText = '送出報名';
        }
    }

    /**
     * 收集表單資料
     */
    collectFormData() {
        const data = {
            uid: this.isGuest ? 'guest' : this.userProfile.userId,
            lineName: this.isGuest ? '' : this.userProfile.displayName
        };

        // 收集所有欄位
        this.config.formFields.forEach(field => {
            if (!field.enabled) return;

            switch (field.type) {
                case 'text':
                case 'email':
                case 'textarea':
                    const input = document.getElementById(field.id);
                    if (input) data[field.id] = input.value.trim();
                    break;

                case 'radio':
                    const radio = document.querySelector(`input[name="${field.id}"]:checked`);
                    if (radio) data[field.id] = radio.value;
                    break;

                case 'checkbox':
                    const checkboxes = document.querySelectorAll(`input[name="${field.id}"]:checked`);
                    data[field.id] = Array.from(checkboxes).map(cb => cb.value).join(', ');
                    break;

                case 'remind-section':
                    const needRemind = document.querySelector('input[name="needRemind"]:checked')?.value;
                    const checkLine = document.getElementById('checkLine')?.checked;
                    const checkEmail = document.getElementById('checkEmail')?.checked;
                    const emailVal = document.getElementById('emailInput')?.value.trim();

                    data.needRemind = needRemind;
                    data.lineRemind = (needRemind === '是' && checkLine) ? '是' : '否';
                    data.email = emailVal || '';
                    data.emailRemind = (needRemind === '是' && checkEmail) ? '是' : '否';

                    // 計算提醒日期
                    if (needRemind === '是' && data.session) {
                        const dateMatch = data.session.match(/(\d+)\/(\d+)/);
                        if (dateMatch) {
                            const year = new Date().getFullYear();
                            data.remindDate = `${year}-${dateMatch[1].padStart(2, '0')}-${dateMatch[2].padStart(2, '0')}`;
                        }
                    }
                    break;
            }
        });

        // 新增好友狀態
        data.isFriend = this.isFriend ? '是' : (this.isGuest ? '未登入' : '否');

        return data;
    }

    /**
     * 驗證表單資料
     */
    validateFormData(data) {
        // 驗證來源複選
        const sourceField = this.config.formFields.find(f => f.id === 'source' && f.enabled);
        if (sourceField && (!data.source || data.source === '')) {
            alert('請至少選擇一項「從哪得知」');
            return false;
        }

        // 驗證提醒設定
        if (data.needRemind === '是') {
            const checkLine = document.getElementById('checkLine')?.checked;
            const checkEmail = document.getElementById('checkEmail')?.checked;

            if (!checkLine && !checkEmail) {
                alert('接收提醒需至少勾選 Line 或 Email 其中一種方式喔！');
                return false;
            }

            if (checkLine) {
                if (this.isGuest) {
                    alert('Line 通知提醒,請點擊「加入 Line 好友並連結帳號」按鈕並完成操作。');
                    return false;
                }

                // 檢查是否已加好友
                if (!this.isFriend) {
                    alert('請先加入官方 Line 好友,才能接收 Line 通知提醒。\n\n請點擊「加入 Line 好友並連結帳號」按鈕完成加好友。');
                    return false;
                }
            }

            if (checkEmail && !data.email) {
                alert('Email 通知,請確實填寫 Email 欄位。');
                document.getElementById('emailInput')?.focus();
                return false;
            }
        }

        return true;
    }

    /**
     * 提交到 GAS
     */
    async submitToGAS(data) {
        await fetch(this.config.formMeta.gasUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * 顯示成功畫面
     */
    showSuccessView(data) {
        localStorage.removeItem('liff_form_temp');
        document.getElementById('formContainer').style.display = 'none';

        const successView = document.getElementById('successView');
        if (successView) {
            successView.classList.remove('hidden');
            if (data.needRemind === '是') {
                const remindMsg = document.getElementById('remindMsg');
                if (remindMsg) remindMsg.style.display = 'inline';
            }

            // 動態生成成功畫面內容
            const lineOaId = this.config.formMeta.lineOaId || '@246trduk';
            const lineUrl = `https://line.me/R/ti/p/${lineOaId}`;

            successView.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 10px;">✅</div>
                <h2 style="color: var(--primary-color); margin-top: 0;">報名成功！</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
                    我們已收到您的報名資訊。<br>
                    ${data.needRemind === '是' ? '<span style="color: #ff9800;">屆時將會發送提醒通知給您。</span>' : ''}
                </p>

                <div style="display: flex; flex-direction: column; gap: 15px; align-items: center;">
                    
                    <a href="${lineUrl}" target="_blank" style="text-decoration: none;">
                        <button style="
                            width: 280px;
                            background-color: #06c755; 
                            color: white; 
                            border: none; 
                            padding: 14px 0;
                            border-radius: 8px; 
                            font-size: 16px; 
                            font-weight: bold; 
                            cursor: pointer; 
                            box-shadow: 0 4px 10px rgba(6, 199, 85, 0.3);
                            display: flex; align-items: center; justify-content: center;
                        ">
                            <span style="font-size: 1.3em; margin-right: 8px;">💬</span>
                            加入官方帳號好友
                        </button>
                    </a>

                    <button onclick="liff.closeWindow()" style="
                        width: 280px;
                        background-color: #f0f0f0; 
                        color: #666; 
                        border: 1px solid #ddd; 
                        padding: 14px 0;
                        border-radius: 8px; 
                        font-size: 16px; 
                        font-weight: bold; 
                        cursor: pointer;
                        display: flex; align-items: center; justify-content: center;
                    ">
                        關閉視窗
                    </button>
                    
                </div>

                <p style="font-size: 12px; color: #aaa; margin-top: 20px;">
                    加入後如有疑問可直接傳訊諮詢
                </p>
            `;
        }
    }

    /**
     * 顯示狀態訊息
     */
    showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('status');
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.style.color = type === 'error' ? 'red' : '#666';
        }
    }

    /**
     * 儲存表單資料
     */
    saveFormData() {
        const formData = this.collectFormData();
        localStorage.setItem('liff_form_temp', JSON.stringify(formData));
    }

    /**
     * 還原表單資料
     */
    restoreFormData() {
        const saved = localStorage.getItem('liff_form_temp');
        if (!saved) return;

        try {
            const data = JSON.parse(saved);

            // 延遲還原,等待 DOM 渲染完成
            setTimeout(() => {
                Object.keys(data).forEach(key => {
                    const input = document.getElementById(key);
                    if (input) {
                        input.value = data[key];
                    }

                    // 還原單選
                    const radio = document.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.click();
                });
            }, 100);
        } catch (e) {
            console.error('Restore Error', e);
        }
    }
}

// 匯出供外部使用
window.FormRenderer = FormRenderer;
