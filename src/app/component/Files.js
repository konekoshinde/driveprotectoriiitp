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
export default function Files(props){
    const [fileu,setFile]=useState(null);
    const [files,setFiles]=useState([]);
    const i=props.grp;
    const owner=props.email
    
    async function uploadfile(){
      if(fileu===null)return alert("select a file")
      let fr=new FileReader();
      fr.readAsText(fileu);
      
      console.log("filename ",fileu.name);
      fr.onload=async function(){
          
          const buffer=Buffer.from(fr.result,'latin1');
          const bufString = buffer.toString('hex');
         
          const res=await axios.post('/api/file/upload',{
              name:i,
              fileName:fileu.name,
              email:owner,
              hexfile:bufString
          })
          console.log(res)
          alert(res.statusText);
        }
    }
    async function downloadfile(i1){
        const res=await axios.post('/api/file/download',{
            name:i,
            fileid:i1,
            email:owner
        })
        console.log(res.data.headers.Name)
        fileDownload(res.data.data.datafile,res.data.headers.Name);
        console.log(res.data)
        alert("downloaded successfully")
    }
    async function showfiles(){
      if (i=="")return 0;
      const res=await axios.post('/api/file/show',{
          name:i,
          email:owner
      })
      console.log(res);
      setFiles(res.data);
    }

    return(
      <div className="flex flex-col gap-y-5 m-10  h-[50vh] w-[100vh] overflow-scroll bg-cyan-800 p-10 rounded-3xl ">
        <div>

        <input type="file"placeholder="add filename" onChange={e=>setFile(e.target.files[0])}/>
        <button onClick={()=>uploadfile()} className="font-light text-sm text-center hover:font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-1 hover:stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
            </svg>
            add file
        </button>
        

        <br/>
        <br/>
        <button onClick={()=>showfiles()} className="font-light text-sm text-center hover:font-bold"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-1 hover:stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
          </svg>
          show files
        </button>
        </div>

        <div >
        {files.length>0 && 
        <div className="bg-cyan-50 p-10 flex flex-col ">
          {files.map((i1,ind1)=>{
            return(
              <li key={ind1} className="text-cyan-950 font-light flex flex-row justify-around text-lg hover:bg-cyan-100 p-2 m-2">
                <div className="w-[50vh] h-10 overflow-hidden">{i1.name}</div>
              <button onClick={()=>downloadfile(i1.id)} className="text-cyan-950 px-5 font-light text-sm text-center hover:font-bold bg-cyan-400 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 stroke-1 hover:stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              </button>
            </li>)
        })}</div>}
        </div>


      </div>
    )
}