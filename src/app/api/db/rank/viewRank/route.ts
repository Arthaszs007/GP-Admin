import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    // get the params from the body of req 
    const {searchParams} = new URL(req.url);
    const ids = searchParams.get('ids');

    //split the params into a array
    const content = ids?.split('/');
    

    //connect db 
    const client = await clientPromise;
    const db = client.db("GP");

    const res = await db
    .collection("games")
    .find(
        {id:{$in:content}},
        {projection:{name:1,genre:1}})
    .toArray()

    return NextResponse.json(res,{status:200})
}