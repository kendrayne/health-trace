'use client';
import { CirclePlus, CircleMinus, Check, ArrowRight, Calendar, Ruler, Weight } from "lucide-react";
import { QuestionCard, Question } from "./QuestionCard"; 
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface FormData {
    birthday: string;
    sex: string;
    weight: number;
    height: number;
    physicalActivityLevel: number | null; 
    dietQuality: number | null;
    alcoholUse: number;
    nicotineUse: number;
    caffeineUse: number;
    marijuanaUse: number;
    conditions: string[];
    medicine: string[];
    [key: string]: any;
}

export default function OnboardingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayNextText, setDisplayNextText] = useState("Continue");
    const [submittingProfile, setSubmittingProfile] = useState(false);
    const [errorUI, setErrorUI] = useState("")
    const router = useRouter();

    const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
    const [heightUnit, setHeightUnit] = useState<"in" | "cm">("in");

    const [formData, setFormData] = useState<FormData>({
        birthday: "",
        sex: "",
        weight: 0,
        height: 0,
        physicalActivityLevel: null, 
        dietQuality: null,         
        alcoholUse: 0,
        nicotineUse: 0,
        caffeineUse: 0,
        marijuanaUse: 0,
        conditions: [""],
        medicine: [""],
    });

    const ONBOARDING_QUESTIONS: Question[] = [
        {
            questionText: "When were you born?",
            subheader: "We need this to calculate your health benchmarks.",
            qId: "birthday",
        },
        {
            questionText: "What is your biological sex?",
            subheader: "This helps us tailor medical insights to your physiology.",
            qId: "sex",
            choices: ["Male", "Female", "Intersex", "Rather not say"]
        },
        {
            questionText: "What is your current weight?",
            qId: "weight",
        },
        {
            questionText: "How tall are you?",
            qId: "height",
        },
        {
            questionText: "How active are you?",
            qId: "physicalActivityLevel",
            scaleChoices: {
                0: "Sedentary (Little to no exercise)",
                1: "Lightly Active (1-3 days/week)",
                2: "Moderately Active (3-5 days/week)",
                3: "Very Active (6-7 days/week)",
            },
        },
        {
            questionText: "How would you rate your diet?",
            qId: "dietQuality",
            scaleChoices: {
                0: "Very healthy / Clean eating",
                1: "Balanced but not strict",
                2: "Needs improvement",
            },
        },
        {
            header: "Substance Use",
            subheader: "No judgment here. Honest answers ensure safe recommendations.",
            qId: "substances",
            choices: ["Alcohol", "Nicotine", "Caffeine", "Marijuana"], 
        },
        {
            questionText: "Do you have any known conditions?",
            subheader: "e.g., Diabetes, Hypertension, Asthma",
            qId: "conditions",
        },
        {
            questionText: "Are you currently taking medication?",
            subheader: "List any prescriptions or supplements.",
            qId: "medicine",
        },
    ];

    const progressPercentage = ((currentIndex + 1) / ONBOARDING_QUESTIONS.length) * 100;
    const currentQuestion = ONBOARDING_QUESTIONS[currentIndex];

    const isStepValid = useMemo(() => {
        if (!currentQuestion) return false;
        const { qId } = currentQuestion;

        switch (qId) {
            case "birthday":
                return formData.birthday.trim() !== "";
            case "sex":
                return formData.sex.trim() !== "";
            case "weight":
                return formData.weight > 0;
            case "height":
                return formData.height > 0;
            case "physicalActivityLevel":
                return formData.physicalActivityLevel !== null;
            case "dietQuality":
                return formData.dietQuality !== null;
            case "substances":
            case "conditions":
            case "medicine":
                return true;
            default:
                return true;
        }
    }, [currentQuestion, formData]);

    const handleNextButton = () => {
        if (!isStepValid) return;

        if (currentIndex >= ONBOARDING_QUESTIONS.length - 1) {
            submitProfile();
            return;
        }

        if (currentIndex === ONBOARDING_QUESTIONS.length - 2) {
            setDisplayNextText("Save Profile");
        }

        setCurrentIndex((prev) => prev + 1);
    };

    const maxDate = useMemo(() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 18);
        return d.toISOString().split("T")[0];
    }, []);

    const handleSimpleChange = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleUnitInput = (field: "weight" | "height", value: string) => {
        let num = parseFloat(value);
        if (isNaN(num)) num = 0;
        
        let converted = num;
        if (field === "weight" && weightUnit === "kg") converted = num * 2.20462;
        if (field === "height" && heightUnit === "cm") converted = num / 2.54;

        setFormData(prev => ({ ...prev, [field]: converted }));
    };

    const handleDynamicListChange = (key: "conditions" | "medicine", index: number, value: string) => {
        const newList = [...formData[key]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [key]: newList }));
    };

    const addDynamicField = (key: "conditions" | "medicine") => {
        setFormData(prev => ({ ...prev, [key]: [...prev[key], ""] }));
    };

    const removeDynamicField = (key: "conditions" | "medicine", index: number) => {
        const newList = [...formData[key]];
        newList.splice(index, 1);
        setFormData(prev => ({ ...prev, [key]: newList }));
    };

    const toggleSubstance = (substance: string) => {
        const map: Record<string, keyof FormData> = {
            "Alcohol": "alcoholUse",
            "Nicotine": "nicotineUse",
            "Caffeine": "caffeineUse",
            "Marijuana": "marijuanaUse"
        };
        const key = map[substance];
        if (!key) return;

        setFormData(prev => ({ ...prev, [key]: prev[key] === 1 ? 0 : 1 }));
    };

    const submitProfile = async () => {
        setSubmittingProfile(true);

        try {
            const birthdayDate = formData.birthday 
                ? new Date(`${formData.birthday}T00:01:00`) 
                : new Date(); 

            const payload = {
                ...formData,
                birthday: birthdayDate, 
            };

            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                setErrorUI("There was an error updating your health profile. Please try again.")
                setDisplayNextText("Save Profile")
                throw new Error('Failed to update health profile');
            }

            const data = await response.json();
            console.log("Profile Saved:", data);
            router.push('/dashboard'); 

        } catch (error) {
            console.error("Error submitting profile:", error);
            setDisplayNextText("Try Again"); 
        } finally {
            setSubmittingProfile(false);
        }
    };

    if (submittingProfile) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
                    <p className="text-slate-600 font-medium animate-pulse">Building your profile...</p>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return null;

    const renderInputArea = () => {
        const { qId } = currentQuestion;


        if (qId === 'birthday') {
            return (
                <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="date"
                        max={maxDate}
                        className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-slate-900 font-medium"
                        value={formData.birthday}
                        onChange={(e) => handleSimpleChange('birthday', e.target.value)}
                    />
                </div>
            );
        }

        if (qId === 'sex') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {currentQuestion.choices?.map((choice) => (
                        <button
                            key={choice}
                            onClick={() => handleSimpleChange('sex', choice)}
                            className={`p-4 rounded-xl border-2 font-medium transition-all duration-200 flex items-center justify-between group ${
                                formData.sex === choice 
                                ? "border-violet-600 bg-violet-50 text-violet-900 shadow-sm" 
                                : "border-slate-100 bg-white text-slate-600 hover:border-violet-200 hover:bg-slate-50"
                            }`}
                        >
                            {choice}
                            {formData.sex === choice && <Check className="w-5 h-5 text-violet-600" />}
                        </button>
                    ))}
                </div>
            );
        }

        if (qId === 'weight') {
            return (
                <div className="w-full max-w-sm space-y-2">
                    <div className="relative flex items-center">
                        <Weight className="absolute left-4 text-slate-400 w-5 h-5" />
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-xl font-semibold text-slate-900"
                            onChange={(e) => handleUnitInput('weight', e.target.value)}
                        />
                        <div className="absolute right-2 bg-white rounded-lg p-1 border border-slate-200 flex shadow-sm">
                            {(['lbs', 'kg'] as const).map((unit) => (
                                <button
                                    key={unit}
                                    onClick={() => setWeightUnit(unit)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                        weightUnit === unit ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                                    }`}
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center font-medium">
                        Stored as: {formData.weight.toFixed(1)} lbs
                    </p>
                </div>
            );
        }

        if (qId === 'height') {
            return (
                <div className="w-full max-w-sm space-y-2">
                    <div className="relative flex items-center">
                        <Ruler className="absolute left-4 text-slate-400 w-5 h-5" />
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-xl font-semibold text-slate-900"
                            onChange={(e) => handleUnitInput('height', e.target.value)}
                        />
                        <div className="absolute right-2 bg-white rounded-lg p-1 border border-slate-200 flex shadow-sm">
                            {(['in', 'cm'] as const).map((unit) => (
                                <button
                                    key={unit}
                                    onClick={() => setHeightUnit(unit)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                        heightUnit === unit ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                                    }`}
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center font-medium">
                        Stored as: {formData.height.toFixed(1)} inches
                    </p>
                </div>
            );
        }

        if (qId === 'physicalActivityLevel' || qId === 'dietQuality') {
            return (
                <div className="flex flex-col gap-3 w-full">
                    {Object.entries(currentQuestion.scaleChoices || {}).map(([key, text]) => {
                        const numericKey = Number(key);
                        const isSelected = formData[qId as keyof FormData] === numericKey;
                        return (
                            <button
                                key={key}
                                onClick={() => handleSimpleChange(qId as keyof FormData, numericKey)}
                                className={`group p-4 rounded-xl border-2 text-left transition-all duration-200 relative overflow-hidden ${
                                    isSelected
                                    ? "bg-violet-50 border-violet-600 shadow-md" 
                                    : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-sm"
                                }`}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <span className={`font-medium ${isSelected ? 'text-violet-900' : 'text-slate-700'}`}>{text}</span>
                                    {isSelected && <Check className="w-5 h-5 text-violet-600" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            );
        }

        if (qId === 'substances') {
            return (
                <div className="grid grid-cols-2 gap-4 w-full">
                    {currentQuestion.choices?.map((choice) => {
                        const map: Record<string, number> = {
                            "Alcohol": formData.alcoholUse,
                            "Nicotine": formData.nicotineUse,
                            "Caffeine": formData.caffeineUse,
                            "Marijuana": formData.marijuanaUse
                        };
                        const isChecked = map[choice] === 1;

                        return (
                            <button
                                key={choice} 
                                onClick={() => toggleSubstance(choice)}
                                className={`relative p-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 transition-all duration-200 ${
                                    isChecked 
                                    ? "bg-violet-50 border-violet-600 shadow-md" 
                                    : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-sm"
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-violet-600 border-violet-600' : 'border-slate-300'}`}>
                                    {isChecked && <Check className="text-white w-3.5 h-3.5" />}
                                </div>
                                <span className={`font-semibold ${isChecked ? 'text-violet-900' : 'text-slate-700'}`}>{choice}</span>
                            </button>
                        );
                    })}
                </div>
            );
        }

        if (qId === 'conditions' || qId === 'medicine') {
            const list = formData[qId];
            return (
                <div className="flex flex-col gap-3 w-full mt-2">
                    {list.map((val, i) => (
                        <div key={i} className="flex gap-2 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <input 
                                type="text" 
                                value={val}
                                onChange={(e) => handleDynamicListChange(qId, i, e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                placeholder={`${qId === 'conditions' ? 'Condition' : 'Medication'} ${i + 1}`}
                                autoFocus={i === list.length - 1 && i > 0} 
                            />
                            {list.length > 1 && (
                                <button 
                                    onClick={() => removeDynamicField(qId, i)} 
                                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <CircleMinus className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    ))}
                    
                    <button 
                        onClick={() => addDynamicField(qId)} 
                        className="flex items-center gap-2 text-violet-600 font-semibold mt-2 px-2 py-1 rounded-lg hover:bg-violet-50 transition-colors self-start"
                    >
                        <CirclePlus className="w-5 h-5" /> 
                        <span>Add Another</span>
                    </button>
                </div>
            );
        }
    };

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-6 font-sans">
            

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                

                <div className="w-full bg-slate-100 h-2">
                    <div 
                        className="bg-violet-600 h-2 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col items-center">
                    
                    <div className="w-full max-w-md text-center mb-8 space-y-2">
                        {currentQuestion.header ? (
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{currentQuestion.header}</h2>
                        ) : (
                             <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{currentQuestion.questionText}</h2>
                        )}
                        
                        {(currentQuestion.subheader) && (
                            <p className="text-slate-500 text-lg leading-relaxed">
                                {currentQuestion.subheader}
                            </p>
                        )}
                    </div>


                    <div className="w-full max-w-md flex flex-col items-center gap-6 min-h-50">
                        {renderInputArea()}
                    </div>
                </div>


                <div className="p-6 border-t border-slate-100 bg-white flex justify-end">
                    <button 
                        onClick={handleNextButton} 
                        disabled={!isStepValid}
                        className={`flex items-center gap-2 font-semibold py-3 px-8 rounded-full transition-all shadow-lg 
                        ${isStepValid 
                            ? "bg-slate-900 hover:bg-slate-800 text-white hover:shadow-xl active:scale-95" 
                            : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                        }`}
                    >
                        {displayNextText}
                        <ArrowRight className="w-4 h-4" />
                        {errorUI ?? (
                            <p>{errorUI}</p>
                        )}
                    </button>
                </div>

            </div>
        </main>
    );
}