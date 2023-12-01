import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users";

export const POST= async(req)=>{
    const request=await req.json();
    console.log(request.email)
    try{
        connect();
        const user=await User.findOne({email:request.email});
        
        let result=[];

        for(let i=0;i<user.groupprikeys.length;i++){
            result.push(user.groupprikeys[i].id);
        }
        return Response.json(result);
    }
    catch(e){
        console.log("err");
        // return Response.json(e);
    }
    return Response.json('ok')
}