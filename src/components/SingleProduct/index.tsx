import { FC, useEffect, useMemo } from "react";
import { Product, ProductForm } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import {
    changeProduct,
    deleteProduct,
    fetchCategory,
    fetchSingleProduct,
} from "../AddProduct/productApi";
import { deletePrd } from "../AddProduct/productSlice";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SingleProduct: FC = () => {
    const dispatch = useAppDispatch();
    const { text } = useParams();
    const { category, singleProduct } = useAppSelector(
        (state) => state.product
    );
    useEffect(() => {
        dispatch(fetchCategory());
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductForm>({
        defaultValues: async () => {
            let data = await dispatch(
                fetchSingleProduct(String(text))
            ).unwrap();
            return {
                title: data.title,
                description: data.description,
                price: data.price,
                category: data.category.name,
            };
        },
    });

    const addFunc = (formData: ProductForm) => {
        dispatch(changeProduct({ formData, slug: singleProduct.slug }))
            .unwrap()
            .then((response) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
            });
        reset();
    };

    return (
        <div className="search mx-auto p-12 h-screen">
            {"_id" in singleProduct ? (
                <div className="container mx-auto px-12">
                    <ul className="mx-auto p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow">
                        <li>
                            <div className="mx-auto text-left">
                                <p className="text-4xl font-extrabold ">
                                    {singleProduct.title.toUpperCase()}
                                </p>

                                <p className="text-2xl font-extrabold mt-5">
                                    Created by: {singleProduct.createdBy.name}
                                </p>

                                <p className="text-lg font-extrabold text-blue-600 lg:text-xl mt-5">
                                    Price: {singleProduct.price}$
                                </p>

                                <p className="text-xl font-extrabold mt-5">
                                    {singleProduct.description
                                        ? singleProduct.description
                                        : "There is no description about this product"}
                                </p>

                                <button
                                    onClick={() => {
                                        dispatch(
                                            deleteProduct(singleProduct.slug)
                                        );
                                        dispatch(deletePrd(singleProduct._id));
                                    }}
                                    type="button"
                                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10"
                                >
                                    Delete product
                                </button>
                            </div>
                        </li>
                    </ul>
                    <p className="text-center text-6xl bold text-red-400 mb-5">
                        Change Product
                    </p>
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-12 w-1/2 mx-auto"
                        onSubmit={handleSubmit(addFunc)}
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="title"
                            >
                                Product Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Title"
                                {...register("title", {
                                    required: "Field is required",
                                })}
                            />
                            {errors.title && (
                                <p className="text-red-600">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="descr"
                            >
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                placeholder="Description"
                                {...register("description", {
                                    required: "Field is required",
                                })}
                            />
                            {errors.description && (
                                <p className="text-red-600">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="reactions"
                            >
                                Price
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="number"
                                placeholder="Reactions"
                                {...register("price", {
                                    required: "Field is required",
                                    pattern: {
                                        value: /\d+/,
                                        message: "Enter number",
                                    },
                                })}
                            />
                            {errors.price && (
                                <p className="text-red-600">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="reactions"
                            >
                                Category
                            </label>
                            <select
                                aria-label="default select example"
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                {...register("category", {
                                    required: "Field is required",
                                })}
                            >
                                <option value="" hidden>
                                    Select Category
                                </option>
                                {category.map((el) => (
                                    <option key={el._id} value={el.name}>
                                        {el.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-600">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default SingleProduct;
