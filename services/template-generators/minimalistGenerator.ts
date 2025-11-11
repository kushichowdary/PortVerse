import { PortfolioData, SectionKey } from '../../types';
import { getFontImports, getFontFamilies } from './fontHelper';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateMinimalistHTML = (data: PortfolioData): string => {
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
      --color-light-text: ${isDarkMode ? '#9ca3af' : '#6b7280'};
      --color-border: ${isDarkMode ? '#374151' : '#e5e7eb'};
      --color-card-bg: ${isDarkMode ? '#1f2937' : '#ffffff'};
      --color-skill-bg: ${isDarkMode ? '#374151' : '#f3f4f6'};
      --color-skill-text: ${isDarkMode ? '#d1d5db' : '#4b5563'};
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .container { max-width: 56rem; margin: 0 auto; padding: 4rem 2rem; }

    header { display: flex; flex-direction: column; align-items: center; gap: 2rem; margin-bottom: 4rem; }
    header img { width: 8rem; height: 8rem; border-radius: 9999px; object-fit: cover; box-shadow: 0 0 0 4px ${isDarkMode ? '#111827' : '#fff'}, 0 0 0 8px var(--primary-color); }
    header .info { text-align: center; }
    header h1 { font-family: var(--font-heading); font-size: 3rem; font-weight: 700; color: var(--color-heading); margin: 0; }
    header .tagline { font-size: 1.25rem; color: var(--primary-color); margin-top: 0.25rem; }
    header .socials { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; color: var(--color-light-text); }
    header .socials a { color: inherit; text-decoration: none; transition: color 0.3s; }
    header .socials a:hover { color: var(--primary-color); }
    
    @media (min-width: 640px) {
      header { flex-direction: row; }
      header .info { text-align: left; }
      header .socials { justify-content: flex-start; }
    }
    
    main { display: grid; gap: 4rem; }

    .section-title {
        font-family: var(--font-heading);
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-heading);
        margin: 0 0 1.5rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--primary-color);
        display: inline-block;
    }
    
    #profile p { font-size: 1.125rem; line-height: 1.7; }
    
    #skills .skills-container { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    #skills .skill-tag { padding: 0.25rem 0.75rem; background-color: var(--color-skill-bg); color: var(--color-skill-text); border-radius: 0.375rem; font-weight: 500; }
    
    #experience .experience-list { display: grid; gap: 2rem; }
    .experience-item .header { display: flex; justify-content: space-between; align-items: baseline; }
    .experience-item h3 { font-size: 1.25rem; font-weight: 700; color: var(--color-heading); margin:0; }
    .experience-item .duration { font-size: 0.875rem; color: var(--color-light-text); }
    .experience-item .company { font-size: 1rem; color: var(--primary-color); font-weight: 600; margin: 0.125rem 0; }
    .experience-item p { margin-top: 0.5rem; }
    
    #projects .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .project-card { display: block; text-decoration: none; border: 1px solid var(--color-border); border-radius: 0.5rem; overflow: hidden; transition: all 0.3s; background-color: var(--color-card-bg); }
    .project-card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); border-color: var(--primary-color); }
    .project-card img { width: 100%; height: 13rem; object-fit: cover; }
    .project-card .info { padding: 1.25rem; }
    .project-card h3 { font-size: 1.125rem; font-weight: bold; color: var(--color-heading); margin: 0 0 0.25rem 0; }
    .project-card p { font-size: 0.875rem; }

    #education .education-list { display: grid; gap: 1.5rem; }
    .education-item .header { display: flex; justify-content: space-between; align-items: baseline; }
    .education-item h3 { font-size: 1.25rem; font-weight: 700; color: var(--color-heading); margin: 0; }
    .education-item .duration { font-size: 0.875rem; color: var(--color-light-text); }
    .education-item .degree { font-size: 1rem; }
    
    #contact { text-align: center; }
    #contact p { font-size: 1.125rem; margin-bottom: 1.5rem; }
    #contact a.contact-button {
      display: inline-block;
      padding: 0.75rem 2rem;
      border: 2px solid var(--primary-color);
      border-radius: 0.375rem;
      font-size: 1.125rem;
      font-weight: 600;
      text-decoration: none;
      color: var(--color-text);
      background-color: transparent;
      transition: all 0.3s ease-in-out;
    }
    #contact a.contact-button:hover {
      background-color: var(--primary-color);
      color: ${isDarkMode ? '#000' : '#fff'};
    }

    footer { text-align: center; margin-top: 5rem; padding-top: 2rem; border-top: 1px solid var(--color-border); }
    footer p { color: var(--color-light-text); font-size: 0.875rem; }
    footer a { color: var(--color-light-text); text-decoration: underline; transition: color 0.2s; }
    footer a:hover { color: var(--primary-color); }
  `;
  
  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `<section id="profile"><h2 class="section-title">About Me</h2><p>${sanitize(data.bio)}</p></section>`,
    passion: () => ``,
    skills: () => `<section id="skills"><h2 class="section-title">Skills</h2><div class="skills-container">${data.skills.map(skill => `<span class="skill-tag">${sanitize(skill)}</span>`).join('')}</div></section>`,
    experience: () => `<section id="experience"><h2 class="section-title">Experience</h2><div class="experience-list">${data.experience.map(exp => `
      <div class="experience-item">
        <div class="header">
            <h3>${sanitize(exp.role)}</h3>
            <p class="duration">${sanitize(exp.duration)}</p>
        </div>
        <p class="company">${sanitize(exp.company)}</p>
        <p>${sanitize(exp.description)}</p>
      </div>`).join('')}</div></section>`,
    projects: () => `<section id="projects"><h2 class="section-title">Projects</h2><div class="projects-grid">${data.projects.map(proj => `
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
      <meta name="viewport" content="width=device-width, initial-scale-1.0">
      <title>${sanitize(data.name)}'s Portfolio</title>
      ${getFontImports(themeSettings.fontPair)}
      <style>${css}</style>
    </head>
    <body>
      <div class="container">
        <header>
          <img src="${sanitize(data.avatarUrl)}" alt="${sanitize(data.name)}'s avatar">
          <div class="info">
            <h1>${sanitize(data.name)}</h1>
            <p class="tagline">${sanitize(data.tagline)}</p>
            <div class="socials">
              ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
              ${data.socials.github && data.socials.linkedin ? `<span>&bull;</span>` : ''}
              ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
            </div>
          </div>
        </header>

        <main>
          ${sectionsHTML}
          
          ${data.contactEmail ? `
            <section id="contact">
              <h2 class="section-title">Get In Touch</h2>
              <p>Have a question or want to work together?</p>
              <a href="mailto:${sanitize(data.contactEmail)}" class="contact-button">Say Hello</a>
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