import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    publickey:{
        type:String,
    },
    encryptedprivatekey:{
        type:String
    },
    groupprikeys:{
        type:Array
    },
    folderId:{
        type:String,
    },
    access_token:{
        type:String,
    },
    

})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;