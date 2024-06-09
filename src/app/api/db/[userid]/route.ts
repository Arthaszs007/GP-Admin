import { NextResponse } from "next/server";
import clientPromise from "@/Lib/mongodb";



export async function GET(req:Request,{params}:{params:{userid:string}}){
    
        const client = await clientPromise
        const result = String(params.userid)
        const db = client.db("GP")
        const admin = await db
        .collection("admin")
        .find({username:result})
        .sort({ metacritic: -1 })
        .limit(1)
        .toArray();
        return NextResponse.json({admin},{status:200})
       
}