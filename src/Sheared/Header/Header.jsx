import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/authProvider/AuthProvider.jsx";

const Header = () => {
    const { singOut, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const logOutHandle = () => {
        singOut()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout Error:", error);
            });
    };

    const itemList = (
        <>
            <li>
                <NavLink
                    to="/home"
                    className={({ isActive }) => (isActive ? "text-gray-200 bg-black px-4 py-1 rounded-md pb-2" : "hover:text-gray-200")}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/manage-tasks"
                    className={({ isActive }) => (isActive ? "text-gray-200 bg-black px-4 py-1 rounded-md pb-2" : "hover:text-gray-200")}
                >
                    Manage All Task
                </NavLink>
            </li>
        </>
    );

    return (
        <>
            {/* ✅ Sticky Navbar with Proper z-index */}
            <nav className="fixed top-0 left-0 w-full bg-[#be161e] text-white shadow-md z-50">
                <div className="navbar px-6 flex items-center justify-between">
                    {/* ✅ Mobile Dropdown */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
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
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box w-60 mt-3 text-black p-2 gap-4 shadow-lg"
                        >
                            {itemList}
                        </ul>
                    </div>

                    {/* ✅ Logo */}
                    <NavLink to="/" className="text-2xl font-bold">
                        Tasks Manager
                    </NavLink>

                    {/* ✅ Desktop Menu */}
                    <ul className="hidden lg:flex space-x-6 font-semibold">{itemList}</ul>

                    {/* ✅ User Section */}
                    <div className="flex items-center">
                        {user ? (
                            <button onClick={logOutHandle} className="flex items-center space-x-3">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={user?.photoURL}
                                    alt="User"
                                    referrerPolicy="no-referrer"
                                />
                                <span className="font-bold">Logout</span>
                            </button>
                        ) : (
                            <NavLink to="/login" className="font-bold">
                                Log-in
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>

            {/* ✅ Ensure content starts below navbar */}
            <div className="mt-16"></div>
        </>
    );
};

export default Header;
