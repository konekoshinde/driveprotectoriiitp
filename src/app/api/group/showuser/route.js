import { connect } from "@/dbConfig/dbConfig";
import axios from "axios";
import User from "@/models/users";
import Group from "@/models/group";


export const POST=async(req)=>{
    const request=await req.json();
    console.log(request);

    try{
        await connect();
        
        if(!await Group.exists({name:request.name})){
            throw new Error ("no such grp found");
        }
        let exist=false;
        const grp=await Group.findOne({name:request.name})
        if(!grp.userEmails.includes(request.email)){
            throw new Error("u r not authorised to view this grp");
        }
    }
    catch(e){
        console.log(e)
        return Response.json('err',{status:500})
    }
    return Response.json(grp.userEmails);
    // return Response.json('ok');
    
}