import Link from "next/link";
import { FaBuilding,FaUsers  } from "react-icons/fa";
import { GiOfficeChair } from "react-icons/gi";

export default function Admin() {

  return (
    <main className="flex justify-center items-center h-[90vh] -mt-8 ">
      <section className="w-10/12 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <Link href={'/admin/instituciones'} className="cursor-pointer w-28 h-28 flex text-sm flex-col justify-center items-center text-slate-800 bg-gradient-to-b from-cyan-300 from-[-250%] to-transparent to-[40%] shadow-[0_6px_10px_-2px_rgba(0,0,0,0.1)] hover:shadow-none border-b-2 border-cyan-600 hover:border hover:border-b-2 hover:border-slate-300 rounded-lg">
            <div className="text-3xl">
              <FaBuilding />
            </div>
            Instituciones
          </Link>
          <Link href={'/admin/usuarios'} className="cursor-pointer w-28 h-28 flex text-sm flex-col justify-center items-center text-slate-800 bg-gradient-to-b from-cyan-300 from-[-250%] to-transparent to-[40%] shadow-[0_6px_10px_-2px_rgba(0,0,0,0.1)] hover:shadow-none border-b-2 border-cyan-600 hover:border hover:border-b-2 hover:border-slate-300 rounded-lg">
            <div className="text-3xl">
              <FaUsers />
            </div>
            Usuarios
          </Link>
          <Link href={'/admin/servicios'} className="cursor-pointer w-28 h-28 flex text-sm flex-col justify-center items-center text-slate-800 bg-gradient-to-b from-cyan-300 from-[-250%] to-transparent to-[40%] shadow-[0_6px_10px_-2px_rgba(0,0,0,0.1)] hover:shadow-none border-b-2 border-cyan-600 hover:border hover:border-b-2 hover:border-slate-300 rounded-lg">
            <div className="text-3xl">
              <GiOfficeChair />
            </div>
            Servicios
          </Link>
        </div>
      </section>
    </main>
  );
}
