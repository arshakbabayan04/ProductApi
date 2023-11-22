import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Header: FC = () => {
    const activeClazz: string =
        "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium";
    const defaultClazz: string =
        "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

    return (
        <>
            <header>
                <nav className="bg-gray-900">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <NavLink
                                            to="/"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? activeClazz
                                                    : defaultClazz
                                            }
                                            aria-current="page"
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            to="/add-product"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? activeClazz
                                                    : defaultClazz
                                            }
                                        >
                                            Add Product
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
