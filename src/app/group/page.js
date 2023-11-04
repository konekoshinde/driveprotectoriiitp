"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";



export default function grp() {
    const [grpname,setgrpname]=useState("");
    const [emails,setEmail]=useState(null);
    const [fileu,setFile]=useState(null);
    let [mapgrps,mapusers,mapfiles]=""
    const session=useSession();
    
    
     
    async function send(){
        const res=await axios.post('/api/group/create',{
            name:grpname,
            email:session.data.user.email
        })
        console.log(res);
    }
    async function showusers(i){
        const res=await axios.post('/api/group/showuser',{
            name:i,
            email:session.data.user.email
        });
        mapusers=(res.data).map((i1,ind)=>{
            <li key={ind}>
            {i1}
            <button onClick={()=>deleteuser(i,i1)}>delete</button>
            </li>
        })
    }
    async function deleteuser(i,i1){
        const res=await axios.post('/api/group/deleteuser',{
            name:i,
            email:i1,
            owner:session.data.user.email
        })
    }
    async function deletegrp(i){
        const res=await axios.post('/api/group/delete',{
            name:i,
            owner:session.data.user.email
        })
    }
    async function adduser(i){
        if(emails===null)return false;
        const res=await axios.post('/api/group/adduser',{
            name:i,
            email:emails,
            owner:session.data.user.email
        })
    }
    async function showfiles(i){
        const res=await axios.post('/api/file/show',{
            name:i,
            email:session.data.user.email
        })
        mapfiles=res.data.map((i1,ind)=>{
            <li key={ind}>
                {i1}
                <button>download file</button>
            </li>
        })
    }
    async function addfile(i){
        if(fileu===null)return false;
        let fr=new FileReader();
        fr.readAsText(fileu);
        fr.onload=async function(){
            const buffer=Buffer.from(fr.result,'latin1');
            const bufString = buffer.toString('hex');
           
            const res=await axios.post('/api/file/upload',{
                name:i,
                email:session.data.user.email,
                hexfile:bufString
            })
          }
    }
    async function search(){
        const res=await axios.post('/api/group/showgrp',{
            email:session.data.user.email
        })
        mapgrps=(res.data).map((i,ind)=>{
            <li key={ind}>
                {i}
                <button onClick={()=>showusers(i)}>showusers</button>
                <input type='email' placeholder="email to add" onChange={e=>setEmail(e.target.value)}/>
                <button onClick={()=>adduser(i)}>add user</button>
                <input type="file"placeholder="add filename" onChange={e=>setFile(e.target.files[0])}/>
                <button onClick={()=>addfile(i)}>add file</button>
                <button onClick={()=>showfiles(i)}>show files</button>
                <button onClick={()=>deletegrp(i)}>delete</button>
                </li>
        });
    }
    if(session.status==="unauthenticated"){
        return(<div>pls authenticate</div>)
    }
    if(session.status==="authenticated"){
        console.log(session.data.user.email)
        return (
    <div>
        <input type="text" placeholder="enter name of grp" onChange={(e)=>setgrpname(e.target.value)}/>
        <button onClick={()=>send()}>add group</button>
        <button onClick={()=>search()}>show groups</button>
        <ul>{mapgrps}</ul>
        <ul>{mapusers}</ul>
        <ul>{mapfiles}</ul>
        
    </div>
    )}
  
}
