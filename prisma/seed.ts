import { PrismaClient } from "@prisma/client";
import 'dotenv/config';

const prismaGlobal = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = prismaGlobal.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}

// --- Helpers ---
const rInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- 1. Seed Reference Data (Body Parts & Specific Symptoms) ---
async function seedReferenceData() {
    const parts = [
        { 
            slug: 'throat', 
            name: 'Throat', 
            symptoms: ['Trouble Swallowing', 'Sore Throat'] 
        },
        { 
            slug: 'abd_ch', 
            name: 'Upper Abdomen', 
            symptoms: ['Acid Reflux', 'Ulcer-like Pain', 'Early Satiety', 'Nausea'] 
        },
        { 
            slug: 'general', 
            name: 'General', 
            symptoms: ['Fatigue', 'Anxiety'] 
        }
    ];

    const symptomMap: Record<string, string> = {};

    for (const p of parts) {
        const bp = await prisma.bodyPart.upsert({
            where: { slug: p.slug },
            update: {},
            create: { name: p.name, slug: p.slug, keywords: [] }
        });

        for (const desc of p.symptoms) {
            // Upsert symptom to ensure it exists
            let sym = await prisma.symptom.findFirst({
                where: { description: desc, bodyPartId: bp.id }
            });

            if (!sym) {
                sym = await prisma.symptom.create({
                    data: { description: desc, bodyPartId: bp.id, slug: p.slug }
                });
            }
            // Map description to ID for easy use in the loop
            symptomMap[desc] = sym.id;
        }
    }
    return symptomMap;
}

async function main() {
    console.log("--- Seed Starting ---");

    // 1. Get Symptom IDs
    const symptomIds = await seedReferenceData();

    // 2. Create/Update Alex (The User Profile)
    // Young, skinnier, vapes
    await prisma.user.upsert({
        where: { email: 'alex@demo.com' },
        update: {
            password: 'Demo1212!',
            emailVerified: new Date(),
            weight: 155.0, // Skinnier
            physicalActivityLevel: 1, 
            nicotineUse: true,
            caffeineUse: true,
            alcoholUse: true,
            marijuanaUse: false,
        },
        create: {
            email: 'alex@demo.com',
            name: 'Alex Demo',
            sex: 'm',
            weight: 155.0, 
            height: 72.0, // 6ft
            physicalActivityLevel: 1,
            birthday: new Date('2001-05-12'), // ~25 years old
            nicotineUse: true,
            caffeineUse: true,
            alcoholUse: true,
            marijuanaUse: false,
            medications: {
                create: [
                    { name: "Omeprazole", defaultStrength: 20.0, unit: "mg" }, // For the reflux
                ]
            }
        }
    });

    const user = await prisma.user.findUnique({
        where: { email: "alex@demo.com" },
        include: { medications: true }
    });

    if (!user) throw new Error("Alex demo user not found");

    // 3. Clear old logs
    await prisma.healthLog.deleteMany({ where: { userId: user.id } });
    console.log("Cleared old logs.");

    // 4. Generate 30 Days of Logs
    const DAYS_TO_LOG = 30;
    const today = new Date();

    console.log(`Generating logs for ${DAYS_TO_LOG} days...`);

    for (let i = 0; i < DAYS_TO_LOG; i++) {
        const logDate = new Date(today);
        logDate.setDate(today.getDate() - i);
        logDate.setHours(12, 0, 0, 0);

        

        const sleep = rInt(4, 5);
        

        const nicotine = rInt(1, 3); // 1=light, 3=heavy



        const isWeekend = logDate.getDay() === 5 || logDate.getDay() === 6;
        
        const dietQuality = isWeekend ? 2 : rInt(0, 2); // 2 is bad
        const alcohol = isWeekend ? rInt(2, 3) : rInt(0, 1);
        const caffeine = Math.random() > 0.3 ? rInt(1, 3) : 0; 


        const loggedSymptomsData = [];



        if (Math.random() > 0.1) {
            loggedSymptomsData.push({
                symptomId: symptomIds['Early Satiety'],
                severity: rInt(3, 6), // Annoying but constant
                occurredAt: new Date(logDate.getTime()),
                userId: user.id
            });
        }


        if (caffeine > 0) {

            if (Math.random() > 0.2) {
                loggedSymptomsData.push({
                    symptomId: symptomIds['Trouble Swallowing'],
                    severity: rInt(4, 8), // Can be severe
                    occurredAt: new Date(logDate.getTime() + 1000 * 60 * 60 * 2), // 2 hours after noon
                    userId: user.id
                });
            }
        }



        const habitScore = dietQuality + alcohol + nicotine + caffeine; 

        
        if (habitScore > 4) {

            const severity = Math.min(10, Math.floor(habitScore * 0.8) + rInt(0, 2));
            
            loggedSymptomsData.push({
                symptomId: symptomIds['Acid Reflux'],
                severity: severity,
                occurredAt: new Date(logDate.getTime() + 1000 * 60 * 60 * 6), // Evening
                userId: user.id
            });

            if (severity > 6) {
                // If severe, also log the Ulcer-like pain
                loggedSymptomsData.push({
                    symptomId: symptomIds['Ulcer-like Pain'],
                    severity: severity - 1,
                    occurredAt: new Date(logDate.getTime() + 1000 * 60 * 60 * 6),
                    userId: user.id
                });
            }
        }

        // --- C. Log Medication ---
        const loggedMedsData = [];
        // 80% adherence to Omeprazole
        if (Math.random() > 0.2) {
            user.medications.forEach(med => {
                loggedMedsData.push({
                    medicationId: med.id,
                    strengthTaken: med.defaultStrength,

                    takenAt: new Date(logDate.getTime() - 1000 * 60 * 60 * 4) // 8 AM
                });
            });
        }

        // --- D. Create The Log ---
        await prisma.healthLog.create({
            data: {
                userId: user.id,
                date: logDate,
                
                // Vitals
                sleep: sleep,
                mood: habitScore > 6 ? rInt(0, 2) : rInt(2, 4), // Mood worse when habits are bad
                water: rInt(2, 6), // Doesn't drink enough water usually
                exercise: rInt(0, 1), // Sedentary/Light

                // Triggers
                dietQuality,
                caffeine,
                alcohol,
                nicotine,
                marijuana: 0, // Doesn't smoke weed

                notes: habitScore > 8 ? "Rough day. Felt terrible after dinner." : null,

                loggedMedications: { create: loggedMedsData },
                loggedSymptoms: { create: loggedSymptomsData }
            }
        });
    }

    console.log(`Successfully created profile and logs for ${user.name}`);

    // ==========================================
    // YOUR COMMENTED OUT DATA REMAINS BELOW
    // ==========================================

//    const bodyParts = [
//     // --- HEAD & NECK ---
//     { 
//         name: 'head', 
//         slug: 'head', 
//         keywords: ['headache', 'migraine', 'scalp', 'brain', 'temples', 'forehead', "head"] 
//     }, 
//     { 
//         name: 'neck', 
//         slug: 'neck', 
//         keywords: ['cervical', 'nape', 'stiff neck', 'glands', 'spine', "neck"] 
//     }, 
//     { 
//         name: 'face', 
//         slug: 'face', 
//         keywords: ['cheek', 'skin', 'complexion', "face"] 
//     }, 
//     { 
//         name: 'jaw', 
//         slug: 'jaw', 
//         keywords: ['tmj', 'chin', 'mandible', 'teeth', 'tooth', 'grinding', "jaw"] 
//     }, 
//     { 
//         name: 'mouth', 
//         slug: 'mouth', 
//         keywords: ['lips', 'tongue', 'gums', 'taste', 'breath', "mouth"] 
//     }, 
//     { 
//         name: 'throat', 
//         slug: 'throat', 
//         keywords: ['esophagus', 'swallowing', 'pharynx', 'sore throat', 'tonsils', 'voice', 'larynx', 'thyroid', "throat"] 
//     }, 
//     { 
//         name: 'nose', 
//         slug: 'nose', 
//         keywords: ['sinus', 'smell', 'nostril', 'congestion', 'bleed', "nose"] 
//     }, 
//     { 
//         name: 'ears', 
//         slug: 'ears', 
//         keywords: ['hearing', 'lobe', 'drum', 'tinnitus', 'balance', 'ear', "ears"] 
//     }, 
//     { 
//         name: 'eyes', 
//         slug: 'eyes', 
//         keywords: ['vision', 'sight', 'pupil', 'tear duct', 'eyelid', 'eye', "eyes"] 
//     },

//     // --- CHEST ---
//     { 
//         name: 'left chest', 
//         slug: 'chest_l', 
//         keywords: ['heart', 'pectoral', 'left rib cage', 'lung', 'palpitations', "left chest", "chest"] 
//     }, 
//     { 
//         name: 'right chest', 
//         slug: 'chest_r', 
//         keywords: ['pectoral', 'right rib cage', 'lung', "chest"] 
//     }, 
//     { 
//         name: 'center chest', 
//         slug: 'chest_c', 
//         keywords: ['sternum', 'breastbone', 'trachea', 'center of chest', 'mediastinum', "chest"] 
//     },
//     { 
//         name: 'breast', 
//         slug: 'breast', 
//         keywords: ['nipple', 'mammary', 'tissue', 'chest tissue', "breast"] 
//     },

//     // --- BACK ---
//     { 
//         name: 'upper back', 
//         slug: 'back_upper', 
//         keywords: ['shoulders', 'shoulder blades', 'scapula', 'trapezius', 'traps', 'knots', "upper back", "back"] 
//     }, 
//     { 
//         name: 'mid back', 
//         slug: 'back_mid', 
//         keywords: ['thoracic', 'spine', 'back ribs', 'bra line', "mid back", "back"] 
//     }, 
//     { 
//         name: 'lower back', 
//         slug: 'back_lower', 
//         keywords: ['lumbar', 'sciatica', 'tailbone', 'sacrum', 'coccyx', 'kidney pain', 'hips (back)', "lower back", "back"] 
//     },

//     // --- ABDOMEN ---
//     { 
//         name: 'upper-right abdomen (rh)', 
//         slug: 'abd_rh', 
//         keywords: ['liver', 'gallbladder', 'gallstones', 'right ribs', 'under right rib cage', "upper right", "abdomen"] 
//     }, 
//     { 
//         name: 'upper-center abdomen (ch)', 
//         slug: 'abd_ch', 
//         keywords: ['stomach', 'epigastric', 'solar plexus', 'heartburn', 'gerd', 'acid reflux', 'middle of ribs', "upper center", "abdomen"] 
//     }, 
//     { 
//         name: 'upper-left abdomen (lh)', 
//         slug: 'abd_lh', 
//         keywords: ['spleen', 'stomach', 'pancreas', 'left ribs', 'under left rib cage', "upper left", "abdomen"] 
//     },
//     { 
//         name: 'mid-right abdomen (rl)', 
//         slug: 'abd_rl', 
//         keywords: ['right flank', 'right kidney', 'right side belly', 'ascending colon', "mid right", "abdomen"] 
//     }, 
//     { 
//         name: 'mid-mid abdomen (um)', 
//         slug: 'abd_um', 
//         keywords: ['belly button', 'navel', 'umbilical', 'stomach', 'tummy', 'gut', 'intestine', 'belly', "center", "abdomen"] 
//     }, 
//     { 
//         name: 'mid-left abdomen (ll)', 
//         slug: 'abd_ll', 
//         keywords: ['left flank', 'left kidney', 'left side belly', 'descending colon', "mid left", "abdomen"] 
//     },
//     { 
//         name: 'lower-right abdomen (ri)', 
//         slug: 'abd_ri', 
//         keywords: ['appendix', 'appendicitis', 'right groin', 'right ovary', 'right iliac', "lower right", "abdomen"] 
//     }, 
//     { 
//         name: 'lower-mid abdomen (hp)', 
//         slug: 'abd_hp', 
//         keywords: ['bladder', 'uterus', 'womb', 'pubic', 'period cramps', 'menstrual', 'lower belly', 'pooch', 'hypogastric', "lower mid", "abdomen"] 
//     }, 
//     { 
//         name: 'lower-left abdomen (li)', 
//         slug: 'abd_li', 
//         keywords: ['sigmoid colon', 'diverticulitis', 'left groin', 'left ovary', 'left iliac', "lower left", "abdomen"] 
//     },

//     // --- PELVIC/GROIN ---
//     { 
//         name: 'genitalia/groin', 
//         slug: 'genitalia', 
//         keywords: ['penis', 'vagina', 'testicles', 'balls', 'scrotum', 'vulva', 'private parts', 'urethra', 'pee', 'urine', 'std', 'herpes', "genitals", "genital", "genitalia", "groin"] 
//     },
//     { 
//         name: 'pelvic floor', 
//         slug: 'pelvic_floor', 
//         keywords: ['perineum', 'taint', 'anus', 'rectum', 'butt', 'bowels', 'between legs', 'hemorrhoids', "pelvic floor", "pelvic"] 
//     },

//     // --- EXTREMITIES ---
//     { 
//         name: 'left hand/wrist', 
//         slug: 'hand_l', 
//         keywords: ['fingers', 'palm', 'knuckle', 'thumb', 'pinky', 'grip', 'carpal tunnel', 'hand', 'wrist'] 
//     }, 
//     { 
//         name: 'right hand/wrist', 
//         slug: 'hand_r', 
//         keywords: ['fingers', 'palm', 'knuckle', 'thumb', 'pinky', 'grip', 'carpal tunnel', 'hand', 'wrist'] 
//     },
//     { 
//         name: 'left foot/ankle', 
//         slug: 'foot_l', 
//         keywords: ['toes', 'heel', 'sole', 'arch', 'ball of foot', 'achilles', 'foot', 'ankle'] 
//     },
//     { 
//         name: 'right foot/ankle', 
//         slug: 'foot_r', 
//         keywords: ['toes', 'heel', 'sole', 'arch', 'ball of foot', 'achilles', 'foot', 'ankle'] 
//     },

//     // --- GENERAL ---
//     { 
//         name: 'general/whole body', 
//         slug: 'general', 
//         keywords: ['fever', 'flu', 'fatigue', 'tired', 'ache', 'chills', 'all over', 'malaise', 'weakness', 'dizzy', "cramps", "lack of appetite"] 
//     }
// ];

    // for (const s of symptomLibrary) {
    //     const partRecord = await prisma.bodyPart.findUnique({ where: { slug: s.slug } });
    //     if (partRecord) {
    //         await prisma.symptom.create({
    //             data: {
    //                 bodyPartId: partRecord.id,
    //                 description: s.desc,

    //             }
    //         });
    //     }
    // }
    console.log('seed complete');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });