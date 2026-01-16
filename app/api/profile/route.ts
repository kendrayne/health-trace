import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db'; 
import { getServerSession } from "next-auth"; 
import { authOptions } from '@/app/lib/auth';

export async function PUT(req: Request) {
    try {

        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        
        const {
            birthday,
            sex,
            weight,
            height,
            physicalActivityLevel,
            dietQuality,
            alcoholUse,
            nicotineUse,
            caffeineUse,
            marijuanaUse,
            conditions, 
            medicine,
        } = body;

        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                birthday: birthday ? new Date(birthday) : null,
                sex,
                weight: parseFloat(weight),
                height: parseFloat(height),
                physicalActivityLevel: Number(physicalActivityLevel),
                dietQuality: Number(dietQuality),
                alcoholUse: Boolean(alcoholUse), 
                nicotineUse: Boolean(nicotineUse),
                caffeineUse: Boolean(caffeineUse),
                marijuanaUse: Boolean(marijuanaUse),
                onboarded: true,

                conditions: {
                    deleteMany: {}, 
                    create: conditions
                        .filter((c: string) => c && c.trim() !== "")
                        .map((c: string) => ({
                            name: c,
                            conditionName: c,
                        })),
                },


                medications: {
                    deleteMany: {},
                    create: medicine
                        .filter((m: string) => m && m.trim() !== "")
                        .map((m: string) => ({
                            name: m,
                        })),
                },
            },
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error('[PROFILE_PUT]', error);
        return new NextResponse('Server error', { status: 500 });
    }
}