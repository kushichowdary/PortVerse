import { PortfolioData, SectionKey } from '../../types';
import { getFontImports, getFontFamilies } from './fontHelper';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateElegantHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const { bodyFont, headingFont } = getFontFamilies(themeSettings.fontPair);
  const isDarkMode = themeSettings.mode === 'dark';

  const bg = isDarkMode ? '#121212' : '#FAFAFA';
  const text = isDarkMode ? '#E0E0E0' : '#000000';
  const border = isDarkMode ? '#333333' : '#D4D4D4';
  const muted = isDarkMode ? '#A0A0A0' : '#404040';
  const accent = themeSettings.primaryColor;

  const css = `
    :root {
      --font-body: ${bodyFont};
      --font-heading: ${headingFont};
      --color-bg: ${bg};
      --color-text: ${text};
      --color-border: ${border};
      --color-muted: ${muted};
      --color-accent: ${sanitize(accent)};
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
    }
    .container { max-width: 70rem; margin: 0 auto; padding: 5rem 1.5rem; }
    a { color: inherit; text-decoration: none; transition: color 0.3s; }
    
    /* Typography */
    h1, h2, h3, h4 { font-family: var(--font-heading); font-weight: 400; line-height: 1.2; }
    .uppercase-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-muted); }
    
    /* Header */
    header { margin-bottom: 8rem; display: flex; flex-direction: column; gap: 2rem; }
    header h1 { font-size: 4rem; letter-spacing: -0.02em; }
    header .tagline { font-size: 1.5rem; color: var(--color-accent); font-weight: 300; }
    .socials { display: flex; gap: 1.5rem; }
    .socials a { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
    .socials a:hover { text-decoration: underline; }

    @media(min-width: 768px) {
        header { flex-direction: row; justify-content: space-between; align-items: flex-start; }
        header h1 { font-size: 5.5rem; }
        .socials { flex-direction: column; align-items: flex-end; gap: 0.5rem; }
    }

    /* Sections */
    section { margin-bottom: 6rem; }
    
    #profile p { font-size: 1.25rem; font-weight: 300; opacity: ${isDarkMode ? 0.9 : 1}; max-width: 50rem; }

    #passion { border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 3rem 0; }
    #passion p { font-size: 2rem; font-family: var(--font-heading); font-style: italic; }

    .grid-skills { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .skill-item { border-top: 1px solid var(--color-border); padding-top: 0.5rem; }
    @media(min-width: 768px) { .grid-skills { grid-template-columns: repeat(4, 1fr); } }

    .experience-item { display: grid; gap: 1rem; margin-bottom: 4rem; }
    .experience-item .duration { font-size: 0.85rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
    .experience-item h3 { font-size: 1.75rem; margin-bottom: 0.25rem; }
    .experience-item .company { font-size: 1.1rem; color: var(--color-accent); margin-bottom: 1rem; }
    .experience-item p { font-weight: 300; opacity: ${isDarkMode ? 0.85 : 1}; }
    @media(min-width: 768px) { 
        .experience-item { grid-template-columns: 1fr 3fr; } 
    }

    .projects-grid { display: grid; grid-template-columns: 1fr; gap: 4rem; }
    .project-card img { width: 100%; aspect-ratio: 4/3; object-fit: cover; filter: grayscale(100%); transition: filter 0.5s; margin-bottom: 1.5rem; }
    .project-card:hover img { filter: grayscale(0%); }
    .project-card h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .project-card:hover h3 { text-decoration: underline; }
    .project-card p { font-weight: 300; color: var(--color-muted); }
    @media(min-width: 768px) { .projects-grid { grid-template-columns: 1fr 1fr; } }

    .achievements-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
    .achievement-item { border: 1px solid var(--color-border); padding: 2rem; }
    .achievement-item h4 { font-size: 1.25rem; color: var(--color-accent); margin-bottom: 0.5rem; }
    @media(min-width: 768px) { .achievements-grid { grid-template-columns: 1fr 1fr; } }

    .education-row { border-top: 1px solid var(--color-border); padding-top: 2rem; display: grid; gap: 1rem; }
    .edu-item { display: flex; justify-content: space-between; margin-bottom: 1.5rem; }
    .edu-item h4 { font-size: 1.25rem; }
    @media(min-width: 768px) { .education-row { grid-template-columns: 1fr 3fr; } }

    #contact { text-align: center; margin-top: 6rem; }
    #contact h2 { font-size: 2.5rem; margin-bottom: 2rem; }
    #contact a { font-size: 1.25rem; border-bottom: 1px solid var(--color-text); padding-bottom: 0.25rem; }
    #contact a:hover { color: var(--color-accent); border-color: var(--color-accent); }

    footer { margin-top: 5rem; padding-top: 2rem; border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.1em; }
  `;

  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `<section id="profile"><p>${sanitize(data.bio)}</p></section>`,
    passion: () => `<section id="passion"><div class="uppercase-label" style="color:var(--color-accent); margin-bottom: 1.5rem;">Passion</div><p>"${sanitize(data.passion)}"</p></section>`,
    skills: () => `<section id="skills"><div class="uppercase-label" style="margin-bottom: 2rem;">Expertise</div><div class="grid-skills">${data.skills.map(skill => `<div class="skill-item">${sanitize(skill)}</div>`).join('')}</div></section>`,
    experience: () => `<section id="experience"><h2 style="font-size: 3rem; margin-bottom: 3rem;">Career</h2>${data.experience.map(exp => `
      <div class="experience-item">
        <div class="duration">${sanitize(exp.duration)}</div>
        <div>
            <h3>${sanitize(exp.role)}</h3>
            <div class="company">${sanitize(exp.company)}</div>
            <p>${sanitize(exp.description)}</p>
        </div>
      </div>`).join('')}</section>`,
    projects: () => `<section id="projects"><h2 style="font-size: 3rem; margin-bottom: 3rem;">Selected Works</h2><div class="projects-grid">${data.projects.map(proj => `
      <a href="${sanitize(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-card">
        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}">
        <h3>${sanitize(proj.name)}</h3>
        <p>${sanitize(proj.description)}</p>
      </a>`).join('')}</div></section>`,
    achievements: () => `<section id="achievements"><div class="uppercase-label" style="margin-bottom: 2rem;">Recognition</div><div class="achievements-grid">${data.achievements.map(ach => `
      <div class="achievement-item">
          <h4>${sanitize(ach.title)}</h4>
          <p>${sanitize(ach.description)}</p>
      </div>`).join('')}</div></section>`,
    education: () => `<section id="education"><div class="education-row">
        <div class="uppercase-label">Education</div>
        <div>${data.education.map(edu => `
            <div class="edu-item">
                <div>
                    <h4>${sanitize(edu.institution)}</h4>
                    <p>${sanitize(edu.degree)}</p>
                </div>
                <span style="color:var(--color-muted); font-size:0.9rem;">${sanitize(edu.duration)}</span>
            </div>
        `).join('')}</div>
    </div></section>`
  };

  const sectionsHTML = data.sectionOrder.map(key => sectionRenderers[key]()).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sanitize(data.name)}</title>
      ${getFontImports(themeSettings.fontPair)}
      <style>${css}</style>
    </head>
    <body>
      <div class="container">
        <header>
          <div>
              <h1>${sanitize(data.name)}</h1>
              <div class="tagline">${sanitize(data.tagline)}</div>
          </div>
          <div class="socials">
             ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ''}
             ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" target="_blank">GitHub</a>` : ''}
             ${data.socials.twitter ? `<a href="${sanitize(data.socials.twitter)}" target="_blank">Twitter</a>` : ''}
          </div>
        </header>

        <main>
          ${sectionsHTML}
          
          ${data.contactEmail ? `
            <section id="contact">
              <h2>Let's create something timeless.</h2>
              <a href="mailto:${sanitize(data.contactEmail)}">${sanitize(data.contactEmail)}</a>
            </section>
          ` : ''}
        </main>

        <footer>
          <span>&copy; ${new Date().getFullYear()} ${sanitize(data.name)}</span>
          <span>Created with Portverse</span>
        </footer>
      </div>
    </body>
    </html>
  `;
};