import clientPromise from "@/Lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(req:Request) {
    
    const {searchParams} = new URL(req.url);
    const key = searchParams.get("key");
    const value = searchParams.get("value")

    const client = await clientPromise;
    const db = client.db("GP");
    //if key equal id, execute the full match
    if(key ==="id"){
        const game = await db
        .collection("games")
        .find({id:value},{
            projection:{
                _id:0,
                name:1,
                id:1,
                description:1,
                release:1,
                developer:1,
                genre:1,
                platform:1,
                scores:1,
                images:1,
            }})
        .limit(1)
        .toArray()

        return NextResponse.json(game,{status:200})
    }
    // if key equal name, execute fuzzy match
    else if(key ==="name"){
        const game = await db
        .collection("games").aggregate([
            {
                $search:{
                    index:"gameName",
                    text:{
                        path:"name",
                        query:value,
                        fuzzy:{}
                    }
                }},
                {
                    $project: {
                        name: 1, 
                        id: 1 ,    
                        description:1,
                        release:1,
                        developer:1,
                        genre:1,
                        platform:1,
                        scores:1,
                        images:1,
                        _id: 0 ,
                    }
                }
        ]).toArray()


    
        return NextResponse.json(game,{status:200})
    }    

    return NextResponse.json("none")
}