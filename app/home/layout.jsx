import { Inter } from "next/font/google";
import "../globals.css";
import BannerInfo from '@/components/info/bannerInfo'
import Nav from "@/components/navs/nav";
import AsideDats from "@/components/aside/asideDats";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  return (
    <main className="w-full">
      <header className="flex justify-center bg-cyan-500 p-4 relative">
        <Nav></Nav>
      </header>
      <BannerInfo/>
      <section className="flex flex-row">
        <div className="flex-1">
          {children}
        </div>
        <AsideDats/>
      </section>
    </main>

  );
}
