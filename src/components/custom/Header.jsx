import { useAuthContext } from "@/context/AuthProvider";
import {
  AlignJustify,
  ChevronRight,
  CircleUserRound,
  LogIn,
  LogOut,
  Settings,
  UserRoundPlus,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "@/server";

function Header() {
  const { setMenuActive, avatar, currentUser, role, userId, removeToken } =
    useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    const data = { user: userId };
    axios.post(`${server}/api/auth/logout`, data).then(() => {
      removeToken();
      navigate("/login");
    });
  };
  return (
    <div className="grid grid-cols-5 h-[60px]">
      <div className=" col-span-1 flex justify-between items-center">
        <h1 className="text-primary font-bold text-2xl">powel-elss</h1>
        <button
          onClick={() => setMenuActive((prev) => !prev)}
          className="bg-[#ffece6] p-1.5 rounded-md"
        >
          <AlignJustify color="#d74221" size={20} />
        </button>
      </div>
      <div className="col-span-4 flex items-center justify-end ">
        <div className="flex items-center gap-3 rounded-full p-1 px-3 bg-[#ffece6] hover:bg-[#feccba]">
          {avatar !== null ? 
          <img
            src={ avatar} 
            alt="avatar"
            className=" size-8 border border-[#d74221] rounded-full "
          />
          :
          <CircleUserRound color="#d74221" /> 
          }
          <Popover>
            <PopoverTrigger>
              <Settings size={20} color="#d74221" />
            </PopoverTrigger>
            <PopoverContent className=" mr-4 ">
              <div>
                <div>
                  {avatar !== null ? (
                    <div className="flex gap-2 items-center">
                      <img
                        src={avatar}
                        alt="avatar"
                        className=" size-14 rounded-full "
                      />
                      <div className="flex flex-col">
                        <span className=" capitalize ">{currentUser}</span>
                        <small className=" capitalize text-gray-500 text-left">
                          {role} @Powel-elss.org
                        </small>
                      </div>
                    </div>
                  ) : null}
                </div>
                <hr className="my-2" />
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded-lg hover:bg-[#ffece6] transition">
                    <Link
                      to="/edit-profile"
                      className="flex justify-between items-center"
                    >
                      <span className="flex gap-2 items-center">
                        <Settings size={18} /> Settings
                      </span>{" "}
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                  {role?.toLowerCase() === "admin" && (
                    <div className="p-2 rounded-lg hover:bg-[#ffece6] transition">
                      <Link
                        to="/add-user"
                        className="flex justify-between items-center"
                      >
                        <span className="flex gap-2 items-center">
                          <UserRoundPlus size={18} /> Add user
                        </span>
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  )}
                  <div className="p-2 rounded-lg hover:bg-[#ffece6] transition">
                    {currentUser ? (
                      <div
                        onClick={handleLogOut}
                        className="flex gap-2 items-center"
                      >
                        <LogOut size={18} />
                        <span>Log out</span>
                      </div>
                    ) : (
                      <div className="">
                        <Link to="/login" className="flex gap-2 items-center">
                          <LogIn size={18} /> <span>Log in</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Header;
