"use server"
import { customError } from "@/Lib/customError";
import { EErrorType } from "@/Lib/enum";
import {z} from "zod"

export async function action_CreateRanke(
    preState:{error:string,code:string}|undefined,
    formData:FormData
){
    try{
        
        const schema = z.object({
            id:z.string().min(1),
            name:z.string().min(1),
            children:z.string().min(1)
        })
       
        
        const data = schema.parse({
            id:formData.get("id"),
            name:formData.get("name"),
            children:formData.get("children")
        })
       
        // const isExist = await fetch(
        //     `${process.env.DEPLOY_URL}/api/db/rank/viewRank?ids=${data.id}`,
        //     {
        //         method:"GET",
        //         headers:{'Content-Type': 'application/json'}
        //     }
        // ).then((res)=>res.json());
       
        // console.log(222,isExist)

        // if(isExist.length === 0) throw new customError("rank id is used",EErrorType.ID_USED)

        const res =  await fetch(`${process.env.DEPLOY_URL}/api/db/rank`,
            {
                method:"POST",
                headers:{"Content-type": "application/json"},
                body: JSON.stringify(data),
            }
         )
         console.log(res.json())
         return {error:"no error",code:EErrorType.NO_ERROR}
        }catch(e){
            if(e instanceof z.ZodError) return {error:"can't be empty",code:EErrorType.UNVALID_INPUT}
            else if(e instanceof customError && e.code === EErrorType.ID_USED) return {error:e.message,code:e.code}
            else return {error:"unknown error", code:EErrorType.UNKNOWN}
        }
}