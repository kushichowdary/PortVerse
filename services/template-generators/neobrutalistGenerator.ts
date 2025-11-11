import { PortfolioData, SectionKey } from '../../types';
import { getFontImports, getFontFamilies } from './fontHelper';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateNeobrutalistHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const { bodyFont, headingFont } = getFontFamilies(themeSettings.fontPair);
  const isDarkMode = themeSettings.mode === 'dark';

  const css = `
    :root {
      --primary-color: ${sanitize(themeSettings.primaryColor)};
      --font-body: ${bodyFont};
      --font-heading: ${headingFont};
      --color-bg-main: ${isDarkMode ? '#1a1a1a' : '#f0f0f0'};
      --color-text-main: ${isDarkMode ? '#e0e0e0' : '#1a1a1a'};
      --color-card-bg: ${isDarkMode ? '#111111' : '#ffffff'};
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
    .container { max-width: 56rem; margin: 0 auto; padding: 2rem; }
    @media (min-width: 768px) { .container { padding: 3rem; } }

    header { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-bottom: 3rem; }
    header img { width: 8rem; height: 8rem; border-radius: 9999px; object-fit: cover; border: 3px solid var(--color-text-main); box-shadow: 6px 6px 0px var(--color-text-main); }
    header .info { text-align: center; }
    header h1 { font-family: var(--font-heading); font-size: 3rem; font-weight: 700; margin: 0; }
    header .tagline { font-size: 1.25rem; font-weight: 500; color: var(--primary-color); }
    
    @media (min-width: 640px) {
      header { flex-direction: row; }
      header .info { text-align: left; }
    }
    
    main { display: grid; gap: 2.5rem; }

    .section-title {
        font-family: var(--font-heading);
        font-size: 1.125rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .05em;
        margin-bottom: 1.5rem;
        display: inline-block;
    }
    
    .brutalist-card {
        background-color: var(--color-card-bg);
        border: 3px solid var(--color-text-main);
        box-shadow: 8px 8px 0px var(--primary-color);
        padding: 1.5rem 2rem;
    }

    #skills .skills-container { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    #skills .skill-tag { background-color: var(--color-card-bg); border: 2px solid var(--color-text-main); padding: 0.25rem 0.75rem; font-weight: 500; }
    
    #experience .experience-list { display: grid; gap: 1.5rem; }
    .experience-item h3 { font-size: 1.25rem; font-weight: 700; font-family: var(--font-heading); margin: 0; }
    .experience-item .company { font-size: 1rem; color: var(--primary-color); font-weight: 600; }
    .experience-item .duration { font-size: 0.875rem; text-transform: uppercase; font-weight: 600; opacity: 0.7; margin: 0.25rem 0; }
    .experience-item p { margin: 0.25rem 0 0 0; }
    
    #projects .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .project-card { display: block; text-decoration: none; color: inherit; background-color: var(--color-card-bg); border: 3px solid var(--color-text-main); box-shadow: 6px 6px 0px var(--color-text-main); transition: all 0.2s ease-in-out; }
    .project-card:hover { box-shadow: 8px 8px 0px var(--primary-color); transform: translate(-2px, -2px); border-color: var(--primary-color); }
    .project-card img { width: 100%; height: 13rem; object-fit: cover; border-bottom: 2px solid var(--color-text-main); }
    .project-card .info { padding: 1rem; }
    .project-card h3 { font-size: 1.125rem; font-weight: bold; font-family: var(--font-heading); margin: 0 0 0.25rem 0; }
    .project-card p { font-size: 0.875rem; margin: 0; }

    #achievements .achievements-list { display: grid; gap: 1rem; }
    .achievement-item h3 { font-family: var(--font-heading); font-weight: 700; font-size: 1.125rem; margin: 0; }
    .achievement-item p { margin: 0; }

    #education .education-list { display: grid; gap: 1rem; }
    .education-item h3 { font-size: 1.25rem; font-weight: 700; font-family: var(--font-heading); margin: 0; }
    .education-item .degree { font-size: 1rem; font-weight: 600; }
    .education-item .duration { font-size: 0.875rem; text-transform: uppercase; font-weight: 600; opacity: 0.7; }
    
    #contact { text-align: center; }
    #contact p { margin-bottom: 1.5rem; }
    #contact a.contact-button {
        display: inline-block;
        font-weight: 700;
        font-size: 1.125rem;
        background-color: var(--primary-color);
        color: ${isDarkMode ? '#000' : '#fff'};
        padding: 0.75rem 1.5rem;
        border: 3px solid var(--color-text-main);
        box-shadow: 6px 6px 0px var(--color-text-main);
        text-decoration: none;
        transition: all 0.2s ease-in-out;
    }
    #contact a.contact-button:hover {
        box-shadow: 8px 8px 0px var(--color-text-main);
        transform: translate(-2px, -2px);
    }

    footer { text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--color-text-main); }
    footer p { opacity: 0.7; }
    footer .social-links { display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem; }
    footer a { font-weight: 700; text-decoration: underline; color: inherit; transition: color 0.2s; }
    footer a:hover { color: var(--primary-color); }
  `;
  
  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `<section id="profile"><div class="brutalist-card"><h2 class="section-title">Profile</h2><p>${sanitize(data.bio)}</p></div></section>`,
    passion: () => `<section id="passion"><div class="brutalist-card" style="text-align:center;"><h2 class="section-title">Passion</h2><p style="font-size: 1.125rem; font-weight: 500; color: var(--primary-color);">${sanitize(data.passion)}</p></div></section>`,
    skills: () => `<section id="skills"><div class="brutalist-card"><h2 class="section-title">Skills</h2><div class="skills-container">${data.skills.map(skill => `<span class="skill-tag">${sanitize(skill)}</span>`).join('')}</div></div></section>`,
    experience: () => `<section id="experience"><div class="brutalist-card"><h2 class="section-title">Experience</h2><div class="experience-list">${data.experience.map(exp => `
      <div class="experience-item">
        <h3>${sanitize(exp.role)}</h3>
        <p class="company">${sanitize(exp.company)}</p>
        <p class="duration">${sanitize(exp.duration)}</p>
        <p>${sanitize(exp.description)}</p>
      </div>`).join('')}</div></div></section>`,
    projects: () => `<section id="projects"><div class="brutalist-card"><h2 class="section-title">Projects</h2><div class="projects-grid">${data.projects.map(proj => `
      <a href="${sanitize(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-card">
        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}">
        <div class="info">
          <h3>${sanitize(proj.name)}</h3>
          <p>${sanitize(proj.description)}</p>
        </div>
      </a>`).join('')}</div></div></section>`,
    achievements: () => `<section id="achievements"><div class="brutalist-card"><h2 class="section-title">Achievements</h2><div class="achievements-list">${data.achievements.map(ach => `
      <div class="achievement-item">
          <h3>${sanitize(ach.title)}</h3>
          <p>${sanitize(ach.description)}</p>
      </div>`).join('')}</div></div></section>`,
    education: () => `<section id="education"><div class="brutalist-card"><h2 class="section-title">Education</h2><div class="education-list">${data.education.map(edu => `
      <div class="education-item">
          <h3>${sanitize(edu.institution)}</h3>
          <p class="degree">${sanitize(edu.degree)}</p>
          <p class="duration">${sanitize(edu.duration)}</p>
      </div>`).join('')}</div></div></section>`
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
      <div class="container">
        <header>
          <img src="${sanitize(data.avatarUrl)}" alt="${sanitize(data.name)}'s avatar">
          <div class="info">
            <h1>${sanitize(data.name)}</h1>
            <p class="tagline">${sanitize(data.tagline)}</p>
          </div>
        </header>

        <main>
          ${sectionsHTML}
          
          ${data.contactEmail ? `
            <section id="contact">
              <div class="brutalist-card">
                <h2 class="section-title">Get In Touch</h2>
                <p>Have a project in mind or just want to say hi?</p>
                <a href="mailto:${sanitize(data.contactEmail)}" class="contact-button">Send an Email</a>
              </div>
            </section>
          ` : ''}
        </main>

        <footer>
          <p>Designed with Portverse</p>
          <div class="social-links">
            ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
            ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
          </div>
        </footer>
      </div>
    </body>
    </html>
  `;
};