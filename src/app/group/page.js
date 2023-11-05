"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import fileDownload from "js-file-download";


export const config = {
    api: {
      bodyParser: false,
    },
};



export default function grp() {
    const [grpname,setgrpname]=useState("");
    const [emails,setEmail]=useState(null);
    const [fileu,setFile]=useState(null);
    const [grps,setgrps]=useState([]);
    // let users=[];
    const [users,setUsers]=useState([]);
    const [files,setFiles]=useState([]);
    
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
        setUsers(res.data);
        // console.log(users);
        //setUsers(res.data)
        // ((i1,ind)=>{
        //     <li key={ind}>
        //     {i1}
        //     <button onClick={()=>deleteuser(i,i1)}>delete</button>
        //     </li>
        // }))
        // (res.data).map((i1,ind)=>{
        //     <li key={ind}>
        //     {i1}
        //     <button onClick={()=>deleteuser(i,i1)}>delete</button>
        //     </li>
        // })
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
        console.log(res);
        setFiles(res.data);
        // mapfiles=res.data.map((i1,ind)=>{
        //     <li key={ind}>
        //         {i1}
        //         <button >download file</button>
        //     </li>
        // })
    }
    async function addfile(i){
        if(fileu===null)return false;
        let fr=new FileReader();
        fr.readAsText(fileu);
        console.log("filename ",fileu.name);
        fr.onload=async function(){
            const buffer=Buffer.from(fr.result,'latin1');
            const bufString = buffer.toString('hex');
           
            const res=await axios.post('/api/file/upload',{
                name:i,
                fileName:fileu.name,
                email:session.data.user.email,
                hexfile:bufString
            })
            console.log(res)
          }
    }
    async function downloadfile(i,i1){
        const res=await axios.post('/api/file/download',{
            name:i,
            fileid:i1,
            email:session.data.user.email
        })
        console.log(res.data.headers.Name)
        fileDownload(res.data.data.datafile,res.data.headers.Name);
        console.log(res.data)

    }
    async function search(){
        const res=await axios.post('/api/group/showgrp',{
            email:session.data.user.email
        })

        console.log(res.data);
        
        setgrps(res.data);
        
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
        {
            grps.map((i,ind)=>(
                <li key={ind}>
                {i}
                <button onClick={()=>showusers(i)}>showusers</button>
                {users.map((i1,ind1)=>{
                    return(
                    <li key={ind1}>{i1}
                    <button onClick={()=>deleteuser(i,i1)}>delete</button>
                    </li>)
                })}
                <input type='email' placeholder="email to add" onChange={e=>setEmail(e.target.value)}/>
                <button onClick={()=>adduser(i)}>add user</button>
                <input type="file"placeholder="add filename" onChange={e=>setFile(e.target.files[0])}/>
                <button onClick={()=>addfile(i)}>add file</button>
                <button onClick={()=>showfiles(i)}>show files</button>
                {files.map((i1,ind1)=>{
                    return(
                    <li key={ind1}>{i1.name}
                    <button onClick={()=>downloadfile(i,i1.id)}>download</button>
                    </li>)
                })}
                <button onClick={()=>deletegrp(i)}>delete</button>
                </li>
            ))
        }
        
       
       
        
        
        {/* <ul>{mapusers}</ul>
        <ul>{mapfiles}</ul> */}
        
    </div>
    )}
  
}
