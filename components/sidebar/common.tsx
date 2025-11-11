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
}

type ListSectionName = 'projects' | 'experience' | 'education' | 'achievements';

interface ListSectionProps<T extends ListSectionName, V extends ListItem> {
    sectionName: T;
    singularName: string;
    fields: FieldConfig<V>[];
    defaultItem: Omit<V, 'id'>;
}

export const ListSection = <T extends ListSectionName, V extends ListItem>({ sectionName, singularName, fields, defaultItem }: ListSectionProps<T, V>) => {
    const { portfolioData, dispatch } = usePortfolio();
    const endOfListRef = useRef<HTMLDivElement>(null);

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

    const addItem = () => {
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
                        {fields.map(field => (
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
                        ))}
                    </motion.div>
                )) : (
                   <p className="text-center text-gray-500 py-4">No {sectionName} added yet.</p> 
                )}
            </AnimatePresence>
            <div ref={endOfListRef} />
            <button onClick={addItem} className="btn-futuristic primary w-full">Add {singularName}</button>
        </div>
    );
};