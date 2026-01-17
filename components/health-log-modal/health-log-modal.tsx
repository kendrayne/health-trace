'use client';

import { useState, useRef } from "react";
import { 
    X, Laugh, Smile, Meh, Frown, HeartCrack, 
    Search, Plus, Pill, Activity, Trash2,
    Wine, Cigarette, Leaf, Dumbbell
} from "lucide-react"; 
import { z } from 'zod';
import { HealthLogSchema } from "@/schemas"; 
import { format } from "date-fns";
import { cn } from "@/app/lib/utils"; 


const MOCK_BODY_PARTS = [
    { id: 'head', name: 'Head', symptoms: ['Headache', 'Migraine', 'Dizziness', 'Fog'] },
    { id: 'stomach', name: 'Stomach', symptoms: ['Nausea', 'Bloating', 'Cramps', 'Acid Reflux'] },
    { id: 'chest', name: 'Chest', symptoms: ['Palpitations', 'Tightness', 'Shortness of Breath'] },
    { id: 'general', name: 'General', symptoms: ['Fatigue', 'Fever', 'Chills', 'Body Aches'] },
];


type HealthLogData = z.infer<typeof HealthLogSchema>;

const SEVERITY_LEVELS = [
    { value: 0, label: "None", color: "bg-slate-100 text-slate-400 dark:bg-slate-800" },
    { value: 1, label: "Light", color: "bg-pacific-100 text-pacific-700 dark:bg-pacific-900/30 dark:text-pacific-300" },
    { value: 2, label: "Mod", color: "bg-peach-100 text-peach-700 dark:bg-peach-900/30 dark:text-peach-300" },
    { value: 3, label: "Heavy", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
];

const MOOD_OPTIONS = [
    { value: 1, icon: HeartCrack, label: "Awful", color: "text-red-500" },
    { value: 2, icon: Frown,      label: "Bad",   color: "text-orange-500" },
    { value: 3, icon: Meh,        label: "Okay",  color: "text-yellow-500" },
    { value: 4, icon: Smile,      label: "Good",  color: "text-pacific-500" },
    { value: 5, icon: Laugh,      label: "Great", color: "text-purple-500" },
];

export const HealthLogModal = ({ modalOpen, setModalOpen }: any) => {
    
    const [formDetails, setFormDetails] = useState<HealthLogData>({
        dietQuality: null, exercise: null, nicotine: null, alcohol: null,
        caffeine: null, marijuana: null, sleep: null, mood: null,
        loggedSymptoms: [], loggedMedications: [],
    });


    const [symptomQuery, setSymptomQuery] = useState("");
    const [medInput, setMedInput] = useState(""); 
    const [showSymptomResults, setShowSymptomResults] = useState(false);
    


    const addSymptom = (symptomName: string) => {
        if (formDetails.loggedSymptoms.includes(symptomName)) return;
        setFormDetails(prev => ({
            ...prev,
            loggedSymptoms: [...prev.loggedSymptoms, symptomName]
        }));
        setSymptomQuery("");
        setShowSymptomResults(false);
    };

    const addMedication = () => {
        if (!medInput.trim()) return;
        setFormDetails(prev => ({
            ...prev,
            loggedMedications: [...prev.loggedMedications, medInput]
        }));
        setMedInput(""); 
    };

    const removeSymptom = (index: number) => {
        setFormDetails(prev => ({
            ...prev,
            loggedSymptoms: prev.loggedSymptoms.filter((_, i) => i !== index)
        }));
    };

    const removeMed = (index: number) => {
        setFormDetails(prev => ({
            ...prev,
            loggedMedications: prev.loggedMedications.filter((_, i) => i !== index)
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            action();
        }
    };

    if (!modalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-pacific-900/20 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300" 
                onClick={() => setModalOpen(false)}
            />

            <div className="relative w-full max-w-2xl bg-white/80 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl rounded-3xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                

                <div className="flex justify-between items-center px-8 py-6 border-b border-pacific-100/50 dark:border-white/5 bg-white/50 dark:bg-black/20">
                    <div>
                        <h2 className="text-xl font-bold text-pacific-900 dark:text-pacific-50">How was your day today?</h2>
                        <p className="text-xs font-medium text-pacific-500 uppercase tracking-wider mt-1">
                            {format(new Date(), "EEEE, MMMM do")}
                        </p>
                    </div>
                    <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-pacific-100 dark:hover:bg-white/10 rounded-full transition-colors text-pacific-400">
                        <X size={20}/>
                    </button>
                </div>


                <div className="overflow-y-auto p-8 space-y-10 custom-scrollbar">


                    <section className="space-y-4">
                        <label className="text-xs font-bold text-pacific-400 uppercase tracking-widest">Current Mood</label>
                        <div className="flex justify-between gap-2 p-2 bg-pacific-50/50 dark:bg-white/5 rounded-2xl">
                            {MOOD_OPTIONS.map((option) => {
                                const Icon = option.icon;
                                const isSelected = formDetails.mood === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => setFormDetails({ ...formDetails, mood: option.value })}
                                        className={cn(
                                            "flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all duration-200 group",
                                            isSelected ? "bg-white dark:bg-white/10 shadow-sm scale-105" : "hover:bg-white/50 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <Icon size={28} className={cn("transition-colors duration-300", isSelected ? option.color : "text-slate-300 dark:text-slate-600")} strokeWidth={isSelected ? 2.5 : 2} />
                                    </button>
                                )
                            })}
                        </div>
                    </section>

                    <div className="w-full h-px bg-slate-100 dark:bg-white/5" />


                    <section className="space-y-4">
                        <label className="text-xs font-bold text-pacific-400 uppercase tracking-widest">Habits</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <HabitControl icon={Wine} label="Alcohol" value={formDetails.alcohol} onChange={(v: any) => setFormDetails({...formDetails, alcohol: v})} />
                            <HabitControl icon={Cigarette} label="Nicotine" value={formDetails.nicotine} onChange={(v: any) => setFormDetails({...formDetails, nicotine: v})} />
                            <HabitControl icon={Leaf} label="Marijuana" value={formDetails.marijuana} onChange={(v: any) => setFormDetails({...formDetails, marijuana: v})} />
                            <HabitControl icon={Dumbbell} label="Exercise" value={formDetails.exercise} onChange={(v: any) => setFormDetails({...formDetails, exercise: v})} />
                        </div>
                    </section>


                    <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                             <label className="text-xs font-bold text-pacific-400 uppercase tracking-widest">Sleep</label>
                             {formDetails.sleep && <span className="text-xs text-pacific-600 font-mono bg-pacific-100 px-2 py-0.5 rounded-md">{formDetails.sleep} hrs</span>}
                        </div>
                        <div className="relative group">
                            <input 
                                type="range" min="0" max="14" step="0.5"
                                className="w-full h-4 bg-slate-100 rounded-lg appearance-none cursor-pointer dark:bg-white/5 accent-pacific-500"
                                value={formDetails.sleep ?? 0}
                                onChange={(e) => setFormDetails({...formDetails, sleep: parseFloat(e.target.value)})}
                            />
                             <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
                                <span>0h</span>
                                <span>14h+</span>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-slate-100 dark:bg-white/5" />


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        

                        <section className="space-y-4">
                            <label className="text-xs font-bold text-pacific-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={14} /> Symptoms
                            </label>
                            
                            <div className="relative group">
                                <div className="absolute left-3 top-2.5 text-pacific-300"><Search size={16} /></div>
                                <input 
                                    type="text" 
                                    placeholder="Search symptoms..." 
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pacific-500/50 outline-none text-sm"
                                    value={symptomQuery}
                                    onChange={(e) => { setSymptomQuery(e.target.value); setShowSymptomResults(true); }}
                                    onBlur={() => setTimeout(() => setShowSymptomResults(false), 200)}
                                />
                                

                                {showSymptomResults && symptomQuery && (
                                    <div className="absolute z-20 w-full mt-2 bg-white dark:bg-surface-dark-elevated border border-slate-100 dark:border-white/5 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                        {MOCK_BODY_PARTS.map(part => {
                                            const matches = part.symptoms.filter(s => s.toLowerCase().includes(symptomQuery.toLowerCase()));
                                            if (matches.length === 0) return null;
                                            return (
                                                <div key={part.id}>
                                                    <div className="px-3 py-1 bg-slate-50 dark:bg-white/5 text-[10px] uppercase font-bold text-pacific-400">{part.name}</div>
                                                    {matches.map(sym => (
                                                        <button 
                                                            key={sym}
                                                            className="w-full text-left px-4 py-2 text-sm hover:bg-pacific-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 flex justify-between group/item"
                                                            onClick={() => addSymptom(sym)}
                                                        >
                                                            {sym}
                                                            <Plus size={14} className="opacity-0 group-hover/item:opacity-100 text-pacific-500"/>
                                                        </button>
                                                    ))}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formDetails.loggedSymptoms.map((sym, i) => (
                                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-500/20 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 animate-in zoom-in-90">
                                        <span>{sym}</span>
                                        <button onClick={() => removeSymptom(i)} className="hover:text-red-900"><X size={12}/></button>
                                    </div>
                                ))}
                            </div>
                        </section>


                        <section className="space-y-4">
                            <label className="text-xs font-bold text-pacific-400 uppercase tracking-widest flex items-center gap-2">
                                <Pill size={14} /> Medications
                            </label>
                            
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Taken (e.g. 200mg Ibuprofen)" 
                                    className="flex-1 px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pacific-500/50 outline-none text-sm"
                                    value={medInput}
                                    onChange={(e) => setMedInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, addMedication)}
                                />
                                <button 
                                    onClick={addMedication}
                                    className="p-2 bg-pacific-100 dark:bg-white/10 rounded-xl text-pacific-600 dark:text-pacific-300 hover:bg-pacific-200"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {formDetails.loggedMedications.map((med, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 bg-pacific-50 dark:bg-pacific-900/10 border border-pacific-100 dark:border-pacific-500/20 rounded-lg text-xs font-medium text-pacific-800 dark:text-pacific-200 animate-in slide-in-from-left-2">
                                        <span>{med}</span>
                                        <button onClick={() => removeMed(i)} className="p-1 hover:text-red-500 text-pacific-400"><Trash2 size={14}/></button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                </div>


                <div className="p-6 border-t border-pacific-100/50 dark:border-white/5 bg-white/50 dark:bg-black/20 flex justify-end gap-3 backdrop-blur-md">
                    <button 
                        onClick={() => setModalOpen(false)}
                        className="px-6 py-2.5 text-sm font-medium text-pacific-600 hover:text-pacific-800 dark:text-pacific-300 dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-8 py-2.5 bg-gradient-to-r from-pacific-500 to-pacific-600 hover:from-pacific-400 hover:to-pacific-500 text-white rounded-xl shadow-lg shadow-pacific-500/20 text-sm font-bold tracking-wide transition-all transform active:scale-95">
                        Save Entry
                    </button>
                </div>
            </div>
        </div>
    );
};


const HabitControl = ({ icon: Icon, label, value, onChange }: any) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-pacific-800 dark:text-pacific-200">
                <div className="p-1.5 bg-pacific-100 dark:bg-pacific-900/30 rounded-md">
                    <Icon size={14} className="text-pacific-600 dark:text-pacific-400" />
                </div>
                <span className="text-sm font-semibold">{label}</span>
            </div>
            
            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                {SEVERITY_LEVELS.map((level) => {
                    const isActive = value === level.value;
                    return (
                        <button
                            key={level.value}
                            onClick={() => onChange(level.value)}
                            className={cn(
                                "flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200",
                                isActive ? level.color + " shadow-sm" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            )}
                        >
                            {level.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};