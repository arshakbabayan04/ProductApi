import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeCategory } from "../AddProduct/productSlice";

const Dropdown: FC<any> = (props) => {
    const dispatch = useAppDispatch();
    const { category } = useAppSelector((state) => state.product);

    return (
        <>
            <button
                onMouseOver={() => props.setDropOpen(true)}
                onMouseLeave={() => {
                    props.setDropOpen((op: boolean) => !op);
                }}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 "
                type="button"
            >
                Dropdown button{" "}
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div
                id="dropdown"
                className={`z-10 ${
                    props.dropOpen ? "block" : "hidden"
                } absolute right-1/2 translate-x-1/2 top-60 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    {category.map((el) => (
                        <li
                            onMouseOver={() => props.setDropOpen(true)}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(changeCategory(el.name));
                                props.setDropOpen((op: boolean) => !op);
                            }}
                            key={el._id}
                        >
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                {el.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Dropdown;
