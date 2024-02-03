import ListRUDInst from "@/components/listRUD/listRUDInst";
import CustomLoading from "@/components/loading/customLoading";
import { Suspense } from "react";

export default function Config() {
  
  return (
    <main className="flex justify-center items-center mt-10 ">
      <div className="w-11/12 md:w-4/5">
        <ListRUDInst/>
      </div>
    </main>
  );
}
