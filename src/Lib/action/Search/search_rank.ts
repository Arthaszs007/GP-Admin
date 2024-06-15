import { customError } from "@/Lib/customError";
import { EErrorType } from "@/Lib/enum";

//receive a param and return a rank data by id 
export async function action_SearchRank(rankid:string){
    try{
        if(!rankid) throw new customError("rank id is empty",EErrorType.PARAMS_UNDEFINED)
        
        const res = await fetch(`${process.env.DEPLOY_URL}/api/db/rank/${rankid}`,
            {
                method:"GET",
                headers:{'Content-Type': 'application/json'}
            }
        );
        if(!res.ok) throw new customError("failed to fetch",EErrorType.FETCH_FAILD)

        const data = await res.json();

        return {data}

    }catch(e){
        if(e instanceof customError && e.code === EErrorType.FETCH_FAILD) return {error:e.message,code:e.code}
    }
}