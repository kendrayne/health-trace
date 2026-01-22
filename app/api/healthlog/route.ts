import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from '@/app/lib/db';
import { UserSessionSchema } from "@/schemas";
import { z } from 'zod';

const secret = process.env.NEXTAUTH_SECRET;

// Define strict types for the incoming payload
interface LoggedSymptomPayload {
    id: string; // The Symptom ID from the database
    name: string;
}

interface LoggedMedicationPayload {
    name: string;
    strength: number | null;
    unit: string | null;
}

interface HealthLogSchema {
    dietQuality: number;
    exercise: number;
    nicotine: number;
    alcohol: number;
    caffeine: number;
    marijuana: number;
    sleep: number;
    mood: number;
    loggedSymptoms: LoggedSymptomPayload[];
    loggedMedications: LoggedMedicationPayload[];
    water: number;
    userId: string;
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json() as HealthLogSchema;

        const {
            dietQuality,
            exercise,
            nicotine,
            alcohol,
            caffeine,
            marijuana,
            sleep,
            mood,
            loggedSymptoms,
            loggedMedications,
            water,
            userId
        } = data;

        // 1. Prepare Medication Connections
        // Since medications might not exist yet, we loop through them.
        // We find the medication by name for this user, or create it if missing.
        const processedMedications = await Promise.all(
            (loggedMedications || []).map(async (med) => {
                // Try to find existing medication for this user
                let medication = await prisma.medication.findFirst({
                    where: {
                        userId: userId,
                        name: { equals: med.name, mode: 'insensitive' } // Case insensitive match
                    }
                });

                // If not found, create the Medication profile
                if (!medication) {
                    medication = await prisma.medication.create({
                        data: {
                            name: med.name,
                            userId: userId,
                            defaultStrength: med.strength,
                            unit: med.unit
                        }
                    });
                }

                // Return the data needed for the LoggedMedication entry
                return {
                    medicationId: medication.id,
                    strengthTaken: med.strength
                };
            })
        );

        // 2. Create the Health Log with nested relations
        await prisma.healthLog.create({
            data: {
                userId,
                dietQuality,
                exercise,
                nicotine,
                alcohol,
                caffeine,
                marijuana,
                sleep,
                mood,
                water,
                // Create Nested LoggedSymptoms
                loggedSymptoms: {
                    create: (loggedSymptoms || []).map((sym) => ({
                        symptomId: sym.id, // Connect using the ID passed from frontend
                        userId: userId,
                        severity: 1 // Default severity, or pass from frontend if you add that input later
                    }))
                },
                // Create Nested LoggedMedications
                loggedMedications: {
                    create: processedMedications.map((med) => ({
                        medicationId: med.medicationId,
                        strengthTaken: med.strengthTaken
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, message: "Log added successfully!" });

    } catch (error) {
        console.error("HealthLog Create Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(req: NextRequest, res: NextResponse) { 

    const searchParams = req.nextUrl.searchParams;


    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ 
           healthLogData: [],
           message: "failed to retrieve userId from url.",
        });
    }
    

    try { 
        const userHealthLogData = await prisma.healthLog.findMany({
            where: { 
                userId: userId
            },
          
        });
            console.log(userHealthLogData + "server query")
        if (userHealthLogData.length <= 0) {
            return NextResponse.json({success: true, message: "there are no health logs to send back."})
        } 

        return NextResponse.json({success: true, userHealthLogData, message: "Health log data fetch success"})
    } catch (e) {
        return NextResponse.json({success: false, message: "unable to fetch health log data.", e})
    }


}