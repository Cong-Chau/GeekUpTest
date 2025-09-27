import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-1/6 h-screen flex flex-col">
      <div className=" flex h-16 items-center px-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#33afa6] rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-white text-sm">
              G
            </span>
          </div>
          <span className="font-bold text-lg">
            GEEK<sup className="text-xs">UP</sup>
          </span>
        </div>
      </div>

      <div className=" w-full h-full flex flex-col gap-4 p-6 text-sm">
        <Link
          className={`p-2 rounded font-semibold hover:opacity-70 ${
            currentPath === "/albums" ? "bg-green-300" : "bg-green-200"
          }`}
          to="/albums"
        >
          Albums
        </Link>
        <Link
          className={`p-2 rounded font-semibold hover:opacity-70 ${
            currentPath === "/users" ? "bg-green-300" : "bg-green-200"
          }`}
          to="/users"
        >
          Users
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
