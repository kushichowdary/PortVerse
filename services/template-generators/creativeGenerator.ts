import { PortfolioData } from '../../types';
import { getFontImports, getFontFamilies } from './fontHelper';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateCreativeHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const { bodyFont, headingFont } = getFontFamilies(themeSettings.fontPair);
  const isDarkMode = themeSettings.mode === 'dark';
  
  const css = `
    :root {
      --primary-color: ${sanitize(themeSettings.primaryColor)};
      --font-body: ${bodyFont};
      --font-heading: ${headingFont};
      --color-bg-main: ${isDarkMode ? '#111827' : '#f9fafb'};
      --color-bg-sidebar: ${isDarkMode ? '#1f2937' : '#ffffff'};
      --color-text-main: ${isDarkMode ? '#d1d5db' : '#374151'};
      --color-text-sidebar: ${isDarkMode ? '#9ca3af' : '#4b5563'};
      --color-heading-main: ${isDarkMode ? '#ffffff' : '#111827'};
      --color-border: ${isDarkMode ? '#374151' : '#e5e7eb'};
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      background-color: var(--color-bg-main);
      color: var(--color-text-main);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .wrapper { display: flex; flex-direction: column; }
    .sidebar { background-color: var(--color-bg-sidebar); padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; gap: 2rem; }
    .sidebar .bio h1 { font-family: var(--font-heading); font-size: 2.25rem; font-weight: 700; color: var(--color-heading-main); margin:0; }
    .sidebar .bio .tagline { font-size: 1.125rem; color: var(--primary-color); margin-top: 0.25rem; }
    .sidebar .bio .summary { margin-top: 1.5rem; color: var(--color-text-sidebar); }
    .sidebar .bio img { width: 6rem; height: 6rem; border-radius: 9999px; object-fit: cover; margin-bottom: 1.5rem; }
    .sidebar .connect { display: grid; gap: 1.5rem; }
    .sidebar .connect .connect-title { font-size: 0.875rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.1em; color: var(--color-text-sidebar); }
    .sidebar .connect .social-links { display: flex; gap: 1rem; margin-top: 0.5rem; }
    .sidebar .connect .social-links a, .sidebar .connect a.email-link { color: var(--color-text-sidebar); text-decoration: none; transition: color 0.3s; word-break: break-all; }
    .sidebar .connect .social-links a:hover, .sidebar .connect a.email-link:hover { color: var(--primary-color); }
    
    main { padding: 2rem; position: relative; }
    main section { margin-bottom: 4rem; }
    .back-to-top {
      position: absolute;
      top: 2rem;
      right: 2rem;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      text-decoration: none;
      transition: all 0.2s ease-in-out;
    }
    .back-to-top:hover {
        background-color: var(--primary-color);
        color: ${isDarkMode ? '#000' : '#fff'};
    }
    .back-to-top svg {
        width: 1em; height: 1em;
    }
    .section-title {
        font-family: var(--font-heading);
        font-size: 1.25rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .1em;
        color: var(--primary-color);
        margin-bottom: 2rem;
    }
    #skills .skills-container { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    #skills .skill-tag { padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; font-size: 0.875rem; border: 2px solid var(--color-border); background-color: var(--color-bg-sidebar); }

    #projects .projects-list { display: grid; gap: 2rem; }
    .project-item { display: flex; flex-direction: column; gap: 1rem; text-decoration: none; color: inherit; }
    .project-item .image-container { width: 100%; height: auto; border-radius: 0.375rem; overflow: hidden; }
    .project-item img { width: 100%; height: 100%; object-fit: cover; }
    .project-item h3 { font-size: 1.125rem; font-weight: 700; color: var(--color-heading-main); margin: 0; transition: color 0.3s; }
    .project-item:hover h3 { color: var(--primary-color); }
    .project-item p { margin: 0.25rem 0 0 0; font-size: 0.875rem; color: var(--color-text-sidebar); }
    
    #experience .timeline { position: relative; border-left: 2px solid var(--primary-color); padding-left: 2rem; display: grid; gap: 2.5rem; }
    .timeline-item { position: relative; }
    .timeline-item::before { content: ''; position: absolute; left: -2.5rem; top: 0.25rem; width: 1rem; height: 1rem; background-color: var(--primary-color); border-radius: 9999px; }
    .timeline-item .duration { font-size: 0.875rem; color: var(--color-text-sidebar); margin-bottom: 0.25rem; }
    .timeline-item h3 { font-size: 1.125rem; font-weight: 700; color: var(--color-heading-main); margin: 0; }
    .timeline-item .company { color: var(--primary-color); font-weight: 600; }

    footer { text-align: center; padding: 2.5rem 0; border-top: 1px solid var(--color-border); }
    footer p { color: var(--color-text-sidebar); font-size: 0.875rem; }
    
    @media (min-width: 1024px) {
      .wrapper { flex-direction: row; }
      .sidebar { width: 33.333333%; height: 100vh; position: fixed; top: 0; left: 0; padding: 3rem; }
      main { width: 66.666667%; margin-left: 33.333333%; padding: 5rem; }
      .back-to-top { display: none; }
      .project-item { flex-direction: row; align-items: flex-start; gap: 1.5rem; }
      .project-item .image-container { width: 10rem; flex-shrink: 0; }
    }
  `;

    const skillsHTML = `<div class="skills-container">${data.skills.map(skill => `<span class="skill-tag">${sanitize(skill)}</span>`).join('')}</div>`;

    const projectsHTML = `<div class="projects-list">${data.projects.map(proj => `
    <a href="${sanitize(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-item">
      <div class="image-container">
        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}">
      </div>
      <div>
        <h3>${sanitize(proj.name)}</h3>
        <p>${sanitize(proj.description)}</p>
      </div>
    </a>`).join('')}</div>`;

    const experienceHTML = `<div class="timeline">${data.experience.map(exp => `
    <div class="timeline-item">
        <p class="duration">${sanitize(exp.duration)}</p>
        <h3>${sanitize(exp.role)}</h3>
        <p class="company">${sanitize(exp.company)}</p>
    </div>`).join('')}</div>`;

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
      <div class="wrapper">
        <aside class="sidebar">
          <div class="bio">
            <img src="${sanitize(data.avatarUrl)}" alt="${sanitize(data.name)}'s avatar">
            <h1>${sanitize(data.name)}</h1>
            <p class="tagline">${sanitize(data.tagline)}</p>
            <p class="summary">${sanitize(data.bio)}</p>
          </div>
          <div class="connect">
            ${data.contactEmail ? `
            <div>
              <h3 class="connect-title">Contact</h3>
              <a href="mailto:${sanitize(data.contactEmail)}" class="email-link">${sanitize(data.contactEmail)}</a>
            </div>
            ` : ''}
            <div>
              <h3 class="connect-title">Connect</h3>
              <div class="social-links">
                ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
                ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
              </div>
            </div>
          </div>
        </aside>
        
        <main>
          <a href="#" class="back-to-top">
              <svg xmlns="http://www.w3.org/2000/svg" style="width:1em;height:1em;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span>Back to Top</span>
          </a>
          <section id="skills">
            <h2 class="section-title">Skills</h2>
            ${skillsHTML}
          </section>

          <section id="projects">
            <h2 class="section-title">Projects</h2>
            ${projectsHTML}
          </section>

          <section id="experience">
            <h2 class="section-title">Experience</h2>
            ${experienceHTML}
          </section>

          <footer>
            <p>Designed with Portverse</p>
          </footer>
        </main>
      </div>
    </body>
    </html>
  `;
};