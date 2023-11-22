import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Product } from "../../types";
import {
    addProduct,
    changeProduct,
    deleteProduct,
    fetchCategory,
    fetchProducts,
    fetchSingleProduct,
} from "./productApi";

interface productState {
    products: Product[];
    category: Category[];
    activeCategory: string;
    singleProduct: Product;
}

const initialState: productState = {
    products: [],
    category: [],
    activeCategory: "all",
    singleProduct: {} as Product,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        deletePrd: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((el: Product) => {
                return el._id !== action.payload;
            });
        },
        changeCategory: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
            state.activeCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.products = state.products.filter((el: Product) => {
                    return el.title !== action.payload;
                });
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.category = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
            });
    },
});

export default productSlice.reducer;

export const { deletePrd, changeCategory } = productSlice.actions;
