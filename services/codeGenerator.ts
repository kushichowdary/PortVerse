import { PortfolioData } from '../types';

const sanitize = (str: string) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

export const generatePortfolioHTML = (data: PortfolioData): string => {

  const css = `
    :root {
      --color-bg: #0A0A0A;
      --color-text: #e5e7eb;
      --color-text-light: #9ca3af;
      --color-primary: #22d3ee; /* cyan-400 */
      --color-secondary: #38bdf8; /* lightBlue-400 */
      --font-body: 'Poppins', sans-serif;
      --font-heading: 'Orbitron', sans-serif;
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
    .background-effects { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: radial-gradient(circle at top left, rgba(0,191,255,0.1), transparent 30%),radial-gradient(circle at bottom right, rgba(0,191,255,0.1), transparent 30%); }
    
    .glass-pane {
      background-color: rgba(255, 255, 255, 0.05);
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2rem; margin-bottom: 8rem; }
    header img { width: 10rem; height: 10rem; border-radius: 9999px; object-fit: cover; border: 4px solid rgba(34, 211, 238, 0.5); }
    header h1 { font-family: var(--font-heading); font-size: 3.75rem; font-weight: 900; text-transform: uppercase; color: white; letter-spacing: 0.05em; margin: 0; }
    header p { font-size: 1.25rem; color: var(--color-primary); margin: 0; }
    @media (min-width: 768px) {
      header { flex-direction: row; text-align: left; }
    }
    
    main { max-width: 56rem; margin: 0 auto; display: grid; gap: 7rem; }

    .section-title { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-primary); margin: 0 0 2.5rem 0; }
    
    #about p { color: #d1d5db; line-height: 1.6; max-width: 48rem; margin: 0 auto; text-align: center; padding: 2rem; border-radius: 1rem; }
    
    #passion { position: relative; text-align: center; }
    #passion .content { padding: 2rem; border-radius: 1rem; border: 1px solid rgba(34, 211, 238, 0.3); }
    #passion h3 { font-family: var(--font-heading); font-size: 1.5rem; color: white; margin: 0 0 1rem 0; }
    #passion p { color: #67e8f9; font-size: 1.125rem; max-width: 42rem; margin: 0 auto; }
    
    #skills .skills-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
    #skills .skill-tag { padding: 0.5rem 1rem; background-color: rgba(55, 65, 81, 0.5); border: 1px solid rgba(34, 211, 238, 0.3); color: var(--color-primary); border-radius: 9999px; font-size: 0.875rem; font-weight: 500; }
    
    .timeline { position: relative; border-left: 2px solid rgba(34, 211, 238, 0.3); padding-left: 2rem; display: grid; gap: 3rem; }
    .timeline-item { position: relative; }
    .timeline-item::before { content: ''; position: absolute; left: -2.5rem; top: 0.25rem; width: 1.25rem; height: 1.25rem; background-color: var(--color-primary); border-radius: 9999px; border: 4px solid var(--color-bg); box-shadow: 0 0 10px var(--color-primary); }
    .timeline-item .duration { font-size: 0.875rem; color: var(--color-text-light); margin-bottom: 0.25rem; }
    .timeline-item h3 { font-family: var(--font-heading); font-size: 1.25rem; font-weight: bold; color: white; margin: 0; }
    .timeline-item .company { color: var(--color-secondary); margin: 0.25rem 0 0.5rem 0; }
    .timeline-item p { color: #d1d5db; margin: 0; }

    #projects .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .project-card { display: block; text-decoration: none; border-radius: 0.5rem; overflow: hidden; }
    .project-card img { width: 100%; height: 15rem; object-fit: cover; }
    .project-card .info { padding: 1.5rem; }
    .project-card h3 { font-family: var(--font-heading); font-size: 1.25rem; font-weight: bold; color: white; margin: 0 0 0.5rem 0; }
    .project-card p { color: #d1d5db; font-size: 0.875rem; margin: 0; }

    #achievements .achievements-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .achievement-card { padding: 1.5rem; border-radius: 0.5rem; }
    .achievement-card h3 { font-family: var(--font-heading); font-size: 1.125rem; font-weight: bold; color: var(--color-primary); margin: 0; }
    .achievement-card p { color: var(--color-text-light); margin: 0.25rem 0 0 0; }

    footer { text-align: center; padding-top: 3rem; border-top: 1px solid #1f2937; }
    footer p { color: #4b5563; }
    footer .social-links { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1rem; }
    footer a { color: var(--color-text-light); text-decoration: none; }
    footer a:hover { color: var(--color-primary); }
  `;

  const renderSection = (title: string, id: string, content: string) => `
    <section id="${id}">
      <h2 class="section-title">${title}</h2>
      ${content}
    </section>
  `;

  const skillsHTML = `<div class="skills-container">${data.skills.map(skill => `<span class="skill-tag">${sanitize(skill)}</span>`).join('')}</div>`;
  
  const experienceHTML = `<div class="timeline">${data.experience.map(exp => `
    <div class="timeline-item">
      <p class="duration">${sanitize(exp.duration)}</p>
      <h3>${sanitize(exp.role)}</h3>
      <p class="company">${sanitize(exp.company)}</p>
      <p>${sanitize(exp.description)}</p>
    </div>`).join('')}</div>`;

  const educationHTML = `<div class="timeline">${data.education.map(edu => `
    <div class="timeline-item">
        <p class="duration">${sanitize(edu.duration)}</p>
        <h3>${sanitize(edu.institution)}</h3>
        <p class="company">${sanitize(edu.degree)}</p>
    </div>`).join('')}</div>`;

  const projectsHTML = `<div class="projects-grid">${data.projects.map(proj => `
    <a href="${sanitize(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-card glass-pane">
      <img src="${sanitize(proj.imageUrl)}" alt="${sanitize(proj.name)}">
      <div class="info">
        <h3>${sanitize(proj.name)}</h3>
        <p>${sanitize(proj.description)}</p>
      </div>
    </a>`).join('')}</div>`;

    const achievementsHTML = `<div class="achievements-grid">${data.achievements.map(ach => `
        <div class="achievement-card glass-pane">
            <h3>${sanitize(ach.title)}</h3>
            <p>${sanitize(ach.description)}</p>
        </div>
    `).join('')}</div>`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sanitize(data.name)}'s Portfolio</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
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
          ${renderSection('01 // PROFILE', 'about', `<p class="glass-pane">${sanitize(data.bio)}</p>`)}
          
          <section id="passion">
            <div class="content glass-pane">
                <h3>My Passion</h3>
                <p>${sanitize(data.passion)}</p>
            </div>
          </section>

          ${renderSection('02 // ARSENAL', 'skills', skillsHTML)}
          ${renderSection('03 // CHRONICLES', 'experience', experienceHTML)}
          ${renderSection('04 // BLUEPRINTS', 'projects', projectsHTML)}
          ${renderSection('05 // ACCOLADES', 'achievements', achievementsHTML)}
          ${renderSection('06 // ORIGINS', 'education', educationHTML)}
        </main>

        <footer>
          <p>Designed with PortaVerse</p>
          <div class="social-links">
            <a href="${sanitize(data.socials.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="${sanitize(data.socials.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </footer>
      </div>
    </body>
    </html>
  `;
};