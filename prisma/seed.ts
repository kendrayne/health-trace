import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv'

// 1. Manually load the .env file
dotenv.config()

// 2. Initialize the client with the explicit accelerateUrl
// We use a fallback check to make sure it's not undefined
const url = process.env.DATABASE_URL

if (!url) {
  throw new Error("DATABASE_URL is not defined in your .env file")
}

const prisma = new PrismaClient({
  accelerateUrl: url,
}).$extends(withAccelerate())

async function main() {
    console.log("s-eed starting-");

    // Alex Demo user
    const seedUser = await prisma.user.upsert({
        where: { email: 'alex@example.com' },
        update: {},
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
        { name: 'Head', slug: 'head' }, { name: 'Neck', slug: 'neck' }, { name: 'Face', slug: 'face' }, 
        { name: 'Jaw', slug: 'jaw' }, { name: "Mouth", slug: 'mouth' }, { name: 'Throat', slug: 'throat' }, 
        { name: "Nose", slug: 'nose' }, { name: "Ears", slug: 'ears' }, { name: "Eyes", slug: 'eyes' },
        { name: "Left Chest", slug: 'chest_l' }, { name: "Right Chest", slug: 'chest_r' }, { name: "Center Chest", slug: 'chest_c' },
        { name: "Breast", slug: 'breast' },
        { name: 'Upper Back', slug: 'back_upper' }, { name: 'Mid Back', slug: 'back_mid' }, { name: 'Lower Back', slug: 'back_lower' },
        { name: 'Upper-Right Abdomen (RH)', slug: 'abd_rh' }, 
        { name: 'Upper-Center Abdomen (CH)', slug: 'abd_ch' }, 
        { name: 'Upper-Left Abdomen (LH)', slug: 'abd_lh' },
        { name: 'Mid-Right Abdomen (RL)', slug: 'abd_rl' }, 
        { name: 'Mid-Mid Abdomen (UM)', slug: 'abd_um' }, 
        { name: 'Mid-Left Abdomen (LL)', slug: 'abd_ll' },
        { name: 'Lower-Right Abdomen (RI)', slug: 'abd_ri' }, 
        { name: 'Lower-Mid Abdomen (HP)', slug: 'abd_hp' }, 
        { name: 'Lower-Left Abdomen (LI)', slug: 'abd_li' },
        { name: 'Genitalia/Groin', slug: 'genitalia' },
        { name: 'Pelvic Floor', slug: 'pelvic_floor' },
        { name: 'Left Hand/Wrist', slug: 'hand_l' }, { name: 'Right Foot/Ankle', slug: 'foot_r' },
        { name: 'General/Whole Body', slug: 'general' }
    ];

    for (const part of bodyParts) {
        await prisma.bodyPart.upsert({
            where: { slug: part.slug },
            update: { name: part.name },
            create: part
        });
    }

    const symptomLibrary = [
        // === HEAD & SENSES ===
        { slug: 'head', desc: 'Migraine with Aura' },
        { slug: 'head', desc: 'Dull Tension Headache' },
        { slug: 'head', desc: 'Cluster Pain Behind Eye' },
        { slug: 'head', desc: 'Dizziness / Vertigo' },
        { slug: 'head', desc: 'Brain Fog / Poor Focus' },
        { slug: 'head', desc: 'Visual Flashing or Floaters' },
        { slug: 'head', desc: 'Sudden "Thunderclap" Pain' },
        { slug: 'head', desc: 'Scalp Tenderness' },
        { slug: 'head', desc: 'Light Sensitivity (Photophobia)' },
        { slug: 'head', desc: 'Sound Sensitivity (Phonophobia)' },

        // === CHEST ===
        { slug: 'chest_c', desc: 'Crushing Central Pressure' },
        { slug: 'chest_c', desc: 'Heart Racing / Palpitations' },
        { slug: 'chest_l', desc: 'Sharp Stabbing when Inhaling' },
        { slug: 'breast', desc: 'Cyclical Tenderness / Soreness' },

        // === ABDOMINAL (RH, CH, LH) ===
        { slug: 'abd_ch', desc: 'Gnawing Epigastric Pain' },
        { slug: 'abd_ch', desc: 'Acid Reflux / Burning' },
        { slug: 'abd_rh', desc: 'Gallbladder Area Cramping' },
        { slug: 'abd_lh', desc: 'Sharp Stitch Under Left Ribs' },

        // === ABDOMINAL (RL, UM, LL) ===
        { slug: 'abd_um', desc: 'Periumbilical Cramping' },
        { slug: 'abd_um', desc: 'Severe Bloating / Distension' },
        { slug: 'abd_rl', desc: 'Right Flank Aching (Kidney)' },
        { slug: 'abd_ll', desc: 'Left Flank Aching (Kidney)' },

        // === ABDOMINAL (RI, HP, LI) ===
        { slug: 'abd_ri', desc: 'Acute Appendix Area Tenderness' },
        { slug: 'abd_hp', desc: 'Suprapubic / Bladder Pressure' },
        { slug: 'abd_li', desc: 'Deep Left Side Pressure' },

        // === GENITALIA & PELVIC FLOOR ===
        { slug: 'genitalia', desc: 'Sharp Testicular Stabbing' },
        { slug: 'genitalia', desc: 'Sharp Ovarian Stabbing' },
        { slug: 'pelvic_floor', desc: 'Deep Internal Pelvic Pressure' },

        // === BACK & SPINE ===
        { slug: 'back_lower', desc: 'Sharp Shooting Sciatica' },
        { slug: 'back_lower', desc: 'Deep Lumbar Muscle Spasm' },

        // === SYSTEMIC ===
        { slug: 'general', desc: 'Profound Fatigue / Lethargy' },
        { slug: 'general', desc: 'Fever with Chills' },
        { slug: 'general', desc: 'Excessive Night Sweats' }
    ];

    for (const s of symptomLibrary) {
        const partRecord = await prisma.bodyPart.findUnique({ where: { slug: s.slug } });
        if (partRecord) {
            await prisma.symptom.create({
                data: {
                    userId: seedUser.id,
                    bodyPartId: partRecord.id,
                    description: s.desc,
                }
            });
        }
    }
    console.log('seed complete');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });