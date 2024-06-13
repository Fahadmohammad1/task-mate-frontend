import { Link, Outlet } from "react-router-dom";

const SideBar = () => {
  //   const navigate = useNavigate();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content pt-2">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden flex flex-row-reverse justify-between pr-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
          {/* <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
          /> */}
        </label>

        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-full flex justify-center py-5">
          {/* <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
          /> */}
        </div>
        <ul className="menu pl-11 w-64 min-h-full text-black">
          <li className="font-bold">
            <Link to="">Profile</Link>
          </li>
          <li className="font-bold">
            <Link to="manage-task">Manage Task</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
