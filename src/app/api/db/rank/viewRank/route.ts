import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";
// receive a ids as string and split them to id array, if the id in db, return the id, name and genre.
export async function GET(req:Request){
    // get the params from the body of req 
    const {searchParams} = new URL(req.url);
    const ids = searchParams.get('ids');

    //the ids can't be empty
    if(!ids) return NextResponse.json("params can't be empty",{status:400})

    //split the params into a array
    const content = ids?.split('/');
    

    //connect db 
    const client = await clientPromise;
    const db = client.db("GP");

    const res = await db
    .collection("games")
    .find(
        {id:{$in:content}},
        {projection:{id:1,name:1,genre:1}})
    .toArray()

    return NextResponse.json(res,{status:200})
}