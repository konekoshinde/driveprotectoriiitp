import { connect } from "@/dbConfig/dbConfig";
import { RSA } from "hybrid-crypto-js";
import aes from "crypto-js/aes";

import axios from "axios";
import User from "@/models/users";
import Group from "@/models/group";
import Latin1 from "crypto-js/enc-latin1";



const rsa = new RSA();

export const POST=async(req)=>{
    const request=await req.json();
    console.log(request);
    try{
        await connect();
        
        const grpexist=await Group.findOne({name:request.name});

        
        if(grpexist===null || !grpexist.ownerEmail.includes(request.owner)){
            return Response.json("grp doesnt exists")
        }

        const owner=await User.findOne({email:request.owner});
        
        const user=await User.findOne({email:request.email});
        if(user===null){
            return Response.json("user doesnt exists")
        }
        console.log(user.access_token);

       await axios.post( `https://www.googleapis.com/drive/v3/files/${grpexist.folderId}/permissions`,
            {
                
                type: "user",
                role: "writer",
                emailAddress: `${request.email}`,
                
            },{

                headers:{
                    Authorization:`Bearer ${user.access_token}`, 
                    'Content-Type': 'application/json',
                    Accept:'application/json',
                }
            })
            
            await Group.findOneAndUpdate({name:request.name},{$push:{userEmails:user.email}});
            
            // get owner private key
            const keypri=aes.encrypt(
                aes.decrypt(grpexist.privatekey,aes.decrypt(owner.encryptedprivatekey,process.env.NEXTAUTH_SECRET).toString(Latin1)).toString(Latin1)
                ,aes.decrypt(user.encryptedprivatekey,process.env.NEXTAUTH_SECRET).toString(Latin1)).toString();

            await User.findOneAndUpdate({email:request.email},{$push:{groupprikeys:{id:grpexist.name,key:keypri}}})
            
            return Response.json('user added successfully');
    }
    catch(e){
        console.log(e)
        return Response.json('pls chage the access of drive folder to anyone and editor')
    }
    return Response.json('ok')
}