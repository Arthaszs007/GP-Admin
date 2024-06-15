
import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";

// get the 10 games information from db, 1 page to display 10 games
export async function GET(req:Request){
    const limit = 10;// set how many games to display in a page
    
    //get the params "page",format as  page=${a}
   const {searchParams} = new URL(req.url);
   const page = searchParams.get('page');
    //display 10 pics one time
   const skipPages = (Number(page)-1)*limit;

   // connect the db with the name
   const client = await clientPromise;
   const db = client.db("GP");
    
   //find games from the "games" and limit 10 to display and return as array
   const games = await db
   .collection("games")
   .find({})
   .sort({_id:-1})//based on default id , sort by newest create order
   .skip(skipPages)// will skip the pic of data based on this number
   .limit(limit).toArray();

   // return the games and total games number
    return NextResponse.json(games,{status:200})
   
}

// create the game information in DB
export async function POST(req:Request){
    //receive the data from the body
    const game:Game = await req.json();

    const client = await clientPromise;
    const db = client.db("GP");
 
    await db
    .collection("games")
    .insertOne(game);
 
   
     return NextResponse.json(game,{status:200})
    
 }
//update the game information in db
 export async function PUT(req:Request){
    //receive the data from the body
    const game:Game = await req.json()

    const client = await clientPromise;
    const db = client.db("GP");
    db
    .collection("games")
    //update the data by id , and cover the data by  $set{} inside
    .updateOne(
        {id:game.id},
        {$set:{name:game.name, genre:game.genre, description:game.description, release:game.release, images:game.images, platform:game.platform, developer:game.developer, scores:game.scores}})
   
     return NextResponse.json("successfully done",{status:200})
    
 }

 // delete the game by id
 export async function DELETE(req:Request){
    const {searchParams} = new URL(req.url)
    const gameID = searchParams.get('id')


    const client = await clientPromise
    const db = client.db("GP")
    await db
    .collection("games")
    .deleteOne({id:gameID})
 
   
     return NextResponse.json("successfully done",{status:200})
    
 }