import { FC } from "react";

const Pagination: FC<any> = ({ paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {pageNumbers.map((number) => (
                <li key={number}>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            paginate(number);
                        }}
                        href="#"
                        className="flex items-center rounded justify-center px-3 h-8 leading-tight text-black-600 bg-red-400 hover:bg-gray-100 hover:text-red-500 font-bold"
                    >
                        {number}
                    </a>
                </li>
            ))}
        </>
    );
};

export default Pagination;
