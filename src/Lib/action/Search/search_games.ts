"use client"
import { customError } from "@/Lib/customError";
import { EErrorType } from "@/Lib/enum";

export  async function action_SearchGames(key:string,value:string) {
    try{
        if(!key||!value) throw new customError("key or value can't be empty",EErrorType.PARAMS_UNDEFINED)
        
        const res = await fetch(
            `http://localhost:3000/api/db/games/search?key=${key}&value=${value}`,
            { 
                method:"GET", 
                headers: {
                'Content-Type': 'application/json'
              } }
        );
        if(!res.ok) throw new customError("faild to fetch",EErrorType.FETCH_FAILD)
        
        const data = await res.json();

        return {data}
 
    }catch(e){
        if(e instanceof customError ) return {error: e.message,code:e.code}

    }

}