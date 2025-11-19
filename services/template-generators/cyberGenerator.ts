
import { PortfolioData, SectionKey } from '../../types';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generateCyberHTML = (data: PortfolioData): string => {
  const { themeSettings } = data;
  const isDarkMode = themeSettings.mode === 'dark';
  const primary = themeSettings.primaryColor;
  const bg = isDarkMode ? '#050505' : '#f0f0f0';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const gridColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  const css = `
    :root {
      --primary: ${primary};
      --bg: ${bg};
      --text: ${text};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
        background-color: var(--bg); 
        color: var(--text); 
        font-family: 'Inter', sans-serif; 
        overflow-x: hidden;
        min-height: 100vh;
        position: relative;
    }
    a { text-decoration: none; color: inherit; transition: 0.3s; }
    
    /* Typography */
    .font-mono { font-family: 'Share Tech Mono', monospace; }
    
    /* Layout */
    .container { max-width: 1000px; margin: 0 auto; padding: 2rem; position: relative; z-index: 10; }
    section { padding: 5rem 0; }

    /* Effects */
    .scanlines {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 2px, 3px 100%;
        pointer-events: none;
        z-index: 999;
    }
    .grid-bg {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background-image: linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px);
        background-size: 40px 40px;
        pointer-events: none;
        z-index: 1;
    }

    /* Profile */
    .profile-container { text-align: center; min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .avatar { width: 150px; height: 150px; border-radius: 50%; border: 2px dashed var(--primary); padding: 5px; margin-bottom: 2rem; animation: spin 10s linear infinite; }
    .avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; grayscale(100%); }
    
    .glitch {
        font-size: 4rem; font-weight: 900; position: relative; display: inline-block; margin-bottom: 1rem; letter-spacing: -2px;
    }
    @media (max-width: 768px) { .glitch { font-size: 2.5rem; } }
    
    .tagline { font-family: 'Share Tech Mono', monospace; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; text-transform: uppercase; letter-spacing: 2px; font-size: 0.9rem; display: inline-block; }
    
    .socials { margin-top: 2rem; display: flex; gap: 1.5rem; }
    .socials a { font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; text-transform: uppercase; }
    .socials a:hover { color: var(--primary); text-shadow: 0 0 8px var(--primary); }

    /* Common Components */
    .section-title { font-family: 'Share Tech Mono', monospace; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem; }
    .section-title::before { content: ''; width: 30px; height: 1px; background: var(--primary); }
    
    /* Skills */
    .skill-tag { display: inline-block; padding: 0.5rem 1rem; margin: 0 0.5rem 0.5rem 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); font-family: 'Share Tech Mono', monospace; font-size: 0.9rem; transition: 0.3s; cursor: crosshair; }
    .skill-tag:hover { background: var(--primary); color: #000; border-color: var(--primary); }

    /* Cards */
    .grid-cards { display: grid; grid-template-columns: 1fr; gap: 2rem; }
    @media(min-width: 768px) { .grid-cards { grid-template-columns: 1fr 1fr; } }
    
    .cyber-card { position: relative; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.4); padding: 2rem; transition: 0.3s; overflow: hidden; }
    .cyber-card:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 0 20px rgba(var(--primary), 0.1); }
    .cyber-card h3 { font-family: 'Share Tech Mono', monospace; font-size: 1.5rem; margin-bottom: 1rem; font-weight: bold; }
    
    .project-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; opacity: 0.7; margin-bottom: 1.5rem; transition: 0.3s; }
    .cyber-card:hover .project-img { opacity: 1; }

    /* Experience */
    .exp-item { position: relative; padding-left: 2rem; margin-bottom: 3rem; border-left: 1px solid rgba(255,255,255,0.1); }
    .exp-item::before { content: ''; position: absolute; left: -3px; top: 0; width: 5px; height: 5px; background: var(--primary); box-shadow: 0 0 10px var(--primary); }
    .exp-meta { font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; opacity: 0.6; margin-bottom: 0.5rem; }
    .exp-role { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
    
    footer { text-align: center; font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; opacity: 0.4; padding-bottom: 2rem; }

    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;

  const sectionRenderers: Record<SectionKey, () => string> = {
    profile: () => `
        <div class="profile-container">
            <div class="avatar"><img src="${sanitize(data.avatarUrl)}" alt="avatar"></div>
            <h1 class="glitch">${sanitize(data.name)}</h1>
            <div class="tagline">${sanitize(data.tagline)}</div>
            <div class="socials">
                ${data.socials.github ? `<a href="${sanitize(data.socials.github)}" target="_blank">[GITHUB]</a>` : ''}
                ${data.socials.linkedin ? `<a href="${sanitize(data.socials.linkedin)}" target="_blank">[LINKEDIN]</a>` : ''}
                ${data.socials.twitter ? `<a href="${sanitize(data.socials.twitter)}" target="_blank">[TWITTER]</a>` : ''}
            </div>
        </div>
    `,
    passion: () => `
        <section style="text-align: center; position: relative;">
            <div style="height: 50px; width: 1px; background: linear-gradient(to bottom, transparent, var(--primary)); margin: 0 auto 1rem;"></div>
            <p style="font-size: 1.5rem; font-weight: 300; line-height: 1.6;">
                <span style="color: var(--primary)">&lt;passion&gt;</span>
                ${sanitize(data.passion)}
                <span style="color: var(--primary)">&lt;/passion&gt;</span>
            </p>
            <div style="height: 50px; width: 1px; background: linear-gradient(to top, transparent, var(--primary)); margin: 1rem auto 0;"></div>
        </section>
    `,
    skills: () => `
        <section>
            <h2 class="section-title">System_Capabilities</h2>
            <div>
                ${data.skills.map(s => `<span class="skill-tag">${sanitize(s)}</span>`).join('')}
            </div>
        </section>
    `,
    projects: () => `
        <section>
             <h2 class="section-title">Deployed_Modules</h2>
             <div class="grid-cards">
                ${data.projects.map(proj => `
                    <a href="${sanitize(proj.link)}" target="_blank" class="cyber-card">
                        <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}" class="project-img">
                        <h3>${sanitize(proj.name)}</h3>
                        <p style="font-size: 0.9rem; opacity: 0.7;">${sanitize(proj.description)}</p>
                    </a>
                `).join('')}
             </div>
        </section>
    `,
    experience: () => `
        <section>
             <h2 class="section-title">Log_History</h2>
             <div style="margin-left: 1rem;">
                ${data.experience.map(exp => `
                    <div class="exp-item">
                        <div class="exp-meta">${sanitize(exp.duration)} // <span style="color: var(--primary)">${sanitize(exp.company)}</span></div>
                        <div class="exp-role">${sanitize(exp.role)}</div>
                        <p style="font-size: 0.9rem; opacity: 0.8;">${sanitize(exp.description)}</p>
                    </div>
                `).join('')}
             </div>
        </section>
    `,
    achievements: () => `
        <section>
             <h2 class="section-title">Trophies</h2>
             <div class="grid-cards">
                ${data.achievements.map((ach, i) => `
                    <div class="cyber-card" style="border-style: dashed; background: transparent;">
                        <div style="display: flex; gap: 1rem;">
                            <div style="font-size: 1.5rem; opacity: 0.5;">0${i+1}</div>
                            <div>
                                <h4 style="font-size: 1.2rem; font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">${sanitize(ach.title)}</h4>
                                <p style="font-size: 0.9rem; opacity: 0.7;">${sanitize(ach.description)}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
             </div>
        </section>
    `,
    education: () => `
        <section style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem;">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2rem;">
                <div>
                    <h2 class="section-title" style="opacity: 0.5; margin-bottom: 1rem;">Education_Data</h2>
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="font-weight: bold; font-size: 1.2rem;">${sanitize(edu.institution)}</div>
                            <div style="font-size: 0.9rem; font-family: 'Share Tech Mono', monospace;">
                                <span style="color: var(--primary)">${sanitize(edu.degree)}</span> // ${sanitize(edu.duration)}
                            </div>
                        </div>
                    `).join('')}
                </div>
                ${data.contactEmail ? `
                    <div style="text-align: right;">
                        <div style="font-family: 'Share Tech Mono', monospace; opacity: 0.5; margin-bottom: 0.5rem;">Initialize_Connection</div>
                        <a href="mailto:${sanitize(data.contactEmail)}" style="font-size: 1.5rem; font-weight: bold; color: var(--text);">${sanitize(data.contactEmail)}</a>
                    </div>
                ` : ''}
            </div>
        </section>
    `
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sanitize(data.name)} [CYBER]</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet">
      <style>${css}</style>
    </head>
    <body>
      <div class="scanlines"></div>
      <div class="grid-bg"></div>
      <div class="container">
         ${data.sectionOrder.map(key => sectionRenderers[key]()).join('')}
         <footer>
            System_ID: ${sanitize(data.name).toUpperCase().replace(/\s/g, '_')} // v2.0.4
         </footer>
      </div>
    </body>
    </html>
  `;
};
