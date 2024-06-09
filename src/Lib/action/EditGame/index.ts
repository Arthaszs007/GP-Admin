"use server"
import {z} from "zod"
import { customError } from "../../customError"
import { EErrorType } from "../../enum"

export async function action_EditGame  (  
    prevState: {error:string,code:string}|undefined,
    formData: FormData,
    ) {
    try{
        const schema = z.object({
            id:z.string().min(1),
            name:z.string().min(1),
            description:z.string().min(1),
            release:z.string().min(1),
            developer:z.string().min(1),
            genre:z.string().min(1),
            platform:z.string().min(1),
            scores:z.string().min(1),
            images:z.string().min(1),
            
        })
        const data = schema.parse({
            id:formData.get('id'),
            name:formData.get('name'),
            description:formData.get('description'),
            release:formData.get('release'),
            developer:formData.get('developer'),
            genre:formData.get('genre'),
            platform:formData.get('platform'),
            scores:formData.get('scores'),
            images:formData.get('images'),
            
        })
       
        //fetch the api and write data in database 
        await fetch("http://localhost:3000/api/db/games", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
        });
        return {error:"",code:EErrorType.NO_ERROR}
        

    }catch(e){
        if(e instanceof z.ZodError) return {error:"can't be empty",code:"VALIDATION_ERROR"}
        else if (e instanceof customError && e.code === EErrorType.ID_USED) {
            return {error:e.message,code:e.code}
        }
        else return {error:"unknown error",code:EErrorType.UNKNOWN}
    }

  };