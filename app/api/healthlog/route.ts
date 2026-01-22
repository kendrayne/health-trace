import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from '@/app/lib/db';

const secret = process.env.NEXTAUTH_SECRET;

interface LoggedSymptomPayload {
    id: string;
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


        const body = await req.json() as HealthLogSchema;


        const effectiveUserId = token?.sub || body.userId;

        if (!effectiveUserId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const {
            dietQuality, exercise, nicotine, alcohol, caffeine, 
            marijuana, sleep, mood, loggedSymptoms, loggedMedications, water
        } = body;


        const processedMedications = await Promise.all(
            (loggedMedications || []).map(async (med) => {

                let medication = await prisma.medication.findFirst({
                    where: {
                        userId: effectiveUserId,
                        name: { equals: med.name, mode: 'insensitive' }
                    }
                });


                if (!medication) {
                    medication = await prisma.medication.create({
                        data: {
                            name: med.name,
                            userId: effectiveUserId, 
                            defaultStrength: med.strength,
                            unit: med.unit
                        }
                    });
                }

                return {
                    medicationId: medication.id,
                    strengthTaken: med.strength
                };
            })
        );


        await prisma.healthLog.create({
            data: {
                
                user: {
                    connect: { id: effectiveUserId }
                },
                dietQuality, exercise, nicotine, alcohol, 
                caffeine, marijuana, sleep, mood, water,
                

                loggedSymptoms: {
                    create: (loggedSymptoms || []).map((sym) => ({
                        symptomId: sym.id,
                        severity: 1,
                        userId: effectiveUserId 
                    }))
                },
                

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
        return NextResponse.json({ success: false, message: "Internal Server Error", error: String(error) }, { status: 500 });
    }
}


export async function GET(req: NextRequest) { 
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) return NextResponse.json({ healthLogData: [], message: "No userId" });

    try { 
        const userHealthLogData = await prisma.healthLog.findMany({
            where: { userId: userId },
            include: {
                loggedSymptoms: { include: { symptom: true } }, // Include details
                loggedMedications: { include: { medication: true } } // Include details
            },
            orderBy: { date: 'desc' }
        });
        
        return NextResponse.json({ success: true, userHealthLogData });
    } catch (e) {
        return NextResponse.json({ success: false, message: "Fetch failed", e })
    }
}