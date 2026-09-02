(() => {
  const PROJECT_NAME = 'GYEOL 소개팅 매칭 플랫폼';
  const CASE_STUDY_URL = 'https://suaveforge.com/work/gyeol/';
  const CANONICAL_URL = `${location.origin}${location.pathname}`;

  const upsertMeta = (name, content, attr = 'name') => {
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  upsertMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  upsertMeta('author', 'SuaveForge');
  if (!document.title.includes('SuaveForge')) document.title = `${document.title} | SuaveForge 프로젝트`;
  const desc = document.head.querySelector('meta[name="description"]');
  if (desc && !desc.content.includes('SuaveForge')) desc.content = `${desc.content} SuaveForge 제작 프로젝트.`;

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = CANONICAL_URL;

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.dataset.suaveforgeBrand = 'true';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: PROJECT_NAME,
    url: CANONICAL_URL,
    creator: { '@type': 'Organization', name: 'SuaveForge', url: 'https://suaveforge.com/' },
    isPartOf: { '@type': 'CreativeWork', url: CASE_STUDY_URL }
  });
  document.head.appendChild(schema);

  ready(() => {
    if (document.querySelector('[data-suaveforge-brand="signature"]')) return;
    const link = document.createElement('a');
    link.dataset.suaveforgeBrand = 'signature';
    link.href = CASE_STUDY_URL;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', 'SuaveForge 프로젝트 케이스 스터디');
    link.style.cssText = 'display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none;font:inherit;line-height:1;white-space:nowrap;opacity:.78;transition:opacity .15s ease';
    link.onmouseenter = () => { link.style.opacity = '1'; };
    link.onmouseleave = () => { link.style.opacity = '.78'; };

    const shell = document.createElement('span');
    shell.style.cssText = 'display:inline-flex;width:26px;height:26px;align-items:center;justify-content:center;border-radius:7px;background:#0b0c0f;box-shadow:inset 0 0 0 1px rgba(127,127,127,.18);overflow:hidden;flex:0 0 auto';
    const img = document.createElement('img');
    img.src = 'https://suaveforge.com/assets/logo-motion/suaveforge-logo-final.svg?v=20260828-34';
    img.alt = '';
    img.width = 22;
    img.height = 22;
    img.style.cssText = 'display:block;width:22px;height:22px';
    shell.appendChild(img);

    const word = document.createElement('strong');
    word.textContent = 'SuaveForge';
    word.style.cssText = 'font-size:13px;font-weight:850;letter-spacing:-.03em;color:inherit';
    link.append(shell, word);

    const footer = document.querySelector('footer');
    if (footer) {
      const holder = document.createElement('span');
      holder.dataset.suaveforgeBrand = 'true';
      holder.style.cssText = 'display:inline-flex;align-items:center;margin-left:auto;padding-left:14px';
      holder.appendChild(link);
      footer.appendChild(holder);
    } else {
      const holder = document.createElement('div');
      holder.dataset.suaveforgeBrand = 'true';
      holder.style.cssText = 'display:flex;justify-content:center;align-items:center;width:100%;box-sizing:border-box;padding:14px 18px 18px;color:inherit;background:transparent';
      holder.appendChild(link);
      document.body.appendChild(holder);
    }
  });
})();