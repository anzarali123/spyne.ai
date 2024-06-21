import { BACKEND_URL } from "@/config";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession({
    required: true,
  });

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border  shadow-sm px-4 py-2  text-sm font-medium text-gray-700 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative inline-flex items-center text-black justify-center w-10 h-10 overflow-hidden bg-slate-100 rounded-full ">
            <span className="font-medium text-black-600 ">
              {data?.user?.name?.[0]?.toUpperCase() ?? ""}
            </span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <div
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              id="menu-item-0"
            >
              {data?.user?.name}
            </div>

            <div
              onClick={() => {
                signOut({ callbackUrl: `${BACKEND_URL}/signin` });
              }}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              role="menuitem"
              id="menu-item-1"
            >
              Sign Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
