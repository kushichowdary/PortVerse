import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ThemeSettings } from '../../types';

const templates = [
    { id: 'futuristic', name: 'Futuristic' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'creative', name: 'Creative' },
] as const;

const colors = [
    { name: 'Cyan', value: '#22d3ee' },
    { name: 'Purple', value: '#c084fc' },
    { name: 'Green', value: '#4ade80' },
    { name: 'Orange', value: '#fb923c' },
    { name: 'Rose', value: '#fb7185' },
    { name: 'Indigo', value: '#818cf8' },
    { name: 'Amber', value: '#fcd34d' },
];

const fontPairs = [
    { id: 'orbitron-poppins', name: 'Orbitron / Poppins' },
    { id: 'inter-lora', name: 'Inter / Lora' },
    { id: 'playfair-montserrat', name: 'Playfair / Montserrat'},
    { id: 'roboto-mono-roboto', name: 'Roboto Mono / Roboto'},
] as const;

const getHeadingFontClass = (id: string) => {
    if (id.includes('orbitron')) return 'font-orbitron';
    if (id.includes('playfair')) return 'font-playfair';
    if (id.includes('lora')) return 'font-lora';
    if (id.includes('roboto-mono')) return 'font-roboto-mono';
    return '';
};

const getBodyFontClass = (id: string) => {
    if (id.includes('poppins')) return 'font-poppins';
    if (id.includes('montserrat')) return 'font-montserrat';
    if (id.includes('inter')) return 'font-inter';
    if (id.includes('roboto')) return 'font-roboto';
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
                <div className="grid grid-cols-3 gap-3">
                    {templates.map(template => (
                        <button 
                            key={template.id}
                            onClick={() => handleThemeChange('templateId', template.id)}
                            className={`p-3 rounded-lg border-2 text-center transition-all text-xs ${portfolioData.themeSettings.templateId === template.id ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-600 bg-gray-800 hover:border-gray-500'}`}
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
                        className={`p-4 rounded-lg border-2 text-center transition-all ${portfolioData.themeSettings.mode === 'dark' ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-600 bg-gray-800 hover:border-gray-500'}`}
                    >
                        Dark
                    </button>
                    <button 
                        onClick={() => handleThemeChange('mode', 'light')}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${portfolioData.themeSettings.mode === 'light' ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-600 bg-gray-800 hover:border-gray-500'}`}
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
                            className={`w-10 h-10 rounded-full border-2 transition-all ${portfolioData.themeSettings.primaryColor === color.value ? 'border-white scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: color.value }}
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
                            className={`p-4 rounded-lg border-2 text-center transition-all ${portfolioData.themeSettings.fontPair === font.id ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-600 bg-gray-800 hover:border-gray-500'}`}
                        >
                            <span className={getHeadingFontClass(font.id)}>Heading</span> 
                            {' / '}
                            <span className={getBodyFontClass(font.id)}>Body Text</span>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-800">
                <label className="sidebar-label text-red-400">Danger Zone</label>
                <button
                    onClick={handleReset}
                    className="w-full btn-secondary border-red-500 text-red-400 hover:bg-red-500/20"
                >
                    Reset Portfolio
                </button>
            </div>

             <style>{`
                .font-orbitron { font-family: 'Orbitron', sans-serif; }
                .font-poppins { font-family: 'Poppins', sans-serif; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .font-lora { font-family: 'Lora', serif; }
                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-montserrat { font-family: 'Montserrat', sans-serif; }
                .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
                .font-roboto { font-family: 'Roboto', sans-serif; }
            `}</style>
        </div>
    );
};

export default ThemeSection;