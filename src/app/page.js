"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

import Notauth from "./component/Notauth";


export default function Home() {
   
   const session=useSession();
   const router=useRouter();
   
   
   async function signout(){
      
      router.push("https://accounts.google.com/Logout")
      signOut();
      
      
   }
   if(session.status==="authenticated"){

      return(
         
         <div className="h-screen flex items-center justify-center flex-col gap-y-5">
         <div className="bg-cyan-50 p-10 flex flex-col justify-center gap-y-5 rounded-lg">
         <div className="text-cyan-950 font-bold text-center text-4xl tracking-widest uppercase">{session.data.user.name}</div>
         <div className="text-slate-800 text-center text-xl font-sans tracking-widest">welcome to drive protector
            <div className="font-light text-sm text-center">secured app for drive sharing</div>
         </div>
         <button className='bg-cyan-600 hover:bg-cyan-900 text-white font-bold py-3 px-5 rounded' onClick={()=>router.push("/group")}>groups</button>
         
         </div>
         <button className='bg-cyan-700 hover:bg-cyan-800 text-gray-300 py-2 px-4 rounded' onClick={()=>signout()}>logout</button>
         </div>)}
   else return(<Notauth/>)

    
   
   
}