import { customError } from "@/Lib/customError"
import { EErrorType } from "@/Lib/enum"

export async function action_DeleteRank(rankid:string){
    try{
        const res = await fetch(`${process.env.DEPLOY_URL}/api/db/rank?rankid=${rankid}`,
            {
                method:"DELETE",
                headers:{'Content-Type': 'application/json'}
            }
        )
        if(!res.ok) throw new customError("failed to fetch",EErrorType.FETCH_FAILD)

            return {error:"",code:EErrorType.NO_ERROR}

    }catch(e){
        if(e instanceof customError && e.code === EErrorType.FETCH_FAILD) return {error:e.message,code:EErrorType.FETCH_FAILD}
    }
}