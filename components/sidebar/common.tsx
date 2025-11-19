import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { PortfolioData, ListItem } from '../../types';
import { useToast } from '../../hooks/useToast';

const listContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.3 } },
  exit: { opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.2 } },
};

interface FieldConfig<V> {
    name: keyof Omit<V, 'id'>;
    label: string;
    type?: string;
    isTextArea?: boolean;
    isImageUpload?: boolean;
}

type ListSectionName = 'projects' | 'experience' | 'education' | 'achievements';

interface ListSectionProps<T extends ListSectionName, V extends ListItem> {
    sectionName: T;
    singularName: string;
    fields: FieldConfig<V>[];
    defaultItem: Omit<V, 'id'>;
    maxItems?: number;
}

export const ListSection = <T extends ListSectionName, V extends ListItem>({ sectionName, singularName, fields, defaultItem, maxItems }: ListSectionProps<T, V>) => {
    const { portfolioData, dispatch } = usePortfolio();
    const { addToast } = useToast();
    const endOfListRef = useRef<HTMLDivElement>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const items = portfolioData[sectionName] as unknown as V[];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        updateItem(index, name as keyof Omit<V, 'id'>, value);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>, label: string, type?: string) => {
        if (type === 'url' && e.target.value) {
            try {
                new URL(e.target.value);
            } catch (_) {
                addToast(`Invalid URL format for ${label}. Please ensure it starts with http:// or https://`, 'error');
            }
        }
    };

    const updateItem = (index: number, field: keyof Omit<V, 'id'>, value: any) => {
        const newArr = [...items];
        newArr[index] = { ...newArr[index], [field]: value };
        const payload: Partial<PortfolioData> = { [sectionName]: newArr };
        dispatch({ type: 'UPDATE_DATA', payload });
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: keyof Omit<V, 'id'>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateItem(index, fieldName, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addItem = () => {
        if (maxItems && items.length >= maxItems) return;
        const newItem = { id: crypto.randomUUID(), ...defaultItem };
        const newArr = [...items, newItem];
        dispatch({ type: 'UPDATE_DATA', payload: { [sectionName]: newArr } });
        setTimeout(() => endOfListRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const removeItem = (idToRemove: string) => {
        const newArr = items.filter(item => item.id !== idToRemove);
        dispatch({ type: 'UPDATE_DATA', payload: { [sectionName]: newArr } });
    };

    const isLimitReached = maxItems ? items.length >= maxItems : false;

    return (
        <motion.div className="space-y-6" variants={listContainerVariants} initial="hidden" animate="show">
            <AnimatePresence mode="popLayout">
                {items.length > 0 ? items.map((item, index) => (
                    <motion.div 
                        key={item.id} 
                        variants={itemVariants}
                        layout
                        className="p-5 rounded-xl space-y-4 bg-slate-800/30 border border-slate-700/50 relative group hover:border-slate-600/50 transition-colors shadow-lg"
                    >
                        <div className="absolute -left-[1px] top-4 bottom-4 w-[3px] bg-violet-500/30 rounded-r-full group-hover:bg-violet-500 transition-colors"></div>
                        
                        <button 
                            onClick={() => removeItem(item.id)} 
                            className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors bg-slate-900/50 hover:bg-slate-800 rounded-full w-7 h-7 flex items-center justify-center"
                            title="Delete Item"
                        >
                            &times;
                        </button>

                        {fields.map(field => {
                            if (field.isImageUpload) {
                                return (
                                    <div key={field.name as string}>
                                        <label className="sidebar-label">{field.label}</label>
                                        <div className="flex items-center gap-3 p-2 bg-black/20 rounded-lg border border-white/5">
                                            <div className="w-12 h-12 shrink-0 rounded overflow-hidden bg-slate-900">
                                                <img src={item[field.name as keyof V] as string} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                            </div>
                                            <div className="flex-grow flex flex-col gap-2">
                                                <div className="flex gap-2">
                                                     <button
                                                        onClick={() => fileInputRefs.current[index]?.click()}
                                                        className="btn-modern secondary py-1 text-[10px] h-7 flex-1"
                                                    >
                                                        Select Image
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={el => { if(el) fileInputRefs.current[index] = el; }}
                                                        onChange={(e) => handleImageUpload(e, index, field.name)}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={item[field.name as keyof V] as string}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    className="input-field-modern !py-1 !text-[10px] !bg-transparent !border-none focus:!ring-0 !p-0"
                                                    placeholder="Or paste URL..."
                                                    name={field.name as string}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                 <div key={field.name as string}>
                                     <label className="sidebar-label">{field.label}</label>
                                     {field.isTextArea ? (
                                         <textarea 
                                            name={field.name as string} 
                                            value={item[field.name as keyof V] as string}
                                            onChange={(e) => handleInputChange(e, index)} 
                                            rows={3} 
                                            className="input-field-modern resize-none"
                                        />
                                     ) : (
                                         <input 
                                            type={field.type || 'text'} 
                                            name={field.name as string} 
                                            value={item[field.name as keyof V] as string} 
                                            onChange={(e) => handleInputChange(e, index)}
                                            onBlur={(e) => handleInputBlur(e, field.label, field.type)}
                                            className="input-field-modern" 
                                        />
                                     )}
                                 </div>
                            )
                        })}
                    </motion.div>
                )) : (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20"
                    >
                        <p className="text-slate-500 text-sm font-medium">Empty Section</p>
                        <p className="text-slate-600 text-xs mt-1">Add your {singularName.toLowerCase()} to get started</p>
                    </motion.div> 
                )}
            </AnimatePresence>
            <div ref={endOfListRef} />
            <motion.button 
                onClick={addItem} 
                className="btn-modern primary w-full group relative overflow-hidden"
                disabled={isLimitReached}
                whileTap={{ scale: 0.98 }}
            >
                <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    {isLimitReached ? `Max ${singularName} Reached` : `Add New ${singularName}`}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
            </motion.button>
        </motion.div>
    );
};