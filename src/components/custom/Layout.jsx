import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuthContext } from "@/context/AuthProvider";
import { useEffect } from "react";

function Layout() {
    const {menuActive, screensize, setScreensize, setMenuActive} = useAuthContext();
    useEffect(() => {
        const handleResize = () => setScreensize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    useEffect(() => {
        if (screensize <= 768) {
          setMenuActive(false);
        } else {
          setMenuActive(true);
        }
      }, [screensize, setMenuActive]);
    console.log('re-rendered')
  return (
    <div className="h-screen max-h-screen flex flex-col px-4">
      <div className="h-[60px]">
        <Header />
      </div>
      <div className={`${!menuActive ? 'grid-cols-1':''} flex-1 grid gap-2 grid-cols-5 h-[calc(100%-60px)]`}>
        <div className={`${!menuActive ? 'hidden':''} col-span-1 min-w-fit py-2 px-1 h-full overflow-auto`}>
          <Sidebar />
        </div>
        <div className={`${!menuActive ? 'col-span-5':'col-span-4'} p-4 overflow-y-auto bg-[#eef2f6] rounded-s-lg rounded-e-lg `}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
