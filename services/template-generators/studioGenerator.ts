
import { PortfolioData, SectionKey } from '../../types';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateStudioHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';
  const accent = themeSettings.primaryColor;
  const bg = isDarkMode ? '#000000' : '#ffffff';
  const text = isDarkMode ? '#ffffff' : '#000000';
  const inverse = isDarkMode ? '#000000' : '#ffffff';

  const css = `
    :root {
      --accent: ${accent};
      --bg: ${bg};
      --text: ${text};
      --inverse: ${inverse};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    
    nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5rem; }
    .logo { font-weight: bold; font-size: 1.2rem; letter-spacing: -1px; }
    .cta { font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border: 1px solid var(--text); padding: 0.5rem 1rem; transition: 0.3s; }
    .cta:hover { background: var(--accent); border-color: var(--accent); color: var(--inverse); }
    
    section { margin-bottom: 8rem; }
    
    .hero { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: end; }
    @media(min-width: 768px) { .hero { grid-template-columns: 4fr 8fr; } }
    .hero img { width: 100%; height: auto; aspect-ratio: 3/4; object-fit: cover; filter: grayscale(100%); }
    .hero h1 { font-size: 4rem; line-height: 0.9; font-weight: 900; margin-bottom: 1rem; letter-spacing: -3px; }
    @media(min-width: 768px) { .hero h1 { font-size: 6rem; } }
    .hero p { font-size: 1.5rem; font-weight: 300; margin-bottom: 2rem; }
    
    .section-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid var(--text); padding-bottom: 1rem; margin-bottom: 2rem; }
    .label { font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; }
    
    .project-grid { display: grid; gap: 4rem; }
    @media(min-width: 768px) { .project-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
    .project-card { display: block; }
    .project-card:nth-child(even) { margin-top: 0; }
    @media(min-width: 768px) { .project-card:nth-child(even) { margin-top: 5rem; } }
    .project-card img { width: 100%; height: auto; aspect-ratio: 4/5; object-fit: cover; margin-bottom: 1rem; transition: transform 0.5s; }
    .project-card:hover img { transform: scale(1.02); }
    .project-card h3 { font-size: 1.5rem; font-weight: bold; }
    
    .skill-list { display: flex; flex-wrap: wrap; gap: 1rem; }
    .skill-item { font-size: 1.5rem; font-weight: 300; padding-right: 1rem; }
    
    .exp-item { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2rem; }
    @media(min-width: 768px) { .exp-item { grid-template-columns: 3fr 9fr; } }
    .exp-details { border-top: 1px solid rgba(125,125,125,0.2); padding-top: 1rem; }
    
    .recognition { background: var(--accent); color: var(--inverse); padding: 3rem; margin: 0 -1rem; }
    .rec-item { border-bottom: 1px solid var(--inverse); padding-bottom: 2rem; margin-bottom: 2rem; }
    .rec-item:last-child { border: 0; padding: 0; margin: 0; }
    
    .education-item { display: flex; justify-content: space-between; margin-bottom: 1rem; align-items: baseline; }
    
    footer { border-top: 1px solid var(--text); padding-top: 2rem; display: flex; justify-content: space-between; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
  `;

  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `
        <section class="hero">
            <div><img src="${sanitize(data.avatarUrl)}" alt="Avatar"></div>
            <div>
                <h1>${sanitize(data.name).split(' ')[0]}<span style="color:var(--accent)">.</span></h1>
                <p>${sanitize(data.bio)}</p>
                <div style="font-size:0.8rem; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">
                    ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" style="margin-right:1rem;">LinkedIn</a>` : ''}
                    ${data.socials.twitter ? `<a href="${sanitize(data.socials.twitter)}">Twitter</a>` : ''}
                </div>
            </div>
        </section>
    `,
    passion: () => `
        <section style="text-align:center; padding: 5rem 0; border-top:1px solid var(--text); border-bottom:1px solid var(--text);">
            <p style="font-size: 2rem; font-weight:bold; text-transform:uppercase;">${sanitize(data.passion)}</p>
        </section>
    `,
    projects: () => `
        <section>
            <div class="section-header">
                <span class="label">Selected Works</span>
                <span style="font-family:monospace; font-size:0.8rem;">${data.projects.length} Items</span>
            </div>
            <div class="project-grid">
                ${data.projects.map((proj, i) => `
                    <a href="${sanitize(proj.link)}" target="_blank" class="project-card">
                        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div>
                                <h3>${sanitize(proj.name)}</h3>
                                <p style="opacity:${isDarkMode ? 0.6 : 0.8}; font-size:0.9rem; margin-top:0.5rem;">${sanitize(proj.description)}</p>
                            </div>
                            <span style="font-family:monospace; opacity:0.5;">0${i+1}</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        </section>
    `,
    skills: () => `
        <section>
             <div class="section-header"><span class="label">Skillset</span></div>
             <div class="skill-list">
                ${data.skills.map(s => `<span class="skill-item">${sanitize(s)}</span>`).join('')}
             </div>
        </section>
    `,
    experience: () => `
        <section>
            <div class="section-header"><span class="label">Experience</span></div>
            ${data.experience.map(exp => `
                <div class="exp-item">
                    <div style="font-family:monospace; opacity:0.5; font-size:0.9rem;">${sanitize(exp.duration)}</div>
                    <div class="exp-details">
                        <h3 style="font-size:1.5rem; font-weight:bold;">${sanitize(exp.role)}</h3>
                        <div style="color:var(--accent); font-weight:500; margin-bottom:0.5rem;">${sanitize(exp.company)}</div>
                        <p style="opacity:${isDarkMode ? 0.8 : 1};">${sanitize(exp.description)}</p>
                    </div>
                </div>
            `).join('')}
        </section>
    `,
    achievements: () => `
        <section class="recognition">
            <div style="font-size:0.8rem; font-weight:bold; text-transform:uppercase; letter-spacing:2px; margin-bottom:2rem; opacity:0.8;">Recognition</div>
            ${data.achievements.map(ach => `
                <div class="rec-item">
                    <h3 style="font-size:1.5rem; font-weight:bold;">${sanitize(ach.title)}</h3>
                    <p style="opacity:0.8; margin-top:0.5rem;">${sanitize(ach.description)}</p>
                </div>
            `).join('')}
        </section>
    `,
    education: () => `
        <section>
            <div class="section-header"><span class="label">Education</span></div>
            ${data.education.map(edu => `
                <div class="education-item">
                    <div>
                        <h3 style="font-weight:bold;">${sanitize(edu.institution)}</h3>
                        <p style="opacity:0.6;">${sanitize(edu.degree)}</p>
                    </div>
                    <div style="font-family:monospace; opacity:0.5; font-size:0.8rem;">${sanitize(edu.duration)}</div>
                </div>
            `).join('')}
        </section>
    `
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sanitize(data.name)} - Portfolio</title>
      <style>${css}</style>
    </head>
    <body>
      <div class="container">
        <nav>
            <div class="logo">${sanitize(data.name).toUpperCase()}</div>
            ${data.contactEmail ? `<a href="mailto:${sanitize(data.contactEmail)}" class="cta">Get in touch</a>` : ''}
        </nav>

        <main>
             ${sectionRenderers['profile']()}
             ${sectionRenderers['projects']()}
             ${sectionRenderers['passion']()}
             ${sectionRenderers['skills']()}
             ${sectionRenderers['experience']()}
             ${sectionRenderers['achievements']()}
             ${sectionRenderers['education']()}
        </main>

        <footer>
            <span>Generated by Portverse</span>
            <span>© ${new Date().getFullYear()}</span>
        </footer>
      </div>
    </body>
    </html>
  `;
};