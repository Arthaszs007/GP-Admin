import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";
// get the ranks info from "rank" collection , and return 10 pic data
export async function GET(req:Request) {
    const limit = 10;// set how many ranks to display in a page
    
    //get the params "page",format as  page=${a}
   const {searchParams} = new URL(req.url);
   const page = searchParams.get('page');
    //display 10 pics one time
   const skipPages = (Number(page)-1)*limit;

   // connect the db with the name
   const client = await clientPromise;
   const db = client.db("GP");
    
   //find ranks from the "rank" and limit 10 to display and return as array
   const rank = await db
   .collection("rank")
   .find({})
   .sort({_id:-1})//based on default id , sort by newest create order
   .skip(skipPages)// will skip the pic of data based on this number
   .limit(limit).toArray();
    return NextResponse.json(rank,{status:200})
}
// create a new ranke top on database,need pass params on body as rank type
export async function POST(req:Request) {

    const rank = await req.json();

    const client = await clientPromise;

    const db = client.db("GP");

    await db
    .collection("rank")
    .insertOne(rank);

    return NextResponse.json(rank,{status:200})
}

export async function PUT(req:Request){
    const rank = await req.json();

    const client = await clientPromise;
    const db = client.db("GP");

    db.collection("rank")
    .updateOne({id:rank.id},{$set:{name:rank.name,children:rank.children}})

    return NextResponse.json(rank,{status:200})
}

export async function DELETE(req:Request){
    const {searchParams} = new URL(req.url);
    const rankID = searchParams.get("rankid")

    const client = await clientPromise;
    const db = client.db("GP");

    await db
    .collection("rank")
    .deleteOne({id:rankID})

    

    return NextResponse.json("successfully done",{status:200})
}