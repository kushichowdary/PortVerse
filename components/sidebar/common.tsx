import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { PortfolioData, ListItem } from '../../types';

const itemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
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
    const endOfListRef = useRef<HTMLDivElement>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // FIX: Use `as unknown as V[]` for type assertion. TypeScript cannot infer that `V`
    // corresponds to the type of array accessed by `sectionName`, but the component's
    // usage ensures this is a safe cast.
    const items = portfolioData[sectionName] as unknown as V[];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const newArr = [...items];
        newArr[index] = { ...newArr[index], [name]: value };
        const payload: Partial<PortfolioData> = { [sectionName]: newArr };
        dispatch({ type: 'UPDATE_DATA', payload });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: keyof Omit<V, 'id'>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newArr = [...items];
                newArr[index] = { ...newArr[index], [fieldName]: reader.result as string };
                const payload: Partial<PortfolioData> = { [sectionName]: newArr };
                dispatch({ type: 'UPDATE_DATA', payload });
            };
            reader.readAsDataURL(file);
        }
    };


    const addItem = () => {
        if (maxItems && items.length >= maxItems) {
            return; // Prevent adding more items if limit is reached
        }
        const newItem = { id: crypto.randomUUID(), ...defaultItem };
        const newArr = [...items, newItem];
        const payload: Partial<PortfolioData> = { [sectionName]: newArr };
        dispatch({ type: 'UPDATE_DATA', payload });

        setTimeout(() => {
            endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const removeItem = (idToRemove: string) => {
        const newArr = items.filter(item => item.id !== idToRemove);
        const payload: Partial<PortfolioData> = { [sectionName]: newArr };
        dispatch({ type: 'UPDATE_DATA', payload });
    };

    const isLimitReached = maxItems ? items.length >= maxItems : false;

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {items.length > 0 ? items.map((item, index) => (
                    <motion.div 
                        key={item.id} 
                        variants={itemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                        className="p-4 border border-gray-700/50 rounded-lg space-y-3 bg-black/20 relative">
                         <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-400 font-bold text-2xl z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/20 transition-colors">&times;</button>
                        {fields.map(field => {
                            if (field.isImageUpload) {
                                return (
                                    <div key={field.name as string}>
                                        <label className="sidebar-label">{field.label}</label>
                                        <div className="flex items-center gap-4">
                                            <img src={item[field.name as keyof V] as string} alt="Preview" className="w-16 h-16 rounded-md object-cover border-2 border-gray-600" />
                                            <div className="flex-grow">
                                                <button
                                                    onClick={() => fileInputRefs.current[index]?.click()}
                                                    className="btn-futuristic primary w-full mb-2"
                                                    style={{fontSize: '0.75rem', padding: '0.5rem 1rem'}}
                                                >
                                                    Upload Image
                                                </button>
                                                <input
                                                    type="text"
                                                    name={field.name as string}
                                                    value={item[field.name as keyof V] as string}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    className="input-field-futuristic text-xs"
                                                    placeholder="Or paste image URL"
                                                />
                                                <input
                                                    type="file"
                                                    ref={el => { if(el) fileInputRefs.current[index] = el; }}
                                                    onChange={(e) => handleImageUpload(e, index, field.name)}
                                                    accept="image/*"
                                                    className="hidden"
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
                                            className="input-field-futuristic"
                                        />
                                     ) : (
                                         <input 
                                            type={field.type || 'text'} 
                                            name={field.name as string} 
                                            value={item[field.name as keyof V] as string} 
                                            onChange={(e) => handleInputChange(e, index)} 
                                            className="input-field-futuristic" 
                                        />
                                     )}
                                 </div>
                            )
                        })}
                    </motion.div>
                )) : (
                   <p className="text-center text-gray-500 py-4">No {sectionName} added yet.</p> 
                )}
            </AnimatePresence>
            <div ref={endOfListRef} />
            <button 
                onClick={addItem} 
                className="btn-futuristic primary w-full"
                disabled={isLimitReached}
            >
                {isLimitReached ? `${singularName} Limit Reached` : `Add ${singularName}`}
            </button>
        </div>
    );
};