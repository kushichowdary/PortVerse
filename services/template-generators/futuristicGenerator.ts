import { PortfolioData, SectionKey } from '../../types';
import { getFontImports, getFontFamilies } from './fontHelper';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateFuturisticHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const { bodyFont, headingFont } = getFontFamilies(themeSettings.fontPair);
  const isDarkMode = themeSettings.mode === 'dark';
  
  const css = `
    :root {
      --primary-color: ${sanitize(themeSettings.primaryColor)};
      --font-body: ${bodyFont};
      --font-heading: ${headingFont};
      --color-bg: ${isDarkMode ? '#0A0A0A' : '#e2e8f0'};
      --color-text: ${isDarkMode ? '#e5e7eb' : '#334155'};
      --color-text-light: ${isDarkMode ? '#9ca3af' : '#64748b'};
      --color-heading-text: ${isDarkMode ? '#ffffff' : '#0f172a'};
      --timeline-node-bg: ${isDarkMode ? '#0A0A0A' : '#e2e8f0'};
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-body);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .container { max-width: 80rem; margin: 0 auto; padding: 4rem 2rem; }
    .background-effects { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: radial-gradient(circle at top left, ${sanitize(themeSettings.primaryColor)}1A, transparent 30%),radial-gradient(circle at bottom right, ${sanitize(themeSettings.primaryColor)}1A, transparent 30%); }
    
    .glass-pane {
      background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)'};
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
      box-shadow: ${isDarkMode ? 'none' : '0 4px 6px rgba(0,0,0,0.05)'};
    }
    
    header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2rem; margin-bottom: 8rem; }
    header img { width: 10rem; height: 10rem; border-radius: 9999px; object-fit: cover; border: 4px solid var(--primary-color); box-shadow: 0 0 25px ${sanitize(themeSettings.primaryColor)}33; }
    header h1 { font-family: var(--font-heading); font-size: 3.75rem; font-weight: 900; text-transform: uppercase; color: var(--color-heading-text); letter-spacing: 0.05em; margin: 0; }
    header p { font-size: 1.25rem; color: var(--primary-color); margin: 0; font-weight: 600; }
    @media (min-width: 768px) {
      header { flex-direction: row; text-align: left; }
    }
    
    main { max-width: 56rem; margin: 0 auto; display: grid; gap: 7rem; }

    .section-title { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary-color); margin: 0 0 2.5rem 0; }
    
    #profile p { line-height: 1.6; max-width: 48rem; margin: 0 auto; text-align: center; padding: 2rem; border-radius: 1rem; font-weight: 500; }
    
    #passion { position: relative; text-align: center; }
    #passion .content { padding: 2rem; border-radius: 1rem; border: 1px solid ${sanitize(themeSettings.primaryColor)}4D; }
    #passion h3 { font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-heading-text); margin: 0 0 1rem 0; }
    #passion p { color: var(--primary-color); opacity: 0.9; font-size: 1.125rem; max-width: 42rem; margin: 0 auto; font-weight: 600; }
    
    #skills .skills-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
    #skills .skill-tag { padding: 0.5rem 1rem; background-color: ${isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(255, 255, 255, 0.8)'}; border: 1px solid ${sanitize(themeSettings.primaryColor)}4D; color: var(--primary-color); border-radius: 9999px; font-size: 0.875rem; font-weight: 600; }
    
    .timeline { position: relative; border-left: 2px solid ${sanitize(themeSettings.primaryColor)}4D; padding-left: 2rem; display: grid; gap: 3rem; }
    .timeline-item { position: relative; }
    .timeline-item::before { content: ''; position: absolute; left: -2.5rem; top: 0.25rem; width: 1.25rem; height: 1.25rem; background-color: var(--primary-color); border-radius: 9999px; border: 4px solid var(--timeline-node-bg); box-shadow: 0 0 10px var(--primary-color); }
    .timeline-item .duration { font-size: 0.875rem; color: var(--color-text-light); margin-bottom: 0.25rem; font-weight: 600; }
    .timeline-item h3 { font-family: var(--font-heading); font-size: 1.25rem; font-weight: bold; color: var(--color-heading-text); margin: 0; }
    .timeline-item .company { color: var(--primary-color); opacity: 0.95; margin: 0.25rem 0 0.5rem 0; font-weight: bold; }
    .timeline-item p { margin: 0; }

    #projects .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .project-card { display: block; text-decoration: none; border-radius: 0.5rem; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid transparent; }
    .project-card:hover { transform: translateY(-5px); box-shadow: 0 0 20px ${sanitize(themeSettings.primaryColor)}40; border-color: var(--primary-color); }
    .project-card img { width: 100%; height: 15rem; object-fit: cover; }
    .project-card .info { padding: 1.5rem; }
    .project-card h3 { font-family: var(--font-heading); font-size: 1.25rem; font-weight: bold; color: var(--color-heading-text); margin: 0 0 0.5rem 0; }
    .project-card p { font-size: 0.875rem; margin: 0; }

    #achievements .achievements-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .achievement-card { padding: 1.5rem; border-radius: 0.5rem; }
    .achievement-card h3 { font-family: var(--font-heading); font-size: 1.125rem; font-weight: bold; color: var(--primary-color); margin: 0; }
    .achievement-card p { color: var(--color-text-light); margin: 0.25rem 0 0 0; }
    
    #contact .contact-content { text-align: center; max-width: 36rem; margin: 0 auto; }
    #contact p { margin-bottom: 1.5rem; font-size: 1.125rem; font-weight: 500; }
    #contact a.contact-button {
      display: inline-block;
      padding: 1rem 2rem;
      background-color: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      font-weight: bold;
      font-family: var(--font-heading);
      font-size: 1rem;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: all 0.3s ease-in-out;
    }
    #contact a.contact-button:hover {
      background-color: var(--primary-color);
      color: #000;
      box-shadow: 0 0 20px var(--primary-color);
      transform: scale(1.05);
    }

    footer { text-align: center; padding-top: 3rem; border-top: 1px solid ${isDarkMode ? '#1f2937' : '#cbd5e1'}; }
    footer .social-links { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1rem; }
    footer a { color: var(--color-text-light); text-decoration: none; transition: color 0.3s; }
    footer a:hover { color: var(--primary-color); }
    footer p { color: var(--color-text-light); font-size: 0.875rem; margin:0; }
    footer p a { text-decoration: underline; }
  `;

  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `<section id="profile"><h2 class="section-title">01 // PROFILE</h2><p class="glass-pane">${sanitize(data.bio)}</p></section>`,
    passion: () => `<section id="passion"><div class="content glass-pane"><h3>My Passion</h3><p>${sanitize(data.passion)}</p></div></section>`,
    skills: () => `<section id="skills"><h2 class="section-title">02 // ARSENAL</h2><div class="skills-container">${data.skills.map(skill => `<span class="skill-tag">${sanitize(skill)}</span>`).join('')}</div></section>`,
    experience: () => `<section id="experience"><h2 class="section-title">03 // CHRONICLES</h2><div class="timeline">${data.experience.map(exp => `
      <div class="timeline-item">
        <p class="duration">${sanitize(exp.duration)}</p>
        <h3>${sanitize(exp.role)}</h3>
        <p class="company">${sanitize(exp.company)}</p>
        <p>${sanitize(exp.description)}</p>
      </div>`).join('')}</div></section>`,
    projects: () => `<section id="projects"><h2 class="section-title">04 // BLUEPRINTS</h2><div class="projects-grid">${data.projects.map(proj => `
      <a href="${sanitize(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-card glass-pane">
        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}">
        <div class="info">
          <h3>${sanitize(proj.name)}</h3>
          <p>${sanitize(proj.description)}</p>
        </div>
      </a>`).join('')}</div></section>`,
    achievements: () => `<section id="achievements"><h2 class="section-title">05 // ACCOLADES</h2><div class="achievements-grid">${data.achievements.map(ach => `
      <div class="achievement-card glass-pane">
          <h3>${sanitize(ach.title)}</h3>
          <p>${sanitize(ach.description)}</p>
      </div>`).join('')}</div></section>`,
    education: () => `<section id="education"><h2 class="section-title">06 // ORIGINS</h2><div class="timeline">${data.education.map(edu => `
      <div class="timeline-item">
          <p class="duration">${sanitize(edu.duration)}</p>
          <h3>${sanitize(edu.institution)}</h3>
          <p class="company">${sanitize(edu.degree)}</p>
      </div>`).join('')}</div></section>`
  };

  const sectionsHTML = data.sectionOrder.map(key => sectionRenderers[key]()).join('');

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
      <div class="background-effects"></div>
      <div class="container">
        <header>
          <img src="${sanitize(data.avatarUrl)}" alt="${sanitize(data.name)}'s avatar">
          <div>
            <h1>${sanitize(data.name)}</h1>
            <p>${sanitize(data.tagline)}</p>
          </div>
        </header>

        <main>
          ${sectionsHTML}
          
          ${data.contactEmail ? `
            <section id="contact">
              <h2 class="section-title">07 // CONNECT</h2>
              <div class="contact-content">
                <p>I'm currently available for freelance work and open to discussing new projects. Let's create something amazing together.</p>
                <a href="mailto:${sanitize(data.contactEmail)}" class="contact-button">Get In Touch</a>
              </div>
            </section>
          ` : ''}
        </main>

        <footer>
          <div class="social-links">
            ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
            ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
          </div>
          <p>Designed with Portverse</p>
        </footer>
      </div>
    </body>
    </html>
  `;
};