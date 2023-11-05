"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";




export default function Home() {
   
   const session=useSession();
   const router=useRouter();
   
   
   function signout(){
      
      // router.push("https://accounts.google.com/Logout")
      signOut();
      
      
   }
   if(session.status==="authenticated"){

      return(<div>
        u r authenticated
        {session.data.user.email}
        
        <button onClick={()=>signout()}>logout</button>
        
        
   </div>)}
   else return(
   <div>
    not authenticated

    <button onClick={()=>signIn("google")}>login</button>
    </div>
   )

}