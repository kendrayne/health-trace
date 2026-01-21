import { PrismaClient } from "@prisma/client";
import 'dotenv/config';


const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not defined in your .env file");

const prismaGlobal = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma =
  prismaGlobal.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}

async function main() {
    console.log("s-eed starting-");

    // Alex Demo user
    const seedUser = await prisma.user.upsert({
        where: { email: 'alex@demo.com' },
        update: {
            password: 'Demo1212!',
            emailVerified: new Date(),
        },
        create: {
            email: 'alex@example.com',
            name: 'Alex Demo',
            sex: 'm',
            weight: 190.5,
            height: 72.0,
            physicalActivityLevel: 2,
            birthday: new Date('1996-01-12'),
            medications: {
                create: [

                    { name: "Lisinopril", defaultStrength: 10.0, unit: "mg" },
                    { name: "Metformin", defaultStrength: 500.0, unit: "mg" }
                ]
            }
        }
    });

   const bodyParts = [
    // --- HEAD & NECK ---
    { 
        name: 'head', 
        slug: 'head', 
        keywords: ['headache', 'migraine', 'scalp', 'brain', 'temples', 'forehead', "head"] 
    }, 
    { 
        name: 'neck', 
        slug: 'neck', 
        keywords: ['cervical', 'nape', 'stiff neck', 'glands', 'spine', "neck"] 
    }, 
    { 
        name: 'face', 
        slug: 'face', 
        keywords: ['cheek', 'skin', 'complexion', "face"] 
    }, 
    { 
        name: 'jaw', 
        slug: 'jaw', 
        keywords: ['tmj', 'chin', 'mandible', 'teeth', 'tooth', 'grinding', "jaw"] 
    }, 
    { 
        name: 'mouth', 
        slug: 'mouth', 
        keywords: ['lips', 'tongue', 'gums', 'taste', 'breath', "mouth"] 
    }, 
    { 
        name: 'throat', 
        slug: 'throat', 
        keywords: ['esophagus', 'swallowing', 'pharynx', 'sore throat', 'tonsils', 'voice', 'larynx', 'thyroid', "throat"] 
    }, 
    { 
        name: 'nose', 
        slug: 'nose', 
        keywords: ['sinus', 'smell', 'nostril', 'congestion', 'bleed', "nose"] 
    }, 
    { 
        name: 'ears', 
        slug: 'ears', 
        keywords: ['hearing', 'lobe', 'drum', 'tinnitus', 'balance', 'ear', "ears"] 
    }, 
    { 
        name: 'eyes', 
        slug: 'eyes', 
        keywords: ['vision', 'sight', 'pupil', 'tear duct', 'eyelid', 'eye', "eyes"] 
    },

    // --- CHEST ---
    { 
        name: 'left chest', 
        slug: 'chest_l', 
        keywords: ['heart', 'pectoral', 'left rib cage', 'lung', 'palpitations', "left chest", "chest"] 
    }, 
    { 
        name: 'right chest', 
        slug: 'chest_r', 
        keywords: ['pectoral', 'right rib cage', 'lung', "chest"] 
    }, 
    { 
        name: 'center chest', 
        slug: 'chest_c', 
        keywords: ['sternum', 'breastbone', 'trachea', 'center of chest', 'mediastinum', "chest"] 
    },
    { 
        name: 'breast', 
        slug: 'breast', 
        keywords: ['nipple', 'mammary', 'tissue', 'chest tissue', "breast"] 
    },

    // --- BACK ---
    { 
        name: 'upper back', 
        slug: 'back_upper', 
        keywords: ['shoulders', 'shoulder blades', 'scapula', 'trapezius', 'traps', 'knots', "upper back", "back"] 
    }, 
    { 
        name: 'mid back', 
        slug: 'back_mid', 
        keywords: ['thoracic', 'spine', 'back ribs', 'bra line', "mid back", "back"] 
    }, 
    { 
        name: 'lower back', 
        slug: 'back_lower', 
        keywords: ['lumbar', 'sciatica', 'tailbone', 'sacrum', 'coccyx', 'kidney pain', 'hips (back)', "lower back", "back"] 
    },

    // --- ABDOMEN ---
    { 
        name: 'upper-right abdomen (rh)', 
        slug: 'abd_rh', 
        keywords: ['liver', 'gallbladder', 'gallstones', 'right ribs', 'under right rib cage', "upper right", "abdomen"] 
    }, 
    { 
        name: 'upper-center abdomen (ch)', 
        slug: 'abd_ch', 
        keywords: ['stomach', 'epigastric', 'solar plexus', 'heartburn', 'gerd', 'acid reflux', 'middle of ribs', "upper center", "abdomen"] 
    }, 
    { 
        name: 'upper-left abdomen (lh)', 
        slug: 'abd_lh', 
        keywords: ['spleen', 'stomach', 'pancreas', 'left ribs', 'under left rib cage', "upper left", "abdomen"] 
    },
    { 
        name: 'mid-right abdomen (rl)', 
        slug: 'abd_rl', 
        keywords: ['right flank', 'right kidney', 'right side belly', 'ascending colon', "mid right", "abdomen"] 
    }, 
    { 
        name: 'mid-mid abdomen (um)', 
        slug: 'abd_um', 
        keywords: ['belly button', 'navel', 'umbilical', 'stomach', 'tummy', 'gut', 'intestine', 'belly', "center", "abdomen"] 
    }, 
    { 
        name: 'mid-left abdomen (ll)', 
        slug: 'abd_ll', 
        keywords: ['left flank', 'left kidney', 'left side belly', 'descending colon', "mid left", "abdomen"] 
    },
    { 
        name: 'lower-right abdomen (ri)', 
        slug: 'abd_ri', 
        keywords: ['appendix', 'appendicitis', 'right groin', 'right ovary', 'right iliac', "lower right", "abdomen"] 
    }, 
    { 
        name: 'lower-mid abdomen (hp)', 
        slug: 'abd_hp', 
        keywords: ['bladder', 'uterus', 'womb', 'pubic', 'period cramps', 'menstrual', 'lower belly', 'pooch', 'hypogastric', "lower mid", "abdomen"] 
    }, 
    { 
        name: 'lower-left abdomen (li)', 
        slug: 'abd_li', 
        keywords: ['sigmoid colon', 'diverticulitis', 'left groin', 'left ovary', 'left iliac', "lower left", "abdomen"] 
    },

    // --- PELVIC/GROIN ---
    { 
        name: 'genitalia/groin', 
        slug: 'genitalia', 
        keywords: ['penis', 'vagina', 'testicles', 'balls', 'scrotum', 'vulva', 'private parts', 'urethra', 'pee', 'urine', 'std', 'herpes', "genitals", "genital", "genitalia", "groin"] 
    },
    { 
        name: 'pelvic floor', 
        slug: 'pelvic_floor', 
        keywords: ['perineum', 'taint', 'anus', 'rectum', 'butt', 'bowels', 'between legs', 'hemorrhoids', "pelvic floor", "pelvic"] 
    },

    // --- EXTREMITIES ---
    { 
        name: 'left hand/wrist', 
        slug: 'hand_l', 
        keywords: ['fingers', 'palm', 'knuckle', 'thumb', 'pinky', 'grip', 'carpal tunnel', 'hand', 'wrist'] 
    }, 
    { 
        name: 'right hand/wrist', 
        slug: 'hand_r', 
        keywords: ['fingers', 'palm', 'knuckle', 'thumb', 'pinky', 'grip', 'carpal tunnel', 'hand', 'wrist'] 
    },
    { 
        name: 'left foot/ankle', 
        slug: 'foot_l', 
        keywords: ['toes', 'heel', 'sole', 'arch', 'ball of foot', 'achilles', 'foot', 'ankle'] 
    },
    { 
        name: 'right foot/ankle', 
        slug: 'foot_r', 
        keywords: ['toes', 'heel', 'sole', 'arch', 'ball of foot', 'achilles', 'foot', 'ankle'] 
    },

    // --- GENERAL ---
    { 
        name: 'general/whole body', 
        slug: 'general', 
        keywords: ['fever', 'flu', 'fatigue', 'tired', 'ache', 'chills', 'all over', 'malaise', 'weakness', 'dizzy', "cramps", "lack of appetite"] 
    }
];

    for (const part of bodyParts) {
        await prisma.bodyPart.upsert({
            where: { slug: part.slug },
            update: { name: part.name, keywords: part.keywords },
            create: part,
        });
    }

    const symptomLibrary = [
    // ==================== HEAD & NECK ====================
    // --- HEAD ---
    { slug: 'head', desc: 'Migraine (Unilateral Throbbing)' },
    { slug: 'head', desc: 'Migraine with Visual Aura' },
    { slug: 'head', desc: 'Migraine with Sensory Aura (Tingling)' },
    { slug: 'head', desc: 'Tension Headache (Band-like Squeeze)' },
    { slug: 'head', desc: 'Cluster Headache (Piercing Eye Pain)' },
    { slug: 'head', desc: 'Thunderclap Headache (Sudden/Severe)' },
    { slug: 'head', desc: 'Sinus Headache (Frontal Pressure)' },
    { slug: 'head', desc: 'Cervicogenic Headache (Base of Skull)' },
    { slug: 'head', desc: 'Ice Pick Headache (Stabbing)' },
    { slug: 'head', desc: 'Morning Headache' },
    { slug: 'head', desc: 'Headache Worsened by Coughing/Straining' },
    { slug: 'head', desc: 'Scalp Tenderness (Allodynia)' },
    { slug: 'head', desc: 'Scalp Numbness / Paresthesia' },
    { slug: 'head', desc: 'Itchy Scalp (Pruritus)' },
    { slug: 'head', desc: 'Dandruff / Flaking Scalp' },
    { slug: 'head', desc: 'Patchy Hair Loss (Alopecia Areata)' },
    { slug: 'head', desc: 'Diffuse Hair Thinning' },
    { slug: 'head', desc: 'Soft Spots on Skull' },
    { slug: 'head', desc: 'Brain Fog / Mental Confusion' },
    { slug: 'head', desc: 'Poor Concentration' },
    { slug: 'head', desc: 'Short-term Memory Loss' },
    { slug: 'head', desc: 'Disorientation' },
    { slug: 'head', desc: 'Vertigo (Spinning Sensation)' },
    { slug: 'head', desc: 'Lightheadedness (Presyncope)' },
    { slug: 'head', desc: 'Feeling of "Heavy Head"' },
    { slug: 'head', desc: 'Electric Shock Sensations (Occipital Neuralgia)' },
    { slug: 'head', desc: 'Head Tremors' },

    // --- FACE ---
    { slug: 'face', desc: 'Facial Droop (Bell’s Palsy)' },
    { slug: 'face', desc: 'Hemifacial Spasm (Twitching)' },
    { slug: 'face', desc: 'Facial Numbness / Pins and Needles' },
    { slug: 'face', desc: 'Trigeminal Neuralgia (Shock-like Pain)' },
    { slug: 'face', desc: 'Malar "Butterfly" Rash' },
    { slug: 'face', desc: 'Periorbital Edema (Eye Puffiness)' },
    { slug: 'face', desc: 'Facial Swelling (Angioedema)' },
    { slug: 'face', desc: 'Flushing / Hot Flashes' },
    { slug: 'face', desc: 'Pallor (Paleness)' },
    { slug: 'face', desc: 'Jaundice (Yellow Skin)' },
    { slug: 'face', desc: 'Cyanosis (Blue Tint to Lips/Skin)' },
    { slug: 'face', desc: 'Acne / Cystic Breakouts' },
    { slug: 'face', desc: 'Spider Veins (Telangiectasia)' },
    { slug: 'face', desc: 'Dry / Flaky Skin Patches' },
    { slug: 'face', desc: 'Oily Skin (Seborrhea)' },
    { slug: 'face', desc: 'Hirsutism (Excess Hair Growth)' },
    { slug: 'face', desc: 'Mask-like Expression (Hypomimia)' },
    { slug: 'face', desc: 'Pain in Cheekbones' },

    // --- EYES ---
    { slug: 'eyes', desc: 'Blurred Vision' },
    { slug: 'eyes', desc: 'Double Vision (Diplopia)' },
    { slug: 'eyes', desc: 'Tunnel Vision' },
    { slug: 'eyes', desc: 'Loss of Peripheral Vision' },
    { slug: 'eyes', desc: 'Blind Spots (Scotoma)' },
    { slug: 'eyes', desc: 'Transient Vision Loss (Amaurosis Fugax)' },
    { slug: 'eyes', desc: 'Floaters (Squiggly Lines)' },
    { slug: 'eyes', desc: 'Photopsia (Flashing Lights)' },
    { slug: 'eyes', desc: 'Halos Around Lights' },
    { slug: 'eyes', desc: 'Night Blindness (Nyctalopia)' },
    { slug: 'eyes', desc: 'Photophobia (Light Sensitivity)' },
    { slug: 'eyes', desc: 'Eye Pain / Strain' },
    { slug: 'eyes', desc: 'Burning Sensation in Eyes' },
    { slug: 'eyes', desc: 'Gritty / Sandy Sensation' },
    { slug: 'eyes', desc: 'Excessive Tearing (Epiphora)' },
    { slug: 'eyes', desc: 'Dry Eyes' },
    { slug: 'eyes', desc: 'Redness (Conjunctivitis)' },
    { slug: 'eyes', desc: 'Yellow Sclera (Icterus)' },
    { slug: 'eyes', desc: 'Subconjunctival Hemorrhage (Blood Spot)' },
    { slug: 'eyes', desc: 'Ptosis (Droopy Eyelid)' },
    { slug: 'eyes', desc: 'Eyelid Twitching (Myokymia)' },
    { slug: 'eyes', desc: 'Stye (Hordeolum)' },
    { slug: 'eyes', desc: 'Chalazion (Eyelid Lump)' },
    { slug: 'eyes', desc: 'Crusting on Eyelashes' },
    { slug: 'eyes', desc: 'Bulging Eyes (Exophthalmos)' },
    { slug: 'eyes', desc: 'Sunken Eyes' },
    { slug: 'eyes', desc: 'Different Sized Pupils (Anisocoria)' },

    // --- EARS ---
    { slug: 'ears', desc: 'Hearing Loss (Conductive or Sensorineural)' },
    { slug: 'ears', desc: 'Sudden Deafness' },
    { slug: 'ears', desc: 'Muffled Hearing ("Underwater" feel)' },
    { slug: 'ears', desc: 'Tinnitus (Ringing/Buzzing)' },
    { slug: 'ears', desc: 'Pulsatile Tinnitus (Heartbeat in Ear)' },
    { slug: 'ears', desc: 'Earache (Otalgia)' },
    { slug: 'ears', desc: 'Sharp Stabbing Ear Pain' },
    { slug: 'ears', desc: 'Ear Fullness / Pressure' },
    { slug: 'ears', desc: 'Ear Canal Itching' },
    { slug: 'ears', desc: 'Ear Discharge (Otorrhea)' },
    { slug: 'ears', desc: 'Bloody Ear Discharge' },
    { slug: 'ears', desc: 'Foul Smelling Discharge' },
    { slug: 'ears', desc: 'Red / Swollen Outer Ear' },
    { slug: 'ears', desc: 'Cauliflower Ear Deformity' },
    { slug: 'ears', desc: 'Pain when pulling Auricle' },
    { slug: 'ears', desc: 'Hyperacusis (Sensitivity to Sound)' },
    { slug: 'ears', desc: 'Ear Popping / Crackling' },

    // --- NOSE ---
    { slug: 'nose', desc: 'Nasal Congestion / Stuffiness' },
    { slug: 'nose', desc: 'Runny Nose (Rhinorrhea)' },
    { slug: 'nose', desc: 'Post-Nasal Drip' },
    { slug: 'nose', desc: 'Thick Green/Yellow Discharge' },
    { slug: 'nose', desc: 'Nosebleed (Epistaxis)' },
    { slug: 'nose', desc: 'Sneezing Fits' },
    { slug: 'nose', desc: 'Itchy Nose' },
    { slug: 'nose', desc: 'Loss of Smell (Anosmia)' },
    { slug: 'nose', desc: 'Reduced Smell (Hyposmia)' },
    { slug: 'nose', desc: 'Phantom Smells (Phantosmia)' },
    { slug: 'nose', desc: 'Bad Smell in Nose (Cachosmia)' },
    { slug: 'nose', desc: 'Sinus Pressure / Pain' },
    { slug: 'nose', desc: 'Nasal Polyps Sensation' },
    { slug: 'nose', desc: 'Deviated Septum Obstruction' },
    { slug: 'nose', desc: 'Nasal Flaring' },
    { slug: 'nose', desc: 'Saddle Nose Deformity' },
    { slug: 'nose', desc: 'Painful Sores inside Nostril' },

    // --- MOUTH ---
    { slug: 'mouth', desc: 'Toothache' },
    { slug: 'mouth', desc: 'Sensitive Teeth (Thermal)' },
    { slug: 'mouth', desc: 'Loose Teeth' },
    { slug: 'mouth', desc: 'Bleeding Gums' },
    { slug: 'mouth', desc: 'Swollen / Red Gums (Gingivitis)' },
    { slug: 'mouth', desc: 'Receding Gums' },
    { slug: 'mouth', desc: 'Gum Abscess / Boil' },
    { slug: 'mouth', desc: 'Mouth Ulcers (Canker Sores)' },
    { slug: 'mouth', desc: 'Cold Sores (Herpes Labialis)' },
    { slug: 'mouth', desc: 'Oral Thrush (White Patches)' },
    { slug: 'mouth', desc: 'Leukoplakia (White patches, non-wipable)' },
    { slug: 'mouth', desc: 'Dry Mouth (Xerostomia)' },
    { slug: 'mouth', desc: 'Excessive Salivation (Sialorrhea)' },
    { slug: 'mouth', desc: 'Bad Breath (Halitosis)' },
    { slug: 'mouth', desc: 'Metallic Taste (Dysgeusia)' },
    { slug: 'mouth', desc: 'Loss of Taste (Ageusia)' },
    { slug: 'mouth', desc: 'Bitter / Acidic Taste' },
    { slug: 'mouth', desc: 'Burning Tongue Syndrome' },
    { slug: 'mouth', desc: 'Swollen Tongue (Glossitis)' },
    { slug: 'mouth', desc: 'Strawberry Tongue' },
    { slug: 'mouth', desc: 'Black Hairy Tongue' },
    { slug: 'mouth', desc: 'Fissured Tongue' },
    { slug: 'mouth', desc: 'Blue/Purple Lips' },
    { slug: 'mouth', desc: 'Cracked Corners of Mouth (Cheilitis)' },
    { slug: 'mouth', desc: 'Mucocele (Cyst on Lip)' },

    // --- JAW ---
    { slug: 'jaw', desc: 'Jaw Clicking / Popping' },
    { slug: 'jaw', desc: 'Jaw Locking (Trismus)' },
    { slug: 'jaw', desc: 'Grinding Teeth (Bruxism)' },
    { slug: 'jaw', desc: 'Clenching Teeth' },
    { slug: 'jaw', desc: 'Jaw Stiffness / Fatigue' },
    { slug: 'jaw', desc: 'TMJ Pain' },
    { slug: 'jaw', desc: 'Pain Radiating to Ear/Temple' },
    { slug: 'jaw', desc: 'Swelling at Jaw Angle' },
    { slug: 'jaw', desc: 'Chin Numbness' },
    { slug: 'jaw', desc: 'Receding Chin' },
    { slug: 'jaw', desc: 'Protruding Jaw (Prognathism)' },

    // --- THROAT ---
    { slug: 'throat', desc: 'Sore Throat (Pharyngitis)' },
    { slug: 'throat', desc: 'Scratchy / Itchy Throat' },
    { slug: 'throat', desc: 'Difficulty Swallowing (Dysphagia)' },
    { slug: 'throat', desc: 'Painful Swallowing (Odynophagia)' },
    { slug: 'throat', desc: 'Sensation of Lump (Globus Hystericus)' },
    { slug: 'throat', desc: 'Hoarseness / Dysphonia' },
    { slug: 'throat', desc: 'Loss of Voice (Aphonia)' },
    { slug: 'throat', desc: 'Tonsil Stones (Tonsilloliths)' },
    { slug: 'throat', desc: 'Swollen / Red Tonsils' },
    { slug: 'throat', desc: 'White Spots on Tonsils' },
    { slug: 'throat', desc: 'Uvula Swelling' },
    { slug: 'throat', desc: 'Frequent Throat Clearing' },
    { slug: 'throat', desc: 'Dry Cough' },
    { slug: 'throat', desc: 'Productive Cough (Sputum/Phlegm)' },
    { slug: 'throat', desc: 'Barking Cough (Croup)' },
    { slug: 'throat', desc: 'Whooping Cough' },
    { slug: 'throat', desc: 'Coughing up Blood (Hemoptysis)' },
    { slug: 'throat', desc: 'Stridor (High-pitched breathing)' },
    { slug: 'throat', desc: 'Goiter (Thyroid Swelling)' },

    // --- NECK ---
    { slug: 'neck', desc: 'Neck Stiffness (Nuchal Rigidity)' },
    { slug: 'neck', desc: 'Torticollis (Wry Neck)' },
    { slug: 'neck', desc: 'Muscle Knots / Trigger Points' },
    { slug: 'neck', desc: 'Neck Spasm' },
    { slug: 'neck', desc: 'Swollen Lymph Nodes (Cervical Lymphadenopathy)' },
    { slug: 'neck', desc: 'Neck Mass / Lump' },
    { slug: 'neck', desc: 'Pulsing Jugular Vein (JVD)' },
    { slug: 'neck', desc: 'Neck Crepitus (Grinding Sound)' },
    { slug: 'neck', desc: 'Pain Radiating Down Arm (Radiculopathy)' },
    { slug: 'neck', desc: 'Lhermitte’s Sign (Electric shock down spine)' },
    { slug: 'neck', desc: 'Acanthosis Nigricans (Dark patches)' },
    { slug: 'neck', desc: 'Neck Hump (Buffalo Hump)' },

    // ==================== CHEST & BACK ====================
    // --- CHEST (CENTER) ---
    { slug: 'chest_c', desc: 'Crushing Chest Pain (Angina)' },
    { slug: 'chest_c', desc: 'Pressure / Squeezing Sensation' },
    { slug: 'chest_c', desc: 'Heartburn (Retrosternal Burning)' },
    { slug: 'chest_c', desc: 'Indigestion / Dyspepsia' },
    { slug: 'chest_c', desc: 'Palpitations (Skipped Beats)' },
    { slug: 'chest_c', desc: 'Tachycardia (Rapid Heart Rate)' },
    { slug: 'chest_c', desc: 'Bradycardia (Slow Heart Rate)' },
    { slug: 'chest_c', desc: 'Atrial Fibrillation (Irregular Rhythm)' },
    { slug: 'chest_c', desc: 'Chest Wall Tenderness (Costochondritis)' },
    { slug: 'chest_c', desc: 'Shortness of Breath (Dyspnea)' },
    { slug: 'chest_c', desc: 'Air Hunger' },
    { slug: 'chest_c', desc: 'Wheezing (Audible)' },
    { slug: 'chest_c', desc: 'Rales / Crackles (Lung Sounds)' },
    { slug: 'chest_c', desc: 'Esophageal Spasms' },
    { slug: 'chest_c', desc: 'Sternal Clicking' },

    // --- CHEST (LEFT) ---
    { slug: 'chest_l', desc: 'Sharp Stabbing Pain on Inhalation' },
    { slug: 'chest_l', desc: 'Pain Radiating to Left Arm/Jaw' },
    { slug: 'chest_l', desc: 'Dull Pectoral Ache' },
    { slug: 'chest_l', desc: 'Precordial Catch (Sudden Needle Stick)' },
    { slug: 'chest_l', desc: 'Fluttering Sensation' },
    { slug: 'chest_l', desc: 'Tightness upon Exertion' },
    { slug: 'chest_l', desc: 'Intercostal Muscle Strain' },

    // --- CHEST (RIGHT) ---
    { slug: 'chest_r', desc: 'Pleuritic Pain (Sharp when breathing)' },
    { slug: 'chest_r', desc: 'Right Sided Rib Pain' },
    { slug: 'chest_r', desc: 'Lung Collapse Sensation' },
    { slug: 'chest_r', desc: 'Intercostal Muscle Strain' },
    { slug: 'chest_r', desc: 'Shingles Rash (Dermatomal)' },

    // --- BREAST ---
    { slug: 'breast', desc: 'Palpable Breast Lump' },
    { slug: 'breast', desc: 'Generalized Lumpiness (Fibrocystic)' },
    { slug: 'breast', desc: 'Cyclical Breast Pain (Mastalgia)' },
    { slug: 'breast', desc: 'Non-cyclical Breast Pain' },
    { slug: 'breast', desc: 'Nipple Discharge (Clear/Milky)' },
    { slug: 'breast', desc: 'Nipple Discharge (Bloody)' },
    { slug: 'breast', desc: 'Nipple Inversion / Retraction' },
    { slug: 'breast', desc: 'Nipple Cracking / Fissures' },
    { slug: 'breast', desc: 'Skin Dimpling (Peau d\'orange)' },
    { slug: 'breast', desc: 'Redness / Warmth (Mastitis)' },
    { slug: 'breast', desc: 'Axillary (Armpit) Lump' },
    { slug: 'breast', desc: 'Galactorrhea (Unexpected Milk)' },
    { slug: 'breast', desc: 'Gynecomastia (Male Breast Swelling)' },

    // --- UPPER BACK ---
    { slug: 'back_upper', desc: 'Trapezius Muscle Knots' },
    { slug: 'back_upper', desc: 'Burning Between Shoulder Blades' },
    { slug: 'back_upper', desc: 'Scapular Winging' },
    { slug: 'back_upper', desc: 'Stiffness / Reduced Range of Motion' },
    { slug: 'back_upper', desc: 'Kyphosis (Hunchback Curvature)' },
    { slug: 'back_upper', desc: 'Dowager’s Hump' },
    { slug: 'back_upper', desc: 'Shoulder Impingement Pain' },

    // --- MID BACK ---
    { slug: 'back_mid', desc: 'Thoracic Spine Pain' },
    { slug: 'back_mid', desc: 'Rib Joint Dysfunction' },
    { slug: 'back_mid', desc: 'Sharp Wrap-around Pain (Girdle Pain)' },
    { slug: 'back_mid', desc: 'Bra-line Tightness / Ache' },
    { slug: 'back_mid', desc: 'Postural Fatigue' },

    // --- LOWER BACK ---
    { slug: 'back_lower', desc: 'Lumbago (Dull Aching)' },
    { slug: 'back_lower', desc: 'Sharp Shooting Pain (Sciatica)' },
    { slug: 'back_lower', desc: 'Sacroiliac (SI) Joint Pain' },
    { slug: 'back_lower', desc: 'Tailbone Pain (Coccydynia)' },
    { slug: 'back_lower', desc: 'Severe Muscle Spasm / Locking' },
    { slug: 'back_lower', desc: 'Pain Radiating to Groin/Legs' },
    { slug: 'back_lower', desc: 'Numbness in Saddle Area (Cauda Equina)' },
    { slug: 'back_lower', desc: 'Flank Pain Radiating to Back (Kidney)' },
    { slug: 'back_lower', desc: 'Spinal Stenosis (Pain when walking/standing)' },
    { slug: 'back_lower', desc: 'Morning Stiffness improving with move' },
    { slug: 'back_lower', desc: 'Visible Curvature (Scoliosis/Lordosis)' },

    // ==================== ABDOMEN ====================
    // --- UPPER RIGHT ABDOMEN (RH) ---
    { slug: 'abd_rh', desc: 'Biliary Colic (Gallbladder Attack)' },
    { slug: 'abd_rh', desc: 'Sharp Stabbing after Fatty Meal' },
    { slug: 'abd_rh', desc: 'Dull Liver Ache (Hepatomegaly)' },
    { slug: 'abd_rh', desc: 'Murphy’s Sign (Pain on deep breath)' },
    { slug: 'abd_rh', desc: 'Costal Margin Tenderness' },

    // --- UPPER CENTER ABDOMEN (CH) ---
    { slug: 'abd_ch', desc: 'Epigastric Gnawing (Gastritis/Ulcer)' },
    { slug: 'abd_ch', desc: 'Burning Sensation (GERD)' },
    { slug: 'abd_ch', desc: 'Fullness after small meals (Satiety)' },
    { slug: 'abd_ch', desc: 'Hiatal Hernia Pressure' },
    { slug: 'abd_ch', desc: 'Solar Plexus Spasm (Winded)' },
    { slug: 'abd_ch', desc: 'Projectile Vomiting' },

    // --- UPPER LEFT ABDOMEN (LH) ---
    { slug: 'abd_lh', desc: 'Splenomegaly (Fullness/Pain)' },
    { slug: 'abd_lh', desc: 'Splenic Stitch (Runners)' },
    { slug: 'abd_lh', desc: 'Pancreatitis Radiation (Boring pain)' },
    { slug: 'abd_lh', desc: 'Gastric Volvulus Sensation' },

    // --- MID RIGHT ABDOMEN (RL) ---
    { slug: 'abd_rl', desc: 'Right Flank Ache (Kidney)' },
    { slug: 'abd_rl', desc: 'Ureteral Colic (Passing Stone)' },
    { slug: 'abd_rl', desc: 'Ascending Colon Gas / Bloating' },
    { slug: 'abd_rl', desc: 'Muscle Strain (Obliques)' },

    // --- MID CENTER ABDOMEN (UM) ---
    { slug: 'abd_um', desc: 'Periumbilical Cramping' },
    { slug: 'abd_um', desc: 'Umbilical Hernia Bulge' },
    { slug: 'abd_um', desc: 'Visible Pulse (Aortic Aneurysm)' },
    { slug: 'abd_um', desc: 'Distended / Hard Belly' },
    { slug: 'abd_um', desc: 'Ascites (Fluid accumulation)' },
    { slug: 'abd_um', desc: 'Gurgling / Borborygmi' },

    // --- MID LEFT ABDOMEN (LL) ---
    { slug: 'abd_ll', desc: 'Left Flank Ache (Kidney)' },
    { slug: 'abd_ll', desc: 'Ureteral Colic (Passing Stone)' },
    { slug: 'abd_ll', desc: 'Descending Colon Spasm' },
    { slug: 'abd_ll', desc: 'Impaction Discomfort' },

    // --- LOWER RIGHT ABDOMEN (RI) ---
    { slug: 'abd_ri', desc: 'McBurney’s Point Tenderness (Appendix)' },
    { slug: 'abd_ri', desc: 'Rebound Tenderness (Peritonitis)' },
    { slug: 'abd_ri', desc: 'Right Inguinal Hernia Bulge' },
    { slug: 'abd_ri', desc: 'Right Ovarian Cyst Pain' },
    { slug: 'abd_ri', desc: 'Right Ovulation Pain (Mittelschmerz)' },
    { slug: 'abd_ri', desc: 'Psoas Sign (Pain extending hip)' },

    // --- LOWER CENTER ABDOMEN (HP) ---
    { slug: 'abd_hp', desc: 'Menstrual Cramps (Dysmenorrhea)' },
    { slug: 'abd_hp', desc: 'Suprapubic Pressure (Bladder)' },
    { slug: 'abd_hp', desc: 'Burning Bladder Pain' },
    { slug: 'abd_hp', desc: 'Uterine Fibroid Heaviness' },
    { slug: 'abd_hp', desc: 'Post-Void Residual Sensation' },
    { slug: 'abd_hp', desc: 'Painful Bladder Syndrome' },
    { slug: 'abd_hp', desc: 'Pelvic Inflammatory Disease Ache' },
    { slug: 'abd_hp', desc: 'Endometriosis Pain' },
    { slug: 'abd_hp', desc: 'Pregnancy Round Ligament Pain' },

    // --- LOWER LEFT ABDOMEN (LI) ---
    { slug: 'abd_li', desc: 'Diverticulitis Pain (Sharp/Fever)' },
    { slug: 'abd_li', desc: 'Sigmoid Colon Spasm' },
    { slug: 'abd_li', desc: 'Constipation / Stool Impaction' },
    { slug: 'abd_li', desc: 'Left Inguinal Hernia Bulge' },
    { slug: 'abd_li', desc: 'Left Ovarian Cyst Pain' },
    { slug: 'abd_li', desc: 'Left Ovulation Pain (Mittelschmerz)' },

    // ==================== PELVIC & GENITAL ====================
    // --- GENITALIA ---
    { slug: 'genitalia', desc: 'Dysuria (Burning Urination)' },
    { slug: 'genitalia', desc: 'Frequent Urination (Frequency)' },
    { slug: 'genitalia', desc: 'Urgent Need to Urinate (Urgency)' },
    { slug: 'genitalia', desc: 'Hematuria (Blood in Urine)' },
    { slug: 'genitalia', desc: 'Cloudy Urine' },
    { slug: 'genitalia', desc: 'Malodorous Urine' },
    { slug: 'genitalia', desc: 'Urethral Discharge (Pus/Clear)' },
    { slug: 'genitalia', desc: 'Genital Itching (Pruritus)' },
    { slug: 'genitalia', desc: 'Genital Warts (Condyloma)' },
    { slug: 'genitalia', desc: 'Herpes Blisters / Ulcers' },
    { slug: 'genitalia', desc: 'Chancre (Painless Syphilis Sore)' },
    { slug: 'genitalia', desc: 'Pain during Intercourse (Dyspareunia)' },
    { slug: 'genitalia', desc: 'Post-coital Bleeding' },
    { slug: 'genitalia', desc: 'Erectile Dysfunction' },
    { slug: 'genitalia', desc: 'Priapism (Prolonged Erection)' },
    { slug: 'genitalia', desc: 'Peyronie’s (Curved Erection)' },
    { slug: 'genitalia', desc: 'Testicular Pain (Orchitis)' },
    { slug: 'genitalia', desc: 'Testicular Torsion (Sudden/Severe)' },
    { slug: 'genitalia', desc: 'Scrotal Swelling (Hydrocele)' },
    { slug: 'genitalia', desc: 'Bag of Worms feel (Varicocele)' },
    { slug: 'genitalia', desc: 'Epididymal Tenderness' },
    { slug: 'genitalia', desc: 'Vaginal Dryness / Atrophy' },
    { slug: 'genitalia', desc: 'Abnormal Vaginal Discharge (Yeast/BV)' },
    { slug: 'genitalia', desc: 'Vaginal Odor' },
    { slug: 'genitalia', desc: 'Vulvar Swelling / Pain' },
    { slug: 'genitalia', desc: 'Bartholin Cyst' },
    { slug: 'genitalia', desc: 'Phimosis (Foreskin too tight)' },
    { slug: 'genitalia', desc: 'Paraphimosis (Foreskin stuck)' },

    // --- PELVIC FLOOR ---
    { slug: 'pelvic_floor', desc: 'Rectal Pain (Proctalgia)' },
    { slug: 'pelvic_floor', desc: 'Rectal Bleeding (Hematochezia)' },
    { slug: 'pelvic_floor', desc: 'Anal Itching (Pruritus Ani)' },
    { slug: 'pelvic_floor', desc: 'Anal Fissure (Tearing Pain)' },
    { slug: 'pelvic_floor', desc: 'Hemorrhoids (External/Internal)' },
    { slug: 'pelvic_floor', desc: 'Perineal Pain' },
    { slug: 'pelvic_floor', desc: 'Rectal Prolapse' },
    { slug: 'pelvic_floor', desc: 'Fecal Incontinence' },
    { slug: 'pelvic_floor', desc: 'Incomplete Evacuation Sensation' },
    { slug: 'pelvic_floor', desc: 'Pelvic Organ Prolapse Sensation' },
    { slug: 'pelvic_floor', desc: 'Levator Ani Spasm' },
    { slug: 'pelvic_floor', desc: 'Coccyx Pain' },

    // ==================== EXTREMITIES ====================
    // --- LEFT HAND/WRIST ---
    { slug: 'hand_l', desc: 'Numbness in Thumb/Index (Carpal Tunnel)' },
    { slug: 'hand_l', desc: 'Numbness in Pinky (Cubital Tunnel)' },
    { slug: 'hand_l', desc: 'Wrist Ganglion Cyst' },
    { slug: 'hand_l', desc: 'Tremor / Shaking' },
    { slug: 'hand_l', desc: 'Weak Grip Strength' },
    { slug: 'hand_l', desc: 'Morning Stiffness (Arthritis)' },
    { slug: 'hand_l', desc: 'Heberden’s Nodes (Distal Joints)' },
    { slug: 'hand_l', desc: 'Bouchard’s Nodes (Proximal Joints)' },
    { slug: 'hand_l', desc: 'Trigger Finger (Locking)' },
    { slug: 'hand_l', desc: 'Dupuytren’s Contracture' },
    { slug: 'hand_l', desc: 'Cold Fingers / Color Change (Raynauds)' },
    { slug: 'hand_l', desc: 'Palmar Erythema (Red Palms)' },
    { slug: 'hand_l', desc: 'Clubbing of Fingernails' },
    { slug: 'hand_l', desc: 'Spoon Nails (Koilonychia)' },
    { slug: 'hand_l', desc: 'Pitted Nails' },
    { slug: 'hand_l', desc: 'Splinter Hemorrhages' },

    // --- RIGHT HAND/WRIST ---
    { slug: 'hand_r', desc: 'Numbness in Thumb/Index (Carpal Tunnel)' },
    { slug: 'hand_r', desc: 'Numbness in Pinky (Cubital Tunnel)' },
    { slug: 'hand_r', desc: 'Wrist Ganglion Cyst' },
    { slug: 'hand_r', desc: 'Tremor / Shaking' },
    { slug: 'hand_r', desc: 'Weak Grip Strength' },
    { slug: 'hand_r', desc: 'Morning Stiffness (Arthritis)' },
    { slug: 'hand_r', desc: 'Heberden’s Nodes (Distal Joints)' },
    { slug: 'hand_r', desc: 'Bouchard’s Nodes (Proximal Joints)' },
    { slug: 'hand_r', desc: 'Trigger Finger (Locking)' },
    { slug: 'hand_r', desc: 'Dupuytren’s Contracture' },
    { slug: 'hand_r', desc: 'Cold Fingers / Color Change (Raynauds)' },
    { slug: 'hand_r', desc: 'Palmar Erythema (Red Palms)' },
    { slug: 'hand_r', desc: 'Clubbing of Fingernails' },
    { slug: 'hand_r', desc: 'Spoon Nails (Koilonychia)' },
    { slug: 'hand_r', desc: 'Pitted Nails' },
    { slug: 'hand_r', desc: 'Splinter Hemorrhages' },

    // --- LEFT FOOT/ANKLE ---
    { slug: 'foot_l', desc: 'Plantar Fasciitis (Heel Pain)' },
    { slug: 'foot_l', desc: 'Heel Spur Pain' },
    { slug: 'foot_l', desc: 'Achilles Tendonitis' },
    { slug: 'foot_l', desc: 'Ankle Sprain (Swelling/Bruising)' },
    { slug: 'foot_l', desc: 'Pitting Edema (Fluid Retention)' },
    { slug: 'foot_l', desc: 'Gout (Red/Hot Big Toe)' },
    { slug: 'foot_l', desc: 'Bunion (Hallux Valgus)' },
    { slug: 'foot_l', desc: 'Hammer Toe' },
    { slug: 'foot_l', desc: 'Ingrown Toenail' },
    { slug: 'foot_l', desc: 'Onychomycosis (Fungal Nail)' },
    { slug: 'foot_l', desc: 'Athlete’s Foot (Itching/Peeling)' },
    { slug: 'foot_l', desc: 'Peripheral Neuropathy (Numbness)' },
    { slug: 'foot_l', desc: 'Burning Feet Sensation' },
    { slug: 'foot_l', desc: 'Cold Toes (Poor Circulation)' },
    { slug: 'foot_l', desc: 'Foot Drop (Weakness)' },
    { slug: 'foot_l', desc: 'Flat Feet Pain (Pes Planus)' },
    { slug: 'foot_l', desc: 'High Arch Pain (Pes Cavus)' },
    { slug: 'foot_l', desc: 'Morton’s Neuroma (Pebble in shoe)' },

    // --- RIGHT FOOT/ANKLE ---
    { slug: 'foot_r', desc: 'Plantar Fasciitis (Heel Pain)' },
    { slug: 'foot_r', desc: 'Heel Spur Pain' },
    { slug: 'foot_r', desc: 'Achilles Tendonitis' },
    { slug: 'foot_r', desc: 'Ankle Sprain (Swelling/Bruising)' },
    { slug: 'foot_r', desc: 'Pitting Edema (Fluid Retention)' },
    { slug: 'foot_r', desc: 'Gout (Red/Hot Big Toe)' },
    { slug: 'foot_r', desc: 'Bunion (Hallux Valgus)' },
    { slug: 'foot_r', desc: 'Hammer Toe' },
    { slug: 'foot_r', desc: 'Ingrown Toenail' },
    { slug: 'foot_r', desc: 'Onychomycosis (Fungal Nail)' },
    { slug: 'foot_r', desc: 'Athlete’s Foot (Itching/Peeling)' },
    { slug: 'foot_r', desc: 'Peripheral Neuropathy (Numbness)' },
    { slug: 'foot_r', desc: 'Burning Feet Sensation' },
    { slug: 'foot_r', desc: 'Cold Toes (Poor Circulation)' },
    { slug: 'foot_r', desc: 'Foot Drop (Weakness)' },
    { slug: 'foot_r', desc: 'Flat Feet Pain (Pes Planus)' },
    { slug: 'foot_r', desc: 'High Arch Pain (Pes Cavus)' },
    { slug: 'foot_r', desc: 'Morton’s Neuroma (Pebble in shoe)' },

    // ==================== GENERAL / SYSTEMIC ====================
    { slug: 'general', desc: 'Fever (Pyrexia)' },
    { slug: 'general', desc: 'Low Grade Fever' },
    { slug: 'general', desc: 'Chills / Rigors (Shaking)' },
    { slug: 'general', desc: 'Night Sweats (Drenching)' },
    { slug: 'general', desc: 'Cold Sweats (Clammy)' },
    { slug: 'general', desc: 'Heat Intolerance' },
    { slug: 'general', desc: 'Cold Intolerance' },
    { slug: 'general', desc: 'Profound Fatigue / Exhaustion' },
    { slug: 'general', desc: 'Chronic Fatigue Syndrome' },
    { slug: 'general', desc: 'Malaise (General Feeling of Unwellness)' },
    { slug: 'general', desc: 'Generalized Weakness (Asthenia)' },
    { slug: 'general', desc: 'Body Aches (Myalgia)' },
    { slug: 'general', desc: 'Joint Pain (Arthralgia)' },
    { slug: 'general', desc: 'Unexplained Weight Loss' },
    { slug: 'general', desc: 'Unexplained Weight Gain' },
    { slug: 'general', desc: 'Loss of Appetite (Anorexia)' },
    { slug: 'general', desc: 'Polyphagia (Excessive Hunger)' },
    { slug: 'general', desc: 'Polydipsia (Excessive Thirst)' },
    { slug: 'general', desc: 'Dehydration (Dry mucous membranes)' },
    { slug: 'general', desc: 'Insomnia (Difficulty Sleeping)' },
    { slug: 'general', desc: 'Hypersomnia (Excessive Sleeping)' },
    { slug: 'general', desc: 'Sleep Apnea (Snoring/Gasping)' },
    { slug: 'general', desc: 'Restless Leg Syndrome' },
    { slug: 'general', desc: 'Nausea' },
    { slug: 'general', desc: 'Vomiting (Emesis)' },
    { slug: 'general', desc: 'Diarrhea' },
    { slug: 'general', desc: 'Steatorrhea (Fatty/Floating Stool)' },
    { slug: 'general', desc: 'Constipation' },
    { slug: 'general', desc: 'Melena (Black Tarry Stool)' },
    { slug: 'general', desc: 'Syncope (Fainting)' },
    { slug: 'general', desc: 'Dizziness / Lightheadedness' },
    { slug: 'general', desc: 'Motion Sickness' },
    { slug: 'general', desc: 'Swollen Lymph Nodes (Generalized)' },
    { slug: 'general', desc: 'Easy Bruising' },
    { slug: 'general', desc: 'Slow Wound Healing' },
    { slug: 'general', desc: 'Edema (Generalized Swelling)' },
    { slug: 'general', desc: 'Pruritus (Generalized Itching)' },
    { slug: 'general', desc: 'Hives (Urticaria)' },
    { slug: 'general', desc: 'Rash (Maculopapular)' },
    { slug: 'general', desc: 'Petechiae (Tiny red dots)' },
    { slug: 'general', desc: 'Purpura (Purple spots)' },
    { slug: 'general', desc: 'Anxiety / Panic Attacks' },
    { slug: 'general', desc: 'Depression / Low Mood' },
    { slug: 'general', desc: 'Irritability' },
    { slug: 'general', desc: 'Mood Swings' },
    { slug: 'general', desc: 'Tremors (Whole body)' },
    { slug: 'general', desc: 'Seizures (Convulsions)' }
];

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