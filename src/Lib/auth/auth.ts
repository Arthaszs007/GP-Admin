import NextAuth,{User} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '../../../auth.config';
import { z } from 'zod';


 
async function getUser(username: string,password:string):Promise<User | undefined>{
  try {
    const user: User = {
        name: "",
        email: null,
        image:null
      };
    const data = await fetch(`http://localhost:3000/api/db/${username}`, {
      method: "GET",
    }).then((res) => res.json());
        if (data.admin[0].password === password) {
         
          user.name = data.admin[0].username;
         
          return user
        }else{
            return undefined
        }
   
    
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          
          const user = await getUser(username,password);
         
          if (!user) return null;
          return user
        }
        
        return null;
      },
    }),
  ],
});