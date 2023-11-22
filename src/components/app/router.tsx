import { useRoutes } from "react-router-dom";
import Header from "../Header";
import Home from "../Home";
import AddProduct from "../AddProduct";
import SingleProduct from "../SingleProduct";

export const Router = () => {
    return useRoutes([
        {
            path: "",
            element: <Header />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/add-product",
                    element: <AddProduct />,
                },
                {
                    path: "/product/:text",
                    element: <SingleProduct />,
                },
            ],
        },
    ]);
};
