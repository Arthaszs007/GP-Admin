import { customError } from "@/Lib/customError";
import { EErrorType } from "@/Lib/enum";


// need 2 params, first is the collection name , the other is the how many pic to display in one page
export async function action_GetCollectionCount(collectionName:string,pageCut:number){

    try{
        // invoke the api with a param as collection name
        const res =  await fetch(`${process.env.DEPLOY_URL}/api/db/collectionCount?collection=${collectionName}`,
        {
            method:"GET"
        })
        if(!res.ok) throw new customError("params don't exist",EErrorType.PARAMS_UNDEFINED)
       
        const pageCount = await res.json();
       
        //count the pages
        const pages = Math.ceil( pageCount / pageCut);

        return {pages}

        
    }catch(e){
        if(e instanceof customError && e.code === EErrorType.FETCH_FAILD) return {error:e.message,code:e.code}
    }

    
    
} 

