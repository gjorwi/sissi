'use client'
import Link from "next/link";
import "@/app/globals.css";
import FloatBtn from "../buttons/floatBtn";
import BtnLogOut from "@/components/buttons/bntLogOut";
import { usePathname,useRouter } from "next/navigation";
import { IoChevronBackSharp } from "react-icons/io5";
import {getStoragedUserDat,removeStoragedUserDat} from "@/utils/utilidades";

export default function Nav(){
  const path=usePathname()
  const router = useRouter();
  const routes=[
    {
      href:'/home',
      label:'Solicitudes'
    },
    {
      href:'/home/resumen',
      label:'Resumen'
    }
  ]
  const LogOut =()=>{
    removeStoragedUserDat('userDat')
    router.replace("/");
  }
  return(
    <>
      {path.includes('new')&&
        <Link href={'/home'} className="absolute left-0 text-white ml-6 text-2xl">
          <IoChevronBackSharp className="cursor-pointer"/>
        </Link>
      }
      <nav>
        <ul className="flex gap-4">
          {
            routes.map(({href,label})=>(
              <li key={href}>
                <Link href={href} className="text-white">
                  {label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <div className="absolute right-0 text-white mr-6">
        <BtnLogOut LogOut={LogOut}></BtnLogOut>
      </div>
      {!path.includes('new')&&
        <FloatBtn/>
      }
    </>
  )
}