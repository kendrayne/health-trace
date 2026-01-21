import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from 'zod';

const searchSchema = z.string().min(1).max(100).trim();

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const parseRes = searchSchema.safeParse(searchParams.get('input'));

    if (!parseRes.success) {
        return NextResponse.json({ 
            bodyParts: [], 
            symptoms: [], 
            msg: "Invalid input" 
        });
    }

    const userQuery = parseRes.data.toLowerCase();

    const [bodyParts, symptoms] = await Promise.all([
        prisma.bodyPart.findMany({
            where: {
                keywords: { has: userQuery } 
            },
            include: {
                symptoms: true
            }
        }),


        prisma.symptom.findMany({
            where: {
                description: { contains: userQuery, mode: "insensitive" },
            },
            include: {
                bodyPart: true
            }
        })
    ]);

    return NextResponse.json({ 
        bodyPartsSymptomsQuery: bodyParts, 
        symptomsDataQuery: symptoms 
    });
}