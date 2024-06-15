import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";

// receive a id to match in data,if successfully, return the rank data, or return false[]
export async function GET(req:Request,{params}:{params:{rankid:string}}){

    const client = await clientPromise;
    const db = await client.db("GP");

    const result = String(params.rankid);


    const rank =await db
    .collection("rank")
    .find({id:result})
    .limit(1)
    .toArray();

    if (rank.length >0) return NextResponse.json(rank,{status:200})

    else return NextResponse.json(false,{status:400})
}