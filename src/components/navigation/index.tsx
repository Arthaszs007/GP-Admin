import Link from "next/link";
import React from "react";
import { signOut } from "../../Lib/auth/auth";

const Navigation = () => {
  return (
    <div className="navbar bg-indigo-200">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          GP Management
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button>Sign out</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
