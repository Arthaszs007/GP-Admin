import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{gameid:string}}) {
    const client = await clientPromise;
    const result = String(params.gameid)
    const db = client.db("GP")
    const game = await db
    .collection("games")
    .find({id:result})
    .limit(1)
    .toArray();
    if(game.length>0) return NextResponse.json(true,{status:200})
    else return NextResponse.json(false,{status:200})
}