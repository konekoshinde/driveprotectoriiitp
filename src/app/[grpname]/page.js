"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";



export default function grp() {

    const session=useSession();
    // const router=useRouter();
    const grpname=router.query.grpname;
    console.log(session)
    // const currUser=session.user.email;
     
    async function getusers(){
        // if(session.status==="authenticated"){

        //     const res=axios.post('/api/group/showuser',{
        //         name:grpname,
        //         email:session.user.email
        //     })
        //     console.log(res);
        // }
    }

    useEffect(()=>getusers,[]);
    // if(session.status==="unauthenticated" ){
    //     return(<div>pls authenticate</div>)
    // }
    // if(session.status==="authenticated"){
    //     return (
    //     <div>
    //         <input type="text" placeholder="enter name of grp" onChange={(e)=>setgrpname(e.target.value)}/>
    //         <button onClick={()=>send()}>send</button>
    //     </div>
    
    // )
    // }
}
