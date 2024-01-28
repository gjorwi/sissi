import { Inter } from "next/font/google";
import "../globals.css";

import Nav from "@/components/navs/nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  return (
    <main className="w-full">
      <header className="flex justify-center bg-cyan-500 p-4 relative">
        <Nav></Nav>
      </header>
      <section>
        {children}
      </section>
    </main>

  );
}
