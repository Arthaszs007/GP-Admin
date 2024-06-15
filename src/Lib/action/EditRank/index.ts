"use server"
import { EErrorType } from "@/Lib/enum"
import {z} from "zod"

export async function action_EditRank(
    preState:{error:string,code:string}|undefined,
    formData:FormData 
    ){
        try{
            const schema = z.object({
                id:z.string().min(1),
                name:z.string().min(1),
                children:z.string().min(1),
            })

            const data = schema.parse({
                id:formData.get("id"),
                name:formData.get("name"),
                children:formData.get("children")
            })

            await fetch(`${process.env.DEPLOY_URL}/api/db/rank`,{
                method:"PUT",
                headers:{ "Content-type": "application/json"},
                body: JSON.stringify(data)
            });
            return {error:"",code:EErrorType.NO_ERROR}

        }catch(e){
            if(e instanceof z.ZodError) return {error:"can't be empty",code:EErrorType.UNVALID_INPUT}
            else return {error:"Unkonwn error",code:EErrorType.UNKNOWN}
        }
}