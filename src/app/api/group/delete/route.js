import { connect } from "@/dbConfig/dbConfig";
import { RSA } from "hybrid-crypto-js";
import aes from "crypto-js/aes";

import axios from "axios";
import User from "@/models/users";
import Group from "@/models/group";



const rsa = new RSA();

export const POST=async(req)=>{
    const request=await req.json();
    console.log(request);
    try{
        await connect();
        const grp=await Group.findOne({name:request.name});
        if(grp===null || !grp.ownerEmail.includes(request.owner)){
            return Response.json("grp doesnt exists");
        }
        const user1=await User.findOne({email:request.owner});
        
        // console.log(grp.folderId);
        if(grp.userEmails.length===1 && grp.userEmails[0]===request.owner){
            await axios.delete(
                `https://www.googleapis.com/drive/v3/files/${grp.folderId}`,
                {
                    headers:{
                        Authorization:`Bearer ${user1.access_token}`, 
                        'Content-Type': 'application/json',
                        Accept:'application/json',
                    } 
                }
              );
              function notgrp({id,key}){
                return id!=grp.name;
              }
            const updatedkeys= user1.groupprikeys.filter(notgrp);
            await User.findOneAndUpdate({email:request.owner},{groupprikeys:updatedkeys});

            await Group.deleteOne({_id:grp._id});
             
        }
        
        return Response.json('successfully deleted');
    }
    catch(e){
        console.log(e)
        return Response.json(e)
    }
    return Response.json('ok')
}