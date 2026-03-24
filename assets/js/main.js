(() => {
  const PROJECT_TAG_LIBRARY = {
    RUBY_ON_RAILS: 'Ruby on Rails',
    HTML: 'HTML',
    CSS: 'CSS',
    JAVASCRIPT: 'Javascript',
    TURBO: 'Turbo(Hotwire)',
    OPENAI: 'OpenAI/ChatGPT',
    DATA: 'PostgreSQL',
    MAPBOX: 'Mapbox',
    STIMULUS: 'Stimulus JS',
    API: 'Rakuten API'
    };
  const PROJECTS = [
    {
      img: 'assets/images/wht.png',
      titleKey: 'projects.item1.title',
      descKey: 'projects.item1.desc',
      tags: [
        PROJECT_TAG_LIBRARY.RUBY_ON_RAILS,
        PROJECT_TAG_LIBRARY.HTML,
        PROJECT_TAG_LIBRARY.CSS,
        PROJECT_TAG_LIBRARY.JAVASCRIPT,
        PROJECT_TAG_LIBRARY.STIMULUS,
        PROJECT_TAG_LIBRARY.MAPBOX,
        PROJECT_TAG_LIBRARY.API,
        PROJECT_TAG_LIBRARY.DATA,
        PROJECT_TAG_LIBRARY.OPENAI,
      ],
      link: 'https://www.wheresmytofu.me/',
    },
    {
      img: 'assets/images/mkr.png',
      titleKey: 'projects.item2.title',
      descKey: 'projects.item2.desc',
      tags: [
        PROJECT_TAG_LIBRARY.RUBY_ON_RAILS,
        PROJECT_TAG_LIBRARY.HTML,
        PROJECT_TAG_LIBRARY.CSS,
        PROJECT_TAG_LIBRARY.JAVASCRIPT,
        PROJECT_TAG_LIBRARY.TURBO,
        PROJECT_TAG_LIBRARY.MAPBOX,
        PROJECT_TAG_LIBRARY.API,
        PROJECT_TAG_LIBRARY.DATA,
        PROJECT_TAG_LIBRARY.OPENAI,
      ],
      link: 'https://mai-kusuri-6f1cdb2a3fdb.herokuapp.com/',
    },
  ];

  const EXPERIENCE_DATA = [
    {
      titleKey: 'experience.item1.title',
      dateKey: 'experience.item1.date',
      descKey: 'experience.item1.desc',
      fallbackTitle: 'Ostays | Human Resources Manager'
    },
    {
      titleKey: 'experience.item2.title',
      dateKey: 'experience.item2.date',
      descKey: 'experience.item2.desc',
      fallbackTitle: 'Pfizer (via dMed) | Drug Safety Associate'
    }
  ];

  const EDUCATION_DATA = [
    {
      dateKey: 'education.event1.date',
      titleKey: 'education.event1.title',
      descKey: 'education.event1.desc',
      fallbackTitle: 'Le Wagon Tokyo - AI Software'
    },
    {
      dateKey: 'education.event2.date',
      titleKey: 'education.event2.title',
      descKey: 'education.event2.desc',
      fallbackTitle: 'Ritsumeikan University - MBA'
    },
    {
      dateKey: 'education.event3.date',
      titleKey: 'education.event3.title',
      descKey: 'education.event3.desc',
      fallbackTitle: 'Dalian Polytechnic University'
    }
  ];

  const TECH_STACK = [
    {
      category: 'Languages',
      items: [
        { name: 'Ruby', icon: 'fa-solid fa-gem' },
        { name: 'Javascript', icon: 'fa-brands fa-js' },
        { name: 'SQL', icon: 'fa-solid fa-database' },
        { name: 'HTML/CSS', icon: 'fas fa-code' },
      ],
    },
    {
      category: 'Frameworks & Libraries',
      items: [
        { name: 'Ruby on Rails', icon: 'fa-regular fa-gem' },
        { name: 'Stimulus JS', icon: 'fa-brands fa-js' },
        { name: 'Turbo(Hotwire)', icon: 'fa-solid fa-rocket' },
        { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap' },
      ],
    },
    {
      category: 'AI & APIs',
      items: [
        { name: 'Prompt engineering', icon: 'fa-solid fa-wand-magic-sparkles' },
        { name: 'OpenAI/ChatGPT', icon: 'fa-brands fa-openai' },
        { name: 'AI-powered feature design', icon: 'fa-solid fa-robot' },
      ],
    },
    {
      category: 'Tools',
      items: [
        { name: 'Git/Github', icon: 'fa-brands fa-github' },
        { name: 'Figma', icon: 'fa-brands fa-figma' },
        { name: 'Notion', icon: 'fa-brands fa-notion' },
      ],
    },
  ];

  const CONTACT_LINKS = [
    { icon: 'fa-solid fa-envelope', key: 'contact.email', link: 'mailto:starrr826@gmail.com' },
    { icon: 'fab fa-github', key: 'contact.github', link: 'https://github.com/starrr826-lgtm' },
    { icon: 'fa-brands fa-linkedin', key: 'contact.linkedin', link: 'https://www.linkedin.com/in/xing-liu-a8a967386/' },
  ];

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clear(el) {
    if (!el) return;
    el.innerHTML = '';
  }

  function t(key) {
    return window.i18n?.get ? window.i18n.get(key) : key;
  }

  function renderSpanTags(tags, className) {
    if (!Array.isArray(tags)) return '';
    return tags.map((tag) => `<span class="${className}">${tag}</span>`).join('');
  }

  function renderProjectTags(tags) {
    if (!Array.isArray(tags)) return '';
    return `<div class="project-tags">${renderSpanTags(tags, 'project-tag')}</div>`;
  }

  function initThemeToggle() {
    const toggleBtn = qs('.theme-toggle');
    const htmlEl = document.documentElement;
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);

    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      console.log(`[Theme] Switched to ${newTheme}`);
    });
  }

  function initLangToggle() {
    const toggleBtn = qs('.lang-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const current = window.i18n.currentLang();
      const next = current === 'en' ? 'zh' : 'en';
      console.log(`[Lang] Switching to ${next}...`);
      window.i18n.changeLang(next);
    });
  }

  function initProjects() {
    const grid = qs('.projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    PROJECTS.forEach((project) => {
      const tagsHtml = renderProjectTags(project.tags);

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="project-thumbnail-wrapper">
          <img src="${project.img}" alt="${t('projects.imgAlt')}" class="project-thumbnail">
        </div>
        <div class="project-info">
          <h3>${t(project.titleKey)}</h3>
          <p>${t(project.descKey)}</p>
          ${tagsHtml}
          <a href="${project.link}" class="project-link">${t('projects.viewDetail')}</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function initTechStack() {
    const container = qs('.skills-wrapper');
    if (!container) return;
    clear(container);

    TECH_STACK.forEach((group) => {
      const itemsHtml = group.items
        .map((s) => `<div class="skill-badge"><i class="${s.icon}"></i> ${s.name}</div>`)
        .join('');

      const col = document.createElement('div');
      col.className = 'skill-category';
      col.innerHTML = `<h3>${t(group.category)}</h3><div class="skill-list">${itemsHtml}</div>`;
      container.appendChild(col);
    });
  }

  function initContactLinks() {
    const container = qs('.intro-contact-links');
    if (!container) return;
    clear(container);

    CONTACT_LINKS.forEach((contact) => {
      const label = t(contact.key);
      const item = document.createElement('a');
      item.className = 'intro-contact-link';
      item.href = contact.link;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      item.title = label;
      item.setAttribute('aria-label', label);
      item.innerHTML = `<i class="${contact.icon}"></i>`;
      container.appendChild(item);
    });
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        let target;
        try {
          target = qs(href);
        } catch {
          return;
        }

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  function initRevealMotion() {
    const targets = [
      ...qsa('.projects-grid .card'),
      ...qsa('.experience-grid .experience-card'),
      ...qsa('.education-container .education-item'),
      ...qsa('.skills-wrapper .skill-category'),
    ];

    if (!targets.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    targets.forEach((el, index) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${(index % 6) * 60}ms`);
    });

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    targets.forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLangToggle();
    initSmoothScroll();
  });

  window.addEventListener('i18nLoaded', () => {
    console.log('[main] i18n loaded, rendering content...');
    initProjects();
    initTechStack();
    initContactLinks();
    initRevealMotion();
  });
})();
