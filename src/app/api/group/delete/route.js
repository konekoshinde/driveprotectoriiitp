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

        if(grp.userIds.length()===1 && grp.userIds[0]===ownerId){
            const deleteFolder = await axios.delete(
                `https://www.googleapis.com/drive/v3/files/${grp.folderID}`,
                {
                    name: grpname,
                    mimeType: 'application/vnd.google-apps.folder',
                },
                {
                    headers:{
                        Authorization:`Bearer ${user.access_token}`, 
                        'Content-Type': 'application/json',
                        Accept:'application/json',
                    } 
                }
              );
              function notgrp(id,key){
                return id!=grp._id;
              }
            const user=await User.findOne({id:grp.ownerId}).groupprikeys.filter(notgrp);
            await User.findOneAndUpdate({id:grp.ownerId},{groupprikeys:updatedkeys});

            await Group.deleteOne({_id:grp._id});
             
        }
        
    }
    catch(e){
        console.log(e)
        return Response.json('err',{status:500})
    }
    return Response.json('ok');
    
}