
import { PortfolioData, SectionKey } from '../../types';
import { getFontImports, getFontFamilies } from './fontHelper';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateModernHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const { bodyFont, headingFont } = getFontFamilies(themeSettings.fontPair);
  const isDarkMode = themeSettings.mode === 'dark';

  const css = `
    :root {
      --primary-color: ${sanitize(themeSettings.primaryColor)};
      --font-body: ${bodyFont};
      --font-heading: ${headingFont};
      --color-bg: ${isDarkMode ? '#111827' : '#ffffff'};
      --color-text: ${isDarkMode ? '#d1d5db' : '#374151'};
      --color-heading: ${isDarkMode ? '#ffffff' : '#111827'};
      --color-card-bg: ${isDarkMode ? '#1f2937' : '#f3f4f6'};
      --color-border: ${isDarkMode ? '#374151' : '#e5e7eb'};
    }
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
    }
    .container { max-width: 56rem; margin: 0 auto; padding: 2rem; }
    @media (min-width: 768px) { .container { padding: 4rem 2rem; } }

    header { text-align: center; margin-bottom: 5rem; }
    header img { width: 9rem; height: 9rem; border-radius: 9999px; object-fit: cover; margin: 0 auto; border: 4px solid var(--primary-color); box-shadow: 0 0 0 4px var(--color-bg), 0 0 0 8px var(--primary-color); }
    header h1 { font-family: var(--font-heading); font-size: 3.75rem; font-weight: 800; margin: 1.5rem 0 0.5rem; color: var(--color-heading); }
    header .tagline { font-size: 1.5rem; font-weight: 500; color: var(--primary-color); margin: 0; }
    header .socials { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1.5rem; }
    .social-link { color: var(--color-text); font-weight: 600; text-decoration: none; position: relative; transition: color 0.3s; }
    .social-link:hover { color: var(--primary-color); }
    
    main { display: grid; gap: 5rem; }
    
    .section-title {
        font-family: var(--font-heading);
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 2rem;
        position: relative;
        display: inline-block;
        color: var(--color-heading);
    }
    .section-title::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60%;
        height: 4px;
        background-color: var(--primary-color);
    }

    #profile p { font-size: 1.125rem; line-height: 1.7; font-weight: 500; }

    #skills .skills-container { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .skill-tag { background-color: var(--color-card-bg); border: 1px solid var(--color-border); padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; }
    
    .timeline { position: relative; border-left: 2px solid var(--primary-color); padding-left: 3rem; display: grid; gap: 3rem; }
    .timeline-item { position: relative; }
    .timeline-dot { position: absolute; left: -3.55rem; top: 0.25rem; width: 1.25rem; height: 1.25rem; background-color: var(--color-bg); border: 3px solid var(--primary-color); border-radius: 9999px; }
    .timeline-item .duration { position: absolute; left: -2.5rem; top: 0.25rem; font-size: 0.875rem; opacity: 0.7; transform: rotate(-90deg); transform-origin: left top; font-weight: bold; white-space: nowrap; width: 5rem; text-align: center; }
    .timeline-item h3 { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--color-heading); margin: 0; }
    .timeline-item .company { font-size: 1rem; font-weight: 600; color: var(--primary-color); margin: 0.25rem 0 0.5rem 0; }
    .timeline-item p { margin: 0; opacity: 0.9; }
    
    #projects .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .project-card { display: block; text-decoration: none; color: inherit; background-color: var(--color-card-bg); border-radius: 0.75rem; border: 1px solid var(--color-border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05); transition: all 0.3s ease-in-out; }
    .project-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px hsla(from var(--primary-color) h s l / 0.1), 0 4px 6px -4px hsla(from var(--primary-color) h s l / 0.1); border-color: hsla(from var(--primary-color) h s l / 0.5); }
    .project-card img { width: 100%; height: 14rem; object-fit: cover; border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; }
    .project-card .info { padding: 1.5rem; }
    .project-card h3 { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--color-heading); margin: 0 0 0.5rem 0; }
    .project-card p { font-size: 0.875rem; opacity: 0.9; margin: 0; }

    #education .education-list { display: grid; gap: 1.5rem; }
    .education-item { border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; }
    .education-item:last-child { border-bottom: none; }
    .education-item .header { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.5rem; }
    @media (min-width: 640px) {
        .education-item .header { flex-direction: row; justify-content: space-between; align-items: baseline; }
    }
    .education-item h3 { font-size: 1.25rem; font-weight: 700; color: var(--color-heading); margin: 0; }
    .education-item .duration { font-size: 0.875rem; opacity: 0.7; font-weight: 600; background: var(--color-card-bg); padding: 0.25rem 0.5rem; border-radius: 0.25rem; display: inline-block; }
    .education-item .degree { font-size: 1rem; font-weight: 500; }
    
    #contact { text-align: center; }
    #contact p { font-size: 1.125rem; max-width: 48rem; margin: 0 auto 2rem; opacity: 0.9; font-weight: 500; }
    .contact-btn { display: inline-block; background-color: var(--primary-color); color: ${isDarkMode ? '#000' : '#fff'}; padding: 0.875rem 2.5rem; border-radius: 0.5rem; font-size: 1.125rem; font-weight: 600; text-decoration: none; transition: all 0.2s ease; }
    .contact-btn:hover { transform: scale(1.05); }

    footer { text-align: center; margin-top: 6rem; padding-top: 2rem; border-top: 2px dashed var(--color-border); }
    footer p { opacity: 0.6; font-size: 0.875rem; }
  `;
  
  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `<section id="profile"><h2 class="section-title">About Me</h2><p>${sanitize(data.bio)}</p></section>`,
    passion: () => ``,
    skills: () => `<section id="skills"><h2 class="section-title">Skills</h2><div class="skills-container">${data.skills.map(skill => `<span class="skill-tag">${sanitize(skill)}</span>`).join('')}</div></section>`,
    experience: () => `<section id="experience"><h2 class="section-title">Experience</h2><div class="timeline">${data.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <p class="duration">${sanitize(exp.duration)}</p>
        <h3>${sanitize(exp.role)}</h3>
        <p class="company">${sanitize(exp.company)}</p>
        <p>${sanitize(exp.description)}</p>
      </div>`).join('')}</div></section>`,
    projects: () => `<section id="projects"><h2 class="section-title">Featured Projects</h2><div class="projects-grid">${data.projects.map(proj => `
      <a href="${sanitize(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-card">
        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}">
        <div class="info">
          <h3>${sanitize(proj.name)}</h3>
          <p>${sanitize(proj.description)}</p>
        </div>
      </a>`).join('')}</div></section>`,
    achievements: () => ``,
    education: () => `<section id="education"><h2 class="section-title">Education</h2><div class="education-list">${data.education.map(edu => `
      <div class="education-item">
          <div class="header">
            <h3>${sanitize(edu.institution)}</h3>
            <p class="duration">${sanitize(edu.duration)}</p>
          </div>
          <p class="degree">${sanitize(edu.degree)}</p>
      </div>`).join('')}</div></section>`
  };

  const sectionsHTML = data.sectionOrder
    .filter(key => key !== 'passion' && key !== 'achievements')
    .map(key => sectionRenderers[key]()).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sanitize(data.name)}'s Portfolio</title>
      ${getFontImports(themeSettings.fontPair)}
      <style>${css}</style>
    </head>
    <body>
      <div class="container">
        <header>
          <img src="${sanitize(data.avatarUrl)}" alt="${sanitize(data.name)}'s avatar">
          <h1>${sanitize(data.name)}</h1>
          <p class="tagline">${sanitize(data.tagline)}</p>
          <div class="socials">
              ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" target="_blank" rel="noopener noreferrer" class="social-link">GitHub</a>` : ''}
              ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-link">LinkedIn</a>` : ''}
          </div>
        </header>

        <main>
          ${sectionsHTML}
          
          ${data.contactEmail ? `
            <section id="contact">
              <h2 class="section-title">Get In Touch</h2>
              <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
              <a href="mailto:${sanitize(data.contactEmail)}" class="contact-btn">Say Hello</a>
            </section>
          ` : ''}
        </main>

        <footer>
          <p>Designed with Portverse</p>
        </footer>
      </div>
    </body>
    </html>
  `;
};
