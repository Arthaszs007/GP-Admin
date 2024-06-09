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

export async function PUT(req:Request) {
    return NextResponse.json("",{status:200})
}

export async function POST(req:Request){
    return NextResponse.json("",{status:200})
}

export async function DELETE(req:Request){
    return NextResponse.json("",{status:200})
}