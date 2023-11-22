import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategory, fetchProducts } from "../AddProduct/productApi";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { changeCategory } from "../AddProduct/productSlice";
import Dropdown from "./dropdown";

const Home: FC = () => {
    const [curentPage, setCurentPage] = useState("1");
    const [dropOpen, setDropOpen] = useState(false);

    const dispatch = useAppDispatch();
    const { products, activeCategory } = useAppSelector(
        (state) => state.product
    );

    const filteredProducts = useMemo(() => {
        if (activeCategory !== "all") {
            console.log("flt");
            return products.filter((el) => el.category.name === activeCategory);
        } else {
            return products;
        }
    }, [activeCategory, products]);

    useEffect(() => {
        dispatch(fetchCategory());
    }, []);

    useEffect(() => {
        dispatch(fetchProducts(curentPage));
    }, [curentPage]);

    const paginate = (page: any) => {
        setCurentPage("" + page);
    };

    return (
        <>
            <div
                className="products p-12 min-h-screen"
                style={{
                    background:
                        'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center center/cover no-repeat',
                }}
            >
                <div className="container mx-auto px-12">
                    <p className="text-center text-6xl bold text-white mb-5">
                        Products
                    </p>

                    <Dropdown dropOpen={dropOpen} setDropOpen={setDropOpen} />
                    <ul
                        role="list"
                        className="divide-y divide-gray-100 w-1/2 mx-auto"
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((el: any) => (
                                <li
                                    key={el._id}
                                    className="flex justify-between gap-x-6 py-5 mt-10 bg-white rounded-xl p-5 mb-5"
                                >
                                    <div className="min-w-0 gap-x-4">
                                        <div className="min-w-0 flex items-center">
                                            <p className="text-sm font-semibold leading-6 text-blue-600 ">
                                                {el.title.toUpperCase()}
                                            </p>
                                        </div>
                                        <div className="min-w-0 flex items-center">
                                            <p className="text-sm font-semibold leading-6 text-gray-700 ">
                                                {el.price}$
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <Link
                                            to={`/product/${el.slug}`}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            More
                                        </Link>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-xl font-extrabold mt-5 text-center text-white">
                                "There is no product with this category"
                            </p>
                        )}
                    </ul>
                    <nav className="flex items-center w-1/2 mx-auto">
                        <ul className="flex gap-2 items-center -space-x-px h-8 text-sm mx-auto">
                            {filteredProducts.length > 4 ? (
                                <Pagination paginate={paginate} />
                            ) : null}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Home;
