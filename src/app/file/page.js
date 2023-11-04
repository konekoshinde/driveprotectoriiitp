"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { headers } from '../../../next.config';

export default function File() {
    const [fileu,setFile]=useState(null);
    const [uploading, setUploading] = useState(false);

    // async function uploadfun(){
    //     const formdata=new FormData();
    //     formdata.append("myfile",file);
    //     console.log(formdata)
    //     setUploading(true);
    //     try{
    //         const data=await axios.post("/api/file/upload",formdata,{
    //           headers:{
    //             "content-type": "multipart/form-data",
    //           }
    //         });
    //         console.log(data)
    //     }
    //     catch(e){console.log(e);}
    // }
    async function uploadfun(){
      // console.log(file)
      let fr=new FileReader();
      // let textfile=""
      // fr.onload=function(){
      //   textfile=fr.result;
      //   let i=0;
      //   while(i!==textfile.length)console.log(textfile.charCodeAt(i).toString(16)),i++;
      //   console.log(textfile.charCodeAt(2).toString(16));
      // }
      // const buffer = Buffer.from(rawData, 'base64');
      fr.readAsText(fileu);
      // const formdata=new FormData();
      // formdata.append("file",fileu)
      try{
        // let buffer=""
        // const res= await axios.post("/api/file/upload",formdata);
        fr.onload=async function(){
          const buffer=Buffer.from(fr.result,'latin1');
          const bufString = buffer.toString('hex');
          console.log(bufString)
          // console.log(res);
        }
      }
      catch(e){
        console.log(e)
      }
    }
  return (
    <div>
      
      <input type='file' placeholder='choose a file' onChange={e=>setFile(e.target.files[0])}/>
      {fileu &&<button onClick={()=>uploadfun()}>upload</button>}


    </div>
  )
}


