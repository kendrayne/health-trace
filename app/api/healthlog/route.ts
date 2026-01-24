import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/lib/db";

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
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as HealthLogSchema;

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
      water
    } = body;

    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const processedMedications = await Promise.all(
      (loggedMedications || []).map(async (med) => {
        let medication = await prisma.medication.findFirst({
          where: {
            userId,
            name: { equals: med.name, mode: "insensitive" }
          }
        });

        if (!medication) {
          medication = await prisma.medication.create({
            data: {
              name: med.name,
              userId,
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

    const log = await prisma.healthLog.create({
      data: {
        user: { connect: { id: userId } },
        date,
        dietQuality,
        exercise,
        nicotine,
        alcohol,
        caffeine,
        marijuana,
        sleep,
        mood,
        water,

        loggedSymptoms: {
          create: (loggedSymptoms || []).map((sym) => ({
            symptomId: sym.id,
            severity: 1,
            userId
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

    return NextResponse.json({ success: true, message: "Log added successfully!", log });
  } catch (error) {
    console.error("HealthLog Create Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const healthLogs = await prisma.healthLog.findMany({
      where: { userId },
      orderBy: { date: "desc" }
    });

    if (!healthLogs.length) {
      return NextResponse.json({
        success: true,
        healthLogs: [],
        symptoms: [],
        medications: []
      });
    }

    const healthLogIds = healthLogs.map(log => log.id);

    const [symptoms, medications] = await Promise.all([
      prisma.loggedSymptom.findMany({
        where: { healthLogId: { in: healthLogIds } },
        include: { symptom: true }
      }),
      prisma.loggedMedication.findMany({
        where: { healthLogId: { in: healthLogIds } },
        include: { medication: true }
      })
    ]);

    return NextResponse.json({
      success: true,
      healthLogs,
      symptoms,
      medications
    });
  } catch (error) {
    console.error("HealthLog Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Fetch failed", error: String(error) },
      { status: 500 }
    );
  }
}
