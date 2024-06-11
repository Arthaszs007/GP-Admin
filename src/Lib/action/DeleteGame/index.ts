import { customError } from "@/Lib/customError"
import { EErrorType } from "@/Lib/enum"

export async function action_DeleteGame(gameid:string) {
    try{
        const res = await fetch(`${process.env.DEPLOY_URL}/api/db/games?id=${gameid}`,
        {
            method:"DELETE",
             headers: {
            'Content-Type': 'application/json'
          }
        })

        if(!res.ok) throw new customError("failed to fetch",EErrorType.FETCH_FAILD)

        const data = await res.json();
        return {error:"",code:EErrorType.NO_ERROR}
    }catch(e){
        if(e instanceof customError && e.code === EErrorType.FETCH_FAILD) return {error:e.message,code:e.code}
    }
}