import location from "../assets/location.svg";
import { Search } from "lucide-react";
import { SheetDemo } from "./CartSheet";

export const Navbar = () => {
  return (
    <nav>
      <header className="sticky bg-white z-10 sm:flex md:flex-row items-center top-0 w-full sm:justify-between p-4 gap-4 border-b border-gray-300">
        <button className=" flex items-center gap-4 w-1/2 ">
          <img
            src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/16.28.1/images/header/primary-logo.svg"
            width="120"
            height="120"
            alt="React Logo"
          />
          <p className="text-black font-semibold">Deliver in minutes</p>
        </button>
        <div className="flex items-center gap-4 w-full sm:w-1/2 justify-end">
          <div className="relative w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 "
            />
            <input
              type="text"
              placeholder="Enter product name"
              className="border w-full border-gray-500 rounded-xl py-2 pl-11 px-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
          <SheetDemo />
          <button className="flex cursor-pointer flex-col items-center gap-1">
            <img src={location} width="30" height="30" alt="Location" />
            <span className="text-sm">map</span>
          </button>
        </div>
      </header>
    </nav>
  );
};
