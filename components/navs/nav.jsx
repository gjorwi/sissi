import Link from "next/link";
import "@/app/globals.css";
import FloatBtn from "../buttons/floatBtn";
import BtnLogOut from "@/components/buttons/bntLogOut";

export default function Nav(){
  const routes=[
    {
      href:'/home',
      label:'Inicio'
    },
    {
      href:'/home/resumen',
      label:'Resumen'
    }
  ]
  return(
    <>
      <nav>
        <ul className="flex gap-4">
          {routes.map(({href,label})=>(
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
        <BtnLogOut></BtnLogOut>
      </div>
      <FloatBtn></FloatBtn>
    </>
  )
}