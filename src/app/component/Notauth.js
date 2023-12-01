"use client"
import logo from "../../../public/logo.png";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Notauth(){
    return(<div className="h-screen flex items-center justify-center ">
    <div className="bg-cyan-50 p-10 flex flex-col justify-center gap-y-5 rounded-lg">
    <a href="/"><Image  class="max-w-sm rounded-lg overflow-hidden shadow-lg" alt="logo" src={logo}/></a>
    <div className="font-light text-cyan-900 text-sm text-center">encrypt your drive files</div>
    <div className="text-cyan-950 font-bold text-center">authenticate to get started</div>
    <button className='bg-cyan-600 hover:bg-cyan-950 text-white font-semibold py-2 px-4 rounded' onClick={()=>signIn("google")}>login</button>
    </div>
 </div>)
}