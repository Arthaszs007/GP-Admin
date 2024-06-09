import { customError } from "@/Lib/customError"
import { EErrorType } from "@/Lib/enum"

export async function action_ViewRan(ids:string){
    try{
        const res = await fetch(`http://localhost:3000/api/db/rank/viewRank?ids=${ids}`,
            {
                method:"GET",
                headers:{'Content-Type': 'application/json'}
            }
        )
        if(!res.ok) throw new customError("falied to fetch",EErrorType.FETCH_FAILD);
        
        const data = await res.json();
        
        return {data}

    }catch(e){
        if(e instanceof customError && e.code === EErrorType.FETCH_FAILD) return {message:e.message,code:e.code}
    }
}