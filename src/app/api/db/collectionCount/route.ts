import { customError } from "@/Lib/customError";
import { EErrorType } from "@/Lib/enum";
import clientPromise from "@/Lib/mongodb"
import { NextResponse } from "next/server";

export async function GET(req:Request){
    const {searchParams} = new URL(req.url)
    //pass params as a collection name
    const collectionName = searchParams.get("collection")

    const client = await clientPromise;
  
    try{
          // if the collection name is null ,will throw error
        if(!collectionName){
            throw new customError(`${collectionName} of collection name can't be null`,EErrorType.PARAMS_UNDEFINED)
        }
        const db = client.db("GP")

        const count = await db.collection(`${collectionName}`)
        .countDocuments();// get count 

        // if the collection name can't find in db, will throw error
        if(count === 0) throw new customError(`${collectionName} doesn't exist`, EErrorType.FETCH_FAILD)

        // if ok, will return the count of collection 
        return NextResponse.json(count,{status:200})
    }catch(e){
        // throw the error.code
        if(e instanceof customError && e.code === EErrorType.FETCH_FAILD) return NextResponse.json(e.code,{status:400})
        else if (e instanceof customError && e.code === EErrorType.PARAMS_UNDEFINED) return NextResponse.json(e.code,{status:400})
    }

    
}