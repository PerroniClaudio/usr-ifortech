import { useAuth } from "../hooks/useAuth";

import { Menu } from "lucide-react";

function Navbar() {
  const { user, isLoading } = useAuth({
    middleware: "auth",
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-primary">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n, i) => {
      if (i < 2) {
        return n[0];
      }
    })
    .join("");

  return (
    <div className="navbar bg-base-100 px-0">
      <label
        htmlFor="drawer-main"
        className="btn btn-primary drawer-button lg:hidden">
        <Menu />
      </label>
      <div className="flex-1"></div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="text-lg btn btn-primary btn-circle avatar text-primary-content flex flex-col items-center justify-center">
            {initials}
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
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
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
