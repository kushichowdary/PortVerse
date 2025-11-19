
export const getFontImports = (fontPair: string): string => {
    const fonts = new Set<string>();
    
    switch(fontPair) {
        case 'oswald-quicksand':
            fonts.add('Oswald:wght@400;500;700');
            fonts.add('Quicksand:wght@300;400;500;600;700');
            break;
        case 'syncopate-exo':
            fonts.add('Syncopate:wght@400;700');
            fonts.add('Exo+2:wght@300;400;600');
            break;
        case 'italiana-montserrat':
            fonts.add('Italiana');
            fonts.add('Montserrat:wght@300;400;500;600;700');
            break;
        case 'archivo-roboto':
            fonts.add('Archivo+Black');
            fonts.add('Roboto:wght@300;400;500;700');
            break;
        case 'space-dm':
            fonts.add('Space+Mono:wght@400;700');
            fonts.add('DM+Sans:wght@400;500;700');
            break;
        case 'syne-inter':
            fonts.add('Syne:wght@400;600;700;800');
            fonts.add('Inter:wght@300;400;500;600;700');
            break;
    }
    
    if (fonts.size === 0) return '';
    
    const fontQuery = Array.from(fonts).map(f => `family=${f}`).join('&');
    return `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?${fontQuery}&display=swap" rel="stylesheet">
    `;
};

export const getFontFamilies = (fontPair: string): { bodyFont: string, headingFont: string } => {
    switch(fontPair) {
        case 'oswald-quicksand':
            return { bodyFont: "'Quicksand', sans-serif", headingFont: "'Oswald', sans-serif" };
        case 'syncopate-exo':
            return { bodyFont: "'Exo 2', sans-serif", headingFont: "'Syncopate', sans-serif" };
        case 'italiana-montserrat':
            return { bodyFont: "'Montserrat', sans-serif", headingFont: "'Italiana', serif" };
        case 'archivo-roboto':
            return { bodyFont: "'Roboto', sans-serif", headingFont: "'Archivo Black', sans-serif" };
        case 'space-dm':
            return { bodyFont: "'DM Sans', sans-serif", headingFont: "'Space Mono', monospace" };
        case 'syne-inter':
            return { bodyFont: "'Inter', sans-serif", headingFont: "'Syne', sans-serif" };
        default:
             return { bodyFont: "'Quicksand', sans-serif", headingFont: "'Oswald', sans-serif" };
    }
};
