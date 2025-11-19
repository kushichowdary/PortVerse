
import { PortfolioData, SectionKey } from '../../types';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateTechDocHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';
  const primary = themeSettings.primaryColor;

  const bgColor = isDarkMode ? '#0f172a' : '#ffffff';
  const sidebarColor = isDarkMode ? '#1e293b' : '#f8fafc';
  const textColor = isDarkMode ? '#e2e8f0' : '#334155';
  const headingColor = isDarkMode ? '#f8fafc' : '#0f172a';
  const borderColor = isDarkMode ? '#334155' : '#e2e8f0';

  const css = `
    :root {
      --primary: ${primary};
      --bg: ${bgColor};
      --sidebar: ${sidebarColor};
      --text: ${textColor};
      --heading: ${headingColor};
      --border: ${borderColor};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; }
    a { text-decoration: none; color: inherit; transition: 0.2s; }
    
    .layout { display: flex; min-height: 100vh; }
    aside { width: 260px; background: var(--sidebar); border-right: 1px solid var(--border); padding: 2rem; position: fixed; height: 100vh; overflow-y: auto; }
    main { margin-left: 260px; padding: 4rem 5rem; max-width: 1000px; flex: 1; }
    
    @media (max-width: 768px) {
        aside { display: none; }
        main { margin-left: 0; padding: 2rem; }
    }

    nav a { display: block; padding: 0.5rem 0.75rem; color: var(--heading); font-weight: 500; border-radius: 4px; opacity: 0.8; font-size: 0.9rem; }
    nav a:hover { background: rgba(125,125,125,0.1); opacity: 1; }
    
    section { margin-bottom: 5rem; scroll-margin-top: 4rem; }
    h1 { font-size: 2.5rem; color: var(--heading); margin-bottom: 1rem; }
    h2 { font-size: 1.5rem; color: var(--heading); margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
    h3 { font-size: 1.2rem; color: var(--heading); font-weight: 600; }
    
    .mono-tag { font-family: monospace; background: rgba(125,125,125,0.1); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--primary); font-size: 0.85rem; display: inline-block; margin-bottom: 1.5rem; }
    
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media(max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
    
    .skill-item { border: 1px solid var(--border); padding: 0.75rem; border-radius: 4px; display: flex; justify-content: space-between; font-family: monospace; font-size: 0.9rem; }
    
    .exp-item { position: relative; padding-left: 1.5rem; border-left: 2px solid var(--border); margin-bottom: 2rem; }
    .exp-item::before { content: ''; position: absolute; left: -5px; top: 5px; width: 8px; height: 8px; border-radius: 50%; background: var(--bg); border: 2px solid var(--primary); }
    .meta { font-family: monospace; font-size: 0.8rem; color: var(--primary); margin: 0.2rem 0 0.5rem; }

    .project-card { border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; display: flex; gap: 1.5rem; transition: 0.2s; }
    .project-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .project-img { width: 180px; height: 120px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border); background: #ccc; }
    @media(max-width: 600px) { .project-card { flex-direction: column; } .project-img { width: 100%; height: auto; } }

    .edu-item { display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 1rem; margin-bottom: 1rem; }
    
    .btn { display: inline-block; background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 500; font-size: 0.9rem; margin-top: 1rem; }
  `;

  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `
        <section id="profile">
            <h1>${sanitize(data.name)}</h1>
            <div class="mono-tag">&gt; ${sanitize(data.tagline)}</div>
            <p style="font-size: 1.1rem; max-width: 700px;">${sanitize(data.bio)}</p>
            <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" style="color:var(--primary); font-weight:500;">GitHub ↗</a>` : ''}
                ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" style="color:var(--primary); font-weight:500;">LinkedIn ↗</a>` : ''}
            </div>
        </section>
    `,
    passion: () => `
        <section id="passion">
            <h2>Passion</h2>
            <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-style: italic;">"${sanitize(data.passion)}"</blockquote>
        </section>
    `,
    skills: () => `
        <section id="skills">
            <h2>Technical Skills</h2>
            <div class="grid-2">
                ${data.skills.map(s => `<div class="skill-item"><span>${sanitize(s)}</span><span style="color:var(--primary)">✓</span></div>`).join('')}
            </div>
        </section>
    `,
    experience: () => `
        <section id="experience">
            <h2>Experience</h2>
            ${data.experience.map(exp => `
                <div class="exp-item">
                    <h3>${sanitize(exp.role)}</h3>
                    <div class="meta">${sanitize(exp.company)} • ${sanitize(exp.duration)}</div>
                    <p>${sanitize(exp.description)}</p>
                </div>
            `).join('')}
        </section>
    `,
    projects: () => `
        <section id="projects">
            <h2>Projects</h2>
            <div style="display: grid; gap: 1.5rem;">
                ${data.projects.map(proj => `
                    <a href="${sanitize(proj.link)}" target="_blank" class="project-card">
                        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}" class="project-img">
                        <div>
                            <h3 style="color:var(--heading); margin-bottom:0.5rem;">${sanitize(proj.name)} ↗</h3>
                            <p style="font-size:0.9rem;">${sanitize(proj.description)}</p>
                        </div>
                    </a>
                `).join('')}
            </div>
        </section>
    `,
    achievements: () => `
        <section id="achievements">
            <h2>Achievements</h2>
            <ul style="list-style: disc inside; padding-left: 1rem;">
                ${data.achievements.map(ach => `<li><strong>${sanitize(ach.title)}:</strong> ${sanitize(ach.description)}</li>`).join('')}
            </ul>
        </section>
    `,
    education: () => `
        <section id="education">
            <h2>Education</h2>
            ${data.education.map(edu => `
                <div class="edu-item">
                    <div>
                        <h4 style="color:var(--heading); font-weight:bold;">${sanitize(edu.institution)}</h4>
                        <p>${sanitize(edu.degree)}</p>
                    </div>
                    <div style="font-family:monospace; font-size:0.85rem;">${sanitize(edu.duration)}</div>
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
      <title>${sanitize(data.name)} - Documentation</title>
      <style>${css}</style>
    </head>
    <body>
      <div class="layout">
        <aside>
            <div style="margin-bottom: 2rem;">
                <div style="width:40px; height:40px; background: linear-gradient(to bottom right, #3b82f6, #9333ea); border-radius:4px; margin-bottom:1rem;"></div>
                <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:1px; font-weight:bold; opacity:0.6;">Documentation</div>
            </div>
            <nav>
                ${data.sectionOrder.map(key => `<a href="#${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</a>`).join('')}
                ${data.contactEmail ? `<a href="#contact">Contact</a>` : ''}
            </nav>
        </aside>
        <main>
            ${data.sectionOrder.map(key => sectionRenderers[key]()).join('')}
            
            ${data.contactEmail ? `
                <section id="contact" style="padding: 2rem; border: 1px solid var(--border); border-radius: 8px; background: var(--sidebar);">
                    <h3>Contact</h3>
                    <p style="margin-bottom:1rem;">Ready to collaborate?</p>
                    <a href="mailto:${sanitize(data.contactEmail)}" class="btn">Email: ${sanitize(data.contactEmail)}</a>
                </section>
            ` : ''}
            
            <footer style="margin-top: 4rem; border-top: 1px solid var(--border); padding-top: 2rem; font-size: 0.9rem; opacity: 0.6;">
                <p>© ${new Date().getFullYear()} ${sanitize(data.name)}. Generated by Portverse.</p>
            </footer>
        </main>
      </div>
    </body>
    </html>
  `;
};
