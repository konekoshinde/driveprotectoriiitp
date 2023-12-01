"use client"
import Link from 'next/link'
import React from 'react'
import logo from "../../../public/logo.png";
import Image from "next/image";
export default function Navbar() {
  return (
    <div className='bg-cyan-800 flex flex-row justify-between p-2 m-2'>
       <a href="/"><Image  class="w-[25vh] h-[5vh] rounded-lg " alt="logo" src={logo}/></a>
      <ul className='flex flex-row justify-end gap-x-10'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/group">Groups</Link></li>
        <li><Link href='/about'>About</Link></li>
      </ul>
    </div>
  )
}
