import Image from "next/image";
import Link from "next/link";
import { BsBuildingFillGear,BsBuildingFillAdd } from "react-icons/bs";

export default function Instituciones() {
  return (
    <main className="flex justify-center items-center h-[90vh] -mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={'/admin/instituciones/add'} className="cursor-pointer w-28 h-28 flex text-sm flex-col justify-center items-center text-slate-800 bg-gradient-to-b from-cyan-300 from-[-250%] to-transparent to-[40%] shadow-[0_6px_10px_-2px_rgba(0,0,0,0.1)] hover:shadow-none border-b-2 border-cyan-600 hover:border hover:border-b-2 hover:border-slate-300 rounded-lg">
          <div className="text-3xl">
            <BsBuildingFillAdd />
          </div>
          Registrar
        </Link>
        <Link href={'/admin/instituciones/config'} className="cursor-pointer w-28 h-28 flex text-sm flex-col justify-center items-center text-slate-800 bg-gradient-to-b from-cyan-300 from-[-250%] to-transparent to-[40%] shadow-[0_6px_10px_-2px_rgba(0,0,0,0.1)] hover:shadow-none border-b-2 border-cyan-600 hover:border hover:border-b-2 hover:border-slate-300 rounded-lg">
          <div className="text-3xl">
            <BsBuildingFillGear />
          </div>
          RUD
        </Link>
      </div>
    </main>
  );
}
