import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req:Request){

    const client = await clientPromise;

    const db = client.db("GP")

    const config = await db
    .collection("config")
    .find()
    .toArray()

    return NextResponse.json(config,{status:200});
}

export async function PUT(req:Request){
    const config = await req.json();

    const client = await clientPromise;
    const db = client.db("GP");

    db.collection("config")
    .updateOne({id:"00001"},{$set:{pop:config.pop,editors:config.editors,upcome:config.upcome,news:config.news,release:config.release}})
}