
import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ThemeSettings } from '../../types';

const templates = [
    { id: 'futuristic', name: 'Futuristic' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'neobrutalist', name: 'Neobrutalist' },
    { id: 'modern', name: 'Modern' },
    { id: 'elegant', name: 'Elegant' },
    { id: 'techdoc', name: 'TechDoc' },
    { id: 'studio', name: 'Studio' },
] as const;

const colors = [
    { name: 'Cyan', value: '#22d3ee' },
    { name: 'Purple', value: '#c084fc' },
    { name: 'Green', value: '#4ade80' },
    { name: 'Orange', value: '#fb923c' },
    { name: 'Rose', value: '#fb7185' },
    { name: 'Indigo', value: '#818cf8' },
    { name: 'Amber', value: '#fcd34d' },
    { name: 'Sky', value: '#38bdf8' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Lime', value: '#a3e635' },
    { name: 'Slate', value: '#94a3b8' },
    { name: 'Gold', value: '#d4af37' },
    { name: 'Black', value: '#000000' },
    { name: 'Blue', value: '#3b82f6' },
];

const fontPairs = [
    { id: 'orbitron-poppins', name: 'Orbitron / Poppins' },
    { id: 'inter-lora', name: 'Inter / Lora' },
    { id: 'playfair-montserrat', name: 'Playfair / Montserrat'},
    { id: 'roboto-mono-roboto', name: 'Roboto Mono / Roboto'},
    { id: 'space-grotesk-inter', name: 'Space Grotesk / Inter'},
    { id: 'cinzel-lato', name: 'Cinzel / Lato'},
] as const;

const getHeadingFontClass = (id: string) => {
    if (id.includes('orbitron')) return 'font-orbitron';
    if (id.includes('playfair')) return 'font-playfair';
    if (id.includes('inter')) return 'font-inter';
    if (id.includes('roboto-mono')) return 'font-roboto-mono';
    if (id.includes('space-grotesk')) return 'font-space-grotesk';
    if (id.includes('cinzel')) return 'font-serif';
    return '';
};

const getBodyFontClass = (id: string) => {
    if (id.includes('poppins')) return 'font-poppins';
    if (id.includes('montserrat')) return 'font-montserrat';
    if (id.includes('lora')) return 'font-lora';
    if (id.includes('roboto')) return 'font-roboto';
    if (id.includes('inter')) return 'font-inter';
    if (id.includes('lato')) return 'font-sans';
    return '';
};


const ThemeSection: React.FC = () => {
    const { portfolioData, dispatch } = usePortfolio();

    const handleThemeChange = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
        dispatch({
            type: 'UPDATE_DATA',
            payload: {
                themeSettings: {
                    ...portfolioData.themeSettings,
                    [key]: value
                }
            }
        });
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all portfolio data? This action cannot be undone.')) {
            dispatch({ type: 'RESET_DATA' });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="sidebar-label">Template</label>
                <div className="grid grid-cols-2 gap-3">
                    {templates.map(template => (
                        <button 
                            key={template.id}
                            onClick={() => handleThemeChange('templateId', template.id)}
                            className={`theme-picker-btn text-xs ${portfolioData.themeSettings.templateId === template.id ? 'active' : ''}`}
                        >
                            {template.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="sidebar-label">Mode</label>
                 <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => handleThemeChange('mode', 'dark')}
                        className={`theme-picker-btn ${portfolioData.themeSettings.mode === 'dark' ? 'active' : ''}`}
                    >
                        Dark
                    </button>
                    <button 
                        onClick={() => handleThemeChange('mode', 'light')}
                        className={`theme-picker-btn ${portfolioData.themeSettings.mode === 'light' ? 'active' : ''}`}
                    >
                        Light
                    </button>
                </div>
            </div>

            <div>
                <label className="sidebar-label">Primary Color</label>
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                        <button 
                            key={color.value}
                            onClick={() => handleThemeChange('primaryColor', color.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${portfolioData.themeSettings.primaryColor === color.value ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                            style={{ backgroundColor: color.value, boxShadow: portfolioData.themeSettings.primaryColor === color.value ? `0 0 15px ${color.value}` : 'none' }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="sidebar-label">Font Pairing</label>
                <div className="grid grid-cols-1 gap-3">
                     {fontPairs.map(font => (
                        <button 
                            key={font.id}
                            onClick={() => handleThemeChange('fontPair', font.id)}
                            className={`theme-picker-btn ${portfolioData.themeSettings.fontPair === font.id ? 'active' : ''}`}
                        >
                            <span className={getHeadingFontClass(font.id)}>Heading</span> 
                            {' / '}
                            <span className={getBodyFontClass(font.id)}>Body Text</span>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-700/50">
                <label className="sidebar-label text-red-400">Danger Zone</label>
                <button
                    onClick={handleReset}
                    className="w-full btn-modern danger"
                >
                    Reset Portfolio
                </button>
            </div>
        </div>
    );
};

export default ThemeSection;