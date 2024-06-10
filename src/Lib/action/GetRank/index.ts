import { customError } from "@/Lib/customError";
import { EErrorType } from "@/Lib/enum";

export async function action_GetRank(page:number) {
    try{
        // get the data from the api, should give a param with current page number
          const res = await fetch(
              `${process.env.DEPLOY_URL}/api/db/rank?page=${page}`,
              { 
                method: "GET" , 
                headers: { "Content-type": "application/json" }}
            );
            // if fetch faild , throw error
            if(!res.ok) throw new customError("faild to fetch",EErrorType.FETCH_FAILD)
          const data = await res.json();
        //return the number with data of  games and length
        return {data}
      }catch(e){
          if(e instanceof customError ) return {error:e.message,code:e.code}
      }
}