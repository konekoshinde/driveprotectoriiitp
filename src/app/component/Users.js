"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import fileDownload from "js-file-download";

export const config = {
    api: {
      bodyParser: false,
    },
};
export default function Users(props){
    const [users,setUsers]=useState([]);
    const [emails,setEmail]=useState("");
    const i=props.grp;
    const owner=props.email;
    async function showusers(i){
        const res=await axios.post('/api/group/showuser',{
            name:i,
            email:owner
        });
        console.log(res);
        setUsers(res.data);
        
    }
    async function deleteuser(i,i1){
        const res=await axios.post('/api/group/deleteuser',{
            name:i,
            email:i1,
            owner:owner
        })
        console.log(res);
        alert(res.data);
    }
    async function adduser(i){
        if(emails==="")alert("enter name");
        else{
            const res=await axios.post('/api/group/adduser',{
                name:i,
                email:emails,
                owner:owner
            })
            console.log(res);
            alert(res.data);
        }
    }
    return(<>
    <div className="my-10 w-[29vh] h-[50vh] bg-cyan-800 p-2  rounded-xl py-10">
      <div>
        <input type="email" className="text-slate-800 text-center font-sans tracking-widest w-[27vh]" placeholder="email to add" onChange={e=>setEmail(e.target.value)}/>
        <button onClick={()=>adduser(i)} className="font-light text-sm text-center hover:font-bold">   
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 stroke-1 hover:stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
            
        </button>
        <br/>
        <button onClick={()=>showusers(i)} className="font-light text-sm text-center hover:font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 stroke-1 hover:stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
           
        </button>
        </div>

        {users.length>0 && 
        <div className="bg-cyan-50 px-2 py-1 flex flex-col gap-y-2 w-[28vh] h-[30vh] text-sm overflow-scroll">
        {users.map((i1,ind1)=>{
            return(
                <li key={ind1} className="text-cyan-950 font-light flex flex-row justify-between hover:bg-cyan-100">
                    {i1.split('@')[0]}
                    <button onClick={()=>deleteuser(i,i1)} className="text-cyan-950 px-1  font-light text-sm text-center hover:font-bold bg-cyan-400 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-5 stroke-1 hover:stroke-2" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                    </button>
                </li>)
        })}</div>}

        

    </div>
    </>)
}