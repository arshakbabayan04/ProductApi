import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { addProduct, fetchCategory } from "./productApi";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types";

const AddProduct: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategory());
    }, []);

    const { category } = useAppSelector((state) => state.product);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Product>();

    const addFunc = (data: Product) => {
        dispatch(addProduct(data));
        navigate(`/`);

        reset();
    };

    return (
        <>
            <div
                className="add_food min-h-screen pt-10"
                style={{
                    background:
                        'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds") center center/cover no-repeat',
                }}
            >
                <div className="container mx-auto px-12">
                    <h2
                        className="font-mono text-2xl text-center text-red-400"
                        style={{ fontSize: "48px" }}
                    >
                        Add New Product
                    </h2>
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
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Enter letter",
                                    },
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
            </div>
        </>
    );
};

export default AddProduct;
