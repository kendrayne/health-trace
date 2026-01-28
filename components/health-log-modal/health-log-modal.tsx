'use client';

import { useState, useEffect } from "react";
import { 
    X, Laugh, Smile, Meh, Frown, HeartCrack, 
    Search, Plus, Pill, Activity, Trash2,
    Wine, Cigarette, Leaf, Dumbbell, Utensils,
    Droplets, Minus, Moon, Check, Loader2, Coffee,
    Clock // Added Clock icon
} from "lucide-react"; 
import { format } from "date-fns";
import { cn } from "@/app/lib/utils"; 
import { type Session } from 'next-auth';


interface UserProps {
  user: Session['user'];
  id: string
} 

interface SymptomGroup {
  id: string;
  name: string;
  symptoms: {
    id: string;
    description: string;
  }[];
}

interface LoggedSymptomItem {
  id: string;
  name: string;
  severity: number;
  occuredAt: string; 
}

interface LoggedMedicationItem {
  name: string;
  strength: number | null;
  unit: string | null;
}

interface HealthLogData {
    dietQuality: number | null;
    exercise: number | null;
    nicotine: number | null;
    alcohol: number | null;
    caffeine: number | null;
    marijuana: number | null;
    sleep: number | null;
    mood: number | null;
    loggedSymptoms: LoggedSymptomItem[]; 
    loggedMedications: LoggedMedicationItem[]; 
    water: number | null;
    userId: string | undefined;
}



const SEVERITY_LEVELS = [
    { value: 0, label: "None", color: "bg-slate-100 text-slate-400 dark:bg-slate-800" },
    { value: 1, label: "Light", color: "bg-pacific-100 text-pacific-700 dark:bg-pacific-900/30 dark:text-pacific-300" },
    { value: 2, label: "Moderate", color: "bg-peach-100 text-peach-700 dark:bg-peach-900/30 dark:text-peach-300" }, 
    { value: 3, label: "Heavy", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
];

const SEVERITY_LEVELS_FOOD = [
    { value: 0, label: "Healthy", color: "bg-pacific-100 text-pacific-700 dark:bg-pacific-900/30 dark:text-pacific-300" },
    { value: 1, label: "Balanced", color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
    { value: 2, label: "Unhealthy", color: "bg-peach-100 text-peach-700 dark:bg-peach-900/30 dark:text-peach-300" },
];

const MOOD_OPTIONS = [
    { value: 1, icon: HeartCrack, label: "Awful", color: "text-red-500" },
    { value: 2, icon: Frown,      label: "Bad",   color: "text-orange-500" },
    { value: 3, icon: Meh,        label: "Okay",  color: "text-yellow-500" },
    { value: 4, icon: Smile,      label: "Good",  color: "text-pacific-500" },
    { value: 5, icon: Laugh,      label: "Great", color: "text-purple-500" },
];



function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}



export const HealthLogModal = ({ modalOpen, setModalOpen, user }: { modalOpen: boolean; setModalOpen: (v: boolean) => void, user: Session["user"] }) => {
    

    const [formDetails, setFormDetails] = useState<HealthLogData>({
        dietQuality: null, exercise: null, nicotine: null, alcohol: null,
        caffeine: null, marijuana: null, sleep: null, mood: null,
        loggedSymptoms: [], 
        loggedMedications: [], 
        water: 0,
        userId: user?.id
    });


    const [symptomQuery, setSymptomQuery] = useState("");
    const debouncedSymptomQuery = useDebounce(symptomQuery, 300);
    const [isSearching, setIsSearching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    

    const [pendingSymptom, setPendingSymptom] = useState<{id: string, name: string} | null>(null);


    const [medInput, setMedInput] = useState(""); 
    const [symptomResults, setSymptomResults] = useState<SymptomGroup[]>([]);


    useEffect(() => {
        let isActive = true;

        const searchSymptoms = async () => {
            if (!debouncedSymptomQuery) {
                setSymptomResults([]);
                return;
            }

            setIsSearching(true);

            try {
                const response = await fetch(`/api/symptoms?input=${debouncedSymptomQuery}`);
                const data = await response.json();

                if (!isActive) return;

                const { bodyPartsSymptomsQuery, symptomsDataQuery } = data;

                if (bodyPartsSymptomsQuery && bodyPartsSymptomsQuery.length > 0) {
                    const cleanData = bodyPartsSymptomsQuery.map((group: any) => ({
                        id: group.id,
                        name: group.name,
                        symptoms: group.symptoms.map((s: any) => ({
                            id: s.id,
                            description: s.description
                        }))
                    }));
                    setSymptomResults(cleanData);
                } 
                else if (symptomsDataQuery && symptomsDataQuery.length > 0) {
                    const groupedMap: Record<string, SymptomGroup> = {};

                    symptomsDataQuery.forEach((sym: any) => {
                        const bpName = sym.bodyPart.name;
                        const bpId = sym.bodyPart.id;

                        if (!groupedMap[bpName]) {
                            groupedMap[bpName] = { id: bpId, name: bpName, symptoms: [] };
                        }
                       
                        groupedMap[bpName].symptoms.push({
                            id: sym.id,
                            description: sym.description
                        });
                    });

                    setSymptomResults(Object.values(groupedMap));
                } else {
                    setSymptomResults([]);
                }

            } catch (error) {
                console.error("Failed to search symptoms", error);
            } finally {
                if (isActive) setIsSearching(false);
            }
        };

        searchSymptoms();
        return () => { isActive = false; };
    }, [debouncedSymptomQuery]); 

    // --- HANDLERS ---

    const handleSymptomClick = (symptom: { id: string, description: string }) => {
        const exists = formDetails.loggedSymptoms.some(s => s.id === symptom.id);
        
        if (exists) {
            setFormDetails(prev => ({
                ...prev,
                loggedSymptoms: prev.loggedSymptoms.filter(s => s.id !== symptom.id)
            }));
        } else {
            // Open the Severity Window
            setPendingSymptom({ id: symptom.id, name: symptom.description });
        }
    };

    const finalizeSymptom = (severity: number, time: string) => {
        if (!pendingSymptom) return;

        setFormDetails(prev => ({
            ...prev,
            loggedSymptoms: [
                ...prev.loggedSymptoms,
                { 
                    id: pendingSymptom.id, 
                    name: pendingSymptom.name, 
                    severity, 
                    occuredAt: time 
                }
            ]
        }));
        
        setPendingSymptom(null); // Close popup
        setSymptomQuery(""); // Optional: clear search after adding
    };

    const removeSymptom = (index: number) => {
        setFormDetails(prev => ({
            ...prev,
            loggedSymptoms: prev.loggedSymptoms.filter((_, i) => i !== index)
        }));
    };

    const addMedication = () => {
        if (!medInput.trim()) return;
        const regex = /^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?\s+(.+)$/;
        const match = medInput.match(regex);
        let newMed: LoggedMedicationItem;

        if (match) {
            newMed = {
                strength: parseFloat(match[1]),
                unit: match[2] || 'mg', 
                name: match[3]
            };
        } else {
            newMed = { name: medInput, strength: null, unit: null };
        }

        setFormDetails(prev => ({ ...prev, loggedMedications: [...prev.loggedMedications, newMed] }));
        setMedInput(""); 
    };

    const removeMedication = (index: number) => {
        setFormDetails(prev => ({
            ...prev,
            loggedMedications: prev.loggedMedications.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/healthlog', {
                method: 'POST',
                body: JSON.stringify(formDetails),
                headers: { "Content-Type" : 'application/json' },
            });
            const data = await res.json();
            if(data.success) {
                setModalOpen(false);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error submitting log", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { 

            if (pendingSymptom && e.key === 'Escape') {
                setPendingSymptom(null);
                return;
            }
            if (e.key === 'Escape') setModalOpen(false) 
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setModalOpen, pendingSymptom]);

    if (!modalOpen) return null;

    return (
        <form className="fixed inset-0 z-50 flex items-center justify-center p-4" onSubmit={handleSubmit}>
            

            <div 
                className="absolute inset-0 bg-pacific-900/30 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300" 
                onClick={() => setModalOpen(false)}
            />


            <div className="relative w-full max-w-5xl bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl rounded-3xl flex flex-col h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                

                {pendingSymptom && (
                    <SeverityWindow 
                        symptomName={pendingSymptom.name}
                        onSelect={finalizeSymptom}
                        onCancel={() => setPendingSymptom(null)}
                    />
                )}


                <div className="flex justify-between items-center px-6 py-4 border-b border-pacific-100/50 dark:border-white/5 bg-white/50 dark:bg-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1 bg-pacific-500 rounded-full" />
                        <div>
                            <h2 className="text-lg font-bold text-pacific-900 dark:text-pacific-50">Daily Check-in</h2>
                            <p className="text-[10px] font-bold text-pacific-400 uppercase tracking-widest">
                                {format(new Date(), "EEEE, MMMM do")}
                            </p>
                        </div>
                    </div>
                    <button type="button" onClick={() => setModalOpen(false)} className="p-2 hover:bg-pacific-100 dark:hover:bg-white/10 rounded-full transition-colors text-pacific-400">
                        <X size={20}/>
                    </button>
                </div>


                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 divide-y lg:divide-y-0 lg:divide-x divide-pacific-100 dark:divide-white/5">
                    

                    <div className="relative lg:col-span-7 flex flex-col min-h-0">
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5 pb-12 lg:pb-5">
                            

                            <section>
                                <label className="text-[10px] font-bold text-pacific-400 uppercase tracking-widest mb-2 block">Current Mood</label>
                                <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                    {MOOD_OPTIONS.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = formDetails.mood === option.value;
                                        return (
                                            <button
                                                type="button"
                                                key={option.value}
                                                onClick={() => setFormDetails({ ...formDetails, mood: option.value })}
                                                className={cn(
                                                    "flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-200 relative",
                                                    isSelected ? "bg-white dark:bg-white/10 shadow-sm ring-1 ring-black/5 dark:ring-white/10" : "hover:bg-white/60 dark:hover:bg-white/5"
                                                )}
                                            >
                                                <Icon size={22} className={cn("transition-colors", isSelected ? option.color : "text-slate-300 dark:text-slate-600")} strokeWidth={isSelected ? 2.5 : 2} />
                                                {isSelected && <span className="absolute -bottom-5 text-[9px] font-bold text-slate-500 uppercase tracking-wide animate-in fade-in slide-in-from-top-1">{option.label}</span>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </section>


                            <section className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                    <HabitControl icon={Wine} label="Alcohol" value={formDetails.alcohol} onChange={(v) => setFormDetails({...formDetails, alcohol: v})} />
                                    <HabitControl icon={Cigarette} label="Nicotine" value={formDetails.nicotine} onChange={(v) => setFormDetails({...formDetails, nicotine: v})} />
                                    <HabitControl icon={Leaf} label="Marijuana" value={formDetails.marijuana} onChange={(v) => setFormDetails({...formDetails, marijuana: v})} />
                                    <HabitControl icon={Coffee} label="Caffeine" value={formDetails.caffeine} onChange={(v) => setFormDetails({...formDetails, caffeine: v})} />
                                    <HabitControl icon={Dumbbell} label="Exercise" value={formDetails.exercise} onChange={(v) => setFormDetails({...formDetails, exercise: v})} />
                                    <HabitControl icon={Utensils} label="Diet" variant="food" value={formDetails.dietQuality} onChange={(v) => setFormDetails({...formDetails, dietQuality: v})} />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-x-5 gap-y-4 pt-1">

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-pacific-800 dark:text-pacific-200">
                                            <div className="p-1.5 bg-pacific-100 dark:bg-pacific-900/30 rounded-md">
                                                <Droplets size={14} className="text-pacific-600 dark:text-pacific-400" />
                                            </div>
                                            <span className="text-xs font-semibold">Water</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-slate-100 dark:bg-white/5 p-1 rounded-xl h-[38px]">
                                            <button 
                                                type="button"
                                                onClick={() => setFormDetails(prev => ({ ...prev, water: Math.max(0, (prev.water || 0) - 1) }))}
                                                className="w-8 h-full flex items-center justify-center rounded-lg text-slate-400 hover:text-pacific-600 hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all"
                                            >
                                                <Minus size={14} strokeWidth={2.5} />
                                            </button>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-sm font-bold text-pacific-700 dark:text-pacific-300">{formDetails.water ?? 0}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">Cups</span>
                                            </div>
                                            <button
                                                type="button" 
                                                onClick={() => setFormDetails(prev => ({ ...prev, water: (prev.water || 0) + 1 }))}
                                                className="w-8 h-full flex items-center justify-center rounded-lg text-slate-400 hover:text-pacific-600 hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all"
                                            >
                                                <Plus size={14} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>


                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-pacific-800 dark:text-pacific-200">
                                            <div className="p-1.5 bg-pacific-100 dark:bg-pacific-900/30 rounded-md">
                                                <Moon size={14} className="text-pacific-600 dark:text-pacific-400" />
                                            </div>
                                            <span className="text-xs font-semibold">Sleep</span>
                                        </div>
                                        <div className="relative flex items-center bg-slate-100 dark:bg-white/5 px-3 rounded-xl h-[38px]">
                                            <input 
                                                type="range" min="0" max="14" step="0.5"
                                                className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-pacific-500"
                                                value={formDetails.sleep ?? 0}
                                                onChange={(e) => setFormDetails({...formDetails, sleep: parseFloat(e.target.value)})}
                                            />
                                            <div className="absolute right-3 pointer-events-none flex items-baseline">
                                                <span className="text-xs font-bold text-pacific-700 dark:text-pacific-300 mr-0.5">{formDetails.sleep ?? 0}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">h</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>


                    <div className="lg:col-span-5 flex flex-col h-full bg-slate-50/50 dark:bg-black/20">
                        

                        <div className="flex-1 flex flex-col min-h-0 border-b border-pacific-100 dark:border-white/5">
                            <div className="p-4 pb-2 shrink-0">
                                <label className="text-[10px] font-bold text-pacific-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                    <Activity size={14} /> Symptom Log
                                </label>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-3 text-slate-400 pointer-events-none"/>
                                    <input 
                                        type="text" 
                                        placeholder="Search symptoms..." 
                                        className="w-full pl-9 pr-8 py-2.5 lg:py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-pacific-500 outline-none text-base lg:text-xs"
                                        value={symptomQuery}
                                        onChange={(e) => setSymptomQuery(e.target.value)}
                                    />
                                    {isSearching && (
                                        <div className="absolute right-3 top-3 lg:top-2.5">
                                            <Loader2 size={14} className="animate-spin text-pacific-500" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 space-y-4">

                                {symptomResults.map(part => (
                                    <div key={part.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <h4 className="sticky top-0 z-10 bg-slate-50/95 dark:bg-[#0A0A0A]/95 backdrop-blur-sm text-[10px] font-bold text-pacific-400 uppercase tracking-widest py-2 mb-1">
                                            {part.name}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {part.symptoms.map((sym, i) => {
                                                const isLogged = formDetails.loggedSymptoms.some(s => s.id === sym.id);
                                                return (
                                                    <button 
                                                        type="button"
                                                        key={`${part.id}-${sym.id}-${i}`}
                                                        onClick={() => handleSymptomClick(sym)}
                                                        className={cn(
                                                            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200",
                                                            isLogged 
                                                                ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-300" 
                                                                : "bg-white border-slate-100 text-slate-600 hover:border-pacific-200 hover:text-pacific-600 dark:bg-white/5 dark:border-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                                                        )}
                                                    >
                                                        {sym.description}
                                                        {isLogged ? <Check size={10} strokeWidth={3}/> : <Plus size={10} strokeWidth={3} className="opacity-50"/>}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}


                                {formDetails.loggedSymptoms.length > 0 && (
                                    <div className="pt-2">
                                        {!symptomQuery && <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Selected</h4>}
                                        <div className="flex flex-wrap gap-2">
                                            {formDetails.loggedSymptoms.map((sym, i) => (
                                                <button 
                                                    type="button"
                                                    key={sym.id} 
                                                    onClick={() => removeSymptom(i)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-300 text-xs font-medium rounded-lg group"
                                                >
                                                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center font-bold text-[10px] mr-1">
                                                        {sym.severity}
                                                    </span>
                                                    {sym.name} 
                                                    <X size={12} className="opacity-50 group-hover:opacity-100"/>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {!isSearching && symptomQuery && symptomResults.length === 0 && (
                                    <div className="text-center py-8 text-slate-400 text-xs italic">
                                        No symptoms found
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="h-1/3 flex flex-col min-h-[150px] bg-white dark:bg-white/5">
                            <div className="p-4 pb-2 shrink-0">
                                <label className="text-[10px] font-bold text-pacific-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                    <Pill size={14} /> Medications
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Add (e.g. 200mg Advil)" 
                                        className="flex-1 px-3 py-2.5 lg:py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-pacific-500 outline-none text-base lg:text-xs"
                                        value={medInput}
                                        onChange={(e) => setMedInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMedication(); }}}
                                    />
                                    <button onClick={addMedication} type="button" className="p-2 bg-pacific-100 dark:bg-white/10 rounded-xl text-pacific-600 dark:text-pacific-300 hover:bg-pacific-200 transition-colors">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 space-y-2">
                                {formDetails.loggedMedications.map((med, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 bg-pacific-50/50 dark:bg-pacific-900/10 border border-pacific-100 dark:border-pacific-500/20 rounded-lg text-xs text-pacific-900 dark:text-pacific-100 animate-in slide-in-from-left-2">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <div className="w-1.5 h-1.5 rounded-full bg-pacific-400 shrink-0" />
                                            <span className="truncate">
                                                {med.strength ? `${med.strength}${med.unit || ''} ` : ''} 
                                                {med.name}
                                            </span>
                                        </div>
                                        <button onClick={() => removeMedication(i)} className="text-pacific-300 hover:text-red-500 transition-colors" type="button">
                                            <Trash2 size={12}/>
                                        </button>
                                    </div>
                                ))}
                                {formDetails.loggedMedications.length === 0 && (
                                    <div className="h-full flex items-center justify-center text-slate-300 text-xs italic">No meds logged today</div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>


                <div className="p-4 z-20 border-t border-pacific-100/50 dark:border-white/5 bg-white/80 dark:bg-black/40 flex justify-end gap-3 backdrop-blur-md shrink-0">
                    <button 
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="px-6 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors uppercase tracking-wider"
                    >
                        Cancel
                    </button>
                    <button 
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-pacific-600 hover:bg-pacific-500 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-pacific-600/20 text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95" 
                        type="submit"
                    >
                        {isSubmitting ? "Saving..." : "Save Entry"}
                    </button>
                </div>
            </div>
        </form>
    );
};

// --- sub-components ---

interface HabitControlProps {
    icon: any;
    label: string;
    value: number | null;
    onChange: (v: number) => void;
    variant?: 'default' | 'food';
}

const HabitControl = ({ icon: Icon, label, value, onChange, variant = 'default' }: HabitControlProps) => {
    const levels = variant === 'food' ? SEVERITY_LEVELS_FOOD : SEVERITY_LEVELS;

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-pacific-800 dark:text-pacific-200">
                <div className="p-1.5 bg-pacific-100 dark:bg-pacific-900/30 rounded-md">
                    <Icon size={14} className="text-pacific-600 dark:text-pacific-400" />
                </div>
                <span className="text-xs font-semibold">{label}</span>
            </div>
            
            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl h-[38px]">
                {levels.map((level) => {
                    const isActive = value === level.value;
                    return (
                        <button
                            type="button"
                            key={level.value}
                            onClick={() => onChange(level.value)}
                            className={cn(
                                "flex-1 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200",
                                isActive 
                                    ? cn(level.color, "shadow-sm") 
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
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

interface SeverityWindowProps {
    symptomName: string;
    onSelect: (severity: number, time: string) => void;
    onCancel: () => void;
}

const SeverityWindow = ({ symptomName, onSelect, onCancel }: SeverityWindowProps) => {
    const [localSeverity, setLocalSeverity] = useState<number | null>(null);
    const [time, setTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    });

    const handleSave = () => {
        if (localSeverity !== null) {
            onSelect(localSeverity, time);
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#111] border border-pacific-100 dark:border-white/10 shadow-2xl p-6 rounded-2xl w-full max-w-sm mx-4 transform transition-all scale-100 animate-in zoom-in-95 flex flex-col gap-6">
                
                <div className="text-center">
                    <h3 className="text-pacific-900 dark:text-white font-bold text-lg">
                        <span className="text-pacific-600">{symptomName}</span> details
                    </h3>
                    <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Severity & Time</p>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {[...Array(10)].map((_, i) => {
                        const val = i + 1;
                        const isSelected = localSeverity === val;
                        
                        let colorClass = "hover:bg-pacific-100 dark:hover:bg-pacific-900/30 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300";
                        if (val >= 4) colorClass = "hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600 dark:hover:bg-yellow-900/20 text-slate-600 dark:text-slate-300";
                        if (val >= 7) colorClass = "hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-300";

                        if (isSelected) {
                            if (val < 4) colorClass = "bg-pacific-500 border-pacific-600 text-white shadow-md shadow-pacific-500/20 ring-2 ring-pacific-200 dark:ring-pacific-900";
                            else if (val < 7) colorClass = "bg-yellow-500 border-yellow-600 text-white shadow-md shadow-yellow-500/20 ring-2 ring-yellow-200 dark:ring-yellow-900";
                            else colorClass = "bg-red-500 border-red-600 text-white shadow-md shadow-red-500/20 ring-2 ring-red-200 dark:ring-red-900";
                        }

                        return (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setLocalSeverity(val)}
                                className={cn(
                                    "h-10 rounded-lg border text-sm font-bold transition-all duration-200",
                                    colorClass
                                )}
                            >
                                {val}
                            </button>
                        );
                    })}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> Occurred At
                    </label>
                    <input 
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-pacific-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pacific-500/50 transition-all"
                    />
                </div>

                <div className="flex gap-3 mt-2">
                    <button 
                        onClick={onCancel}
                        type="button" 
                        className="flex-1 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={localSeverity === null}
                        type="button" 
                        className="flex-[2] py-3 bg-pacific-600 hover:bg-pacific-500 disabled:opacity-50 disabled:hover:bg-pacific-600 text-white rounded-xl shadow-lg shadow-pacific-600/20 text-xs font-bold uppercase tracking-widest transition-all transform active:scale-95"
                    >
                        Save Symptom
                    </button>
                </div>
            </div>
        </div>
    );
};