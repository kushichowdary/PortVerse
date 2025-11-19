
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
    { id: 'cyber', name: 'Cyber' },
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
    { id: 'oswald-quicksand', name: 'Oswald / Quicksand', style: 'Modern Condensed' },
    { id: 'syncopate-exo', name: 'Syncopate / Exo 2', style: 'Futuristic Wide' },
    { id: 'italiana-montserrat', name: 'Italiana / Montserrat', style: 'Elegant Editorial' },
    { id: 'archivo-roboto', name: 'Archivo / Roboto', style: 'Bold Impact' },
    { id: 'space-dm', name: 'Space Mono / DM Sans', style: 'Digital Brutalist' },
    { id: 'syne-inter', name: 'Syne / Inter', style: 'Avant-Garde' },
] as const;

const getHeadingFontClass = (id: string) => {
    if (id.includes('oswald')) return 'font-oswald';
    if (id.includes('syncopate')) return 'font-syncopate';
    if (id.includes('italiana')) return 'font-italiana';
    if (id.includes('archivo')) return 'font-archivo';
    if (id.includes('space')) return 'font-space';
    if (id.includes('syne')) return 'font-syne';
    return '';
};

const getBodyFontClass = (id: string) => {
    if (id.includes('quicksand')) return 'font-quicksand';
    if (id.includes('exo')) return 'font-exo';
    if (id.includes('montserrat')) return 'font-montserrat';
    if (id.includes('roboto')) return 'font-roboto';
    if (id.includes('dm')) return 'font-dm';
    if (id.includes('inter')) return 'font-inter';
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
                <label className="sidebar-label">Typography Style</label>
                <div className="grid grid-cols-1 gap-3">
                     {fontPairs.map(font => (
                        <button 
                            key={font.id}
                            onClick={() => handleThemeChange('fontPair', font.id)}
                            className={`theme-picker-btn text-left px-4 !flex flex-col items-start gap-1 ${portfolioData.themeSettings.fontPair === font.id ? 'active' : ''}`}
                        >
                            <span className="text-[10px] uppercase tracking-widest opacity-60">{font.style}</span>
                            <div className="flex items-baseline gap-2">
                                <span className={`${getHeadingFontClass(font.id)} text-base`}>Abc</span> 
                                <span className="opacity-50">/</span>
                                <span className={`${getBodyFontClass(font.id)} text-sm opacity-90`}>Abc</span>
                            </div>
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
