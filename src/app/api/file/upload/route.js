
import { Crypt } from "hybrid-crypto-js";
import aes from "crypto-js/aes";
import { RSA } from "hybrid-crypto-js";
import CryptoJS from "crypto-js";
import { Utf8 } from "crypto-js/enc-utf8";
import Latin1 from "crypto-js/enc-latin1"
const rsa = new RSA();
// import 
const crypt=new Crypt();
export const POST=async(req)=>{
    // const request=await req.formData();
    // console.log(request.get('file'));
    // let fr=new FileReader();
    // fr.readAsText(file);
    // fr.onload=async function(){
    //       console.log(fr.result);
    //       // console.log(res);
    //     }
    return Response.json('ok');
}