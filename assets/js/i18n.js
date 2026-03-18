(() => {
  let langData = null;
  let currentLang = localStorage.getItem('lang') || 'en';

  function getNestedValue(obj, key) {
    if (!obj) return undefined;
    return key.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  function applyTranslation(el, key, value) {
    if (!value || value === key) return;
    if (el instanceof HTMLImageElement) {
      el.setAttribute('alt', value);
      return;
    }
    el.innerHTML = value;
  }

  // 更新 HTML 模板中写死 data-i18n 的部分
  function updateStaticElements() {
    let count = 0;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = getNestedValue(langData, key) || key;
      applyTranslation(el, key, text);
      count++;
    });

    const toggleBtn = document.querySelector('.lang-toggle');
    if (toggleBtn) {
      // 按钮显示“下一个”语言的名字
      toggleBtn.textContent = currentLang === 'en' ? '日本語' : 'English';
    }
    console.log(`[i18n] 静态元素更新完毕: ${count} 处`);
  }

  async function loadLang(lang) {
    const url = `./lang/${lang}.json?t=${new Date().getTime()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      langData = await res.json();

      currentLang = lang;
      localStorage.setItem('lang', lang);

      // 1. 先更新 HTML 里的静态文字
      updateStaticElements();

      // 2. 发出信号，让 main.js 重新渲染 JS 生成的卡片
      window.dispatchEvent(new CustomEvent('i18nLoaded', { detail: lang }));

      console.log(`[i18n] 语言包加载成功: ${lang}`);
    } catch (err) {
      console.error('❌ [i18n] 加载失败:', err);
    }
  }

  window.i18n = {
    get: (key) => getNestedValue(langData, key) || key,
    changeLang: (lang) => loadLang(lang),
    currentLang: () => currentLang,
  };

  // 初始加载
  document.addEventListener('DOMContentLoaded', () => {
    loadLang(currentLang);
  });
})();
