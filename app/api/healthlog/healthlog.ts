import { NextRequest, NextResponse } from "next/server";



export async function GET( req: NextRequest, res: NextResponse ) {

        const data = await req.json();
        console.log(data);



}


export async function PUT( req: NextRequest ) {




}
