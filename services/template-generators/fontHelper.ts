export const getFontImports = (fontPair: string): string => {
    const fonts = new Set<string>();
    
    switch(fontPair) {
        case 'orbitron-poppins':
            fonts.add('Orbitron:wght@400;700;900');
            fonts.add('Poppins:wght@300;400;600;700');
            break;
        case 'inter-lora':
            fonts.add('Inter:wght@300;400;500;600;700');
            fonts.add('Lora:wght@400;500;600;700');
            break;
        case 'playfair-montserrat':
            fonts.add('Playfair+Display:wght@400;700');
            fonts.add('Montserrat:wght@400;500;700');
            break;
        case 'roboto-mono-roboto':
            fonts.add('Roboto+Mono:wght@400;500');
            fonts.add('Roboto:wght@400;500;700');
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
        case 'orbitron-poppins':
            return { bodyFont: "'Poppins', sans-serif", headingFont: "'Orbitron', sans-serif" };
        case 'inter-lora':
            return { bodyFont: "'Inter', sans-serif", headingFont: "'Lora', serif" };
        case 'playfair-montserrat':
            return { bodyFont: "'Montserrat', sans-serif", headingFont: "'Playfair Display', serif" };
        case 'roboto-mono-roboto':
            return { bodyFont: "'Roboto', sans-serif", headingFont: "'Roboto Mono', monospace" };
        default:
             return { bodyFont: "'Poppins', sans-serif", headingFont: "'Orbitron', sans-serif" };
    }
};