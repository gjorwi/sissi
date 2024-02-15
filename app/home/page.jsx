import Image from "next/image";
import Link from "next/link";
import ListRUDSol from "@/components/listRUD/listRUDSol";

export default function Home() {
  return (
    <main className="flex justify-center items-center mt-10 ">
      <div className="w-11/12 md:w-4/5">
        <ListRUDSol/>
      </div>
    </main>
  );
}
