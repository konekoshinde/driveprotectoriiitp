"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import fileDownload from "js-file-download";
import Users from "../component/Users";
import Files from "../component/Files";
import Notauth from "../component/Notauth";

export const config = {
    api: {
      bodyParser: false,
    },
};



export default function grp() {
    const [grpname,setgrpname]=useState("");
    const [currgrp,setCurrgrp]=useState(null);
    const [grps,setgrps]=useState([]);
    
    
    const session=useSession();
    
     
    async function addgrp(){
        if(grpname=="")alert("enter name");
        else{
        const res=await axios.post('/api/group/create',{
            name:grpname,
            email:session.data.user.email
        })
            console.log(res);
            alert(res.data);
        }
    }
    
    async function deletegrp(i){
        const res=await axios.post('/api/group/delete',{
            name:i,
            owner:session.data.user.email
        })
        console.log(res);
        alert(res.data);
    }
    
    
    
    
    async function search(){
        const res=await axios.post('/api/group/showgrp',{
            email:session.data.user.email
        })
        console.log(res.data);
        setgrps(res.data); 
    }

    if(session.status==="unauthenticated"){
        return(<Notauth/>)
    }

    if(session.status==="authenticated"){
        
        
        return (
        <div >
        <input type="text" className="text-slate-800 text-center text-xl font-sans tracking-widest" placeholder="enter name of grp" onChange={(e)=>setgrpname(e.target.value)}/>
        <button onClick={()=>addgrp()} className="font-light text-sm text-center hover:font-bold" >
            <svg className="w-10 h-10 stroke-1 hover:stroke-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            add
        </button>
        <div >

        <button onClick={()=>search()}>
        <svg  xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 stroke-1 hover:stroke-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
            list
        </button>
        </div>
        <div className="flex flex-row">
        <div>
        {grps.length>0 && 
        <div className="m-10  h-[50vh] w-[50vh] overflow-scroll flex flex-col gap-y-10 bg-cyan-800 rounded-full p-10">{
            grps.map((i,ind)=>(
               
                <li key={ind} className="flex flex-row justify-between bg-cyan-50 rounded-lg p-3">
                    <button onClick={()=>setCurrgrp(i)} className="text-cyan-950 font-light text-lg hover:font-bold text-center tracking-widest uppercase">{i}</button>
                    
                    <button onClick={()=>deletegrp(i)} className=" text-cyan-950 font-light text-xs text-center hover:font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-1 hover:stroke-2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    {/* delete */}
                    </button>
                </li>
                
            ))
        }
        </div>
        }
        </div>
        <div>
            {currgrp && 
            <div className="flex flex-row gap-x-10">
                <Files grp={currgrp} email={session.data.user.email}/>
                <Users grp={currgrp} email={session.data.user.email}/>
            </div>}
        </div>
        </div>
        
    </div>
    )}
  
}
