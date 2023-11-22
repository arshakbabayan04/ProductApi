import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, ProductForm } from "../../types";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (id: any) => {
        const { data } = await axios.get(
            `https://api.storerestapi.com/products?limit=5&page=${id}`
        );
        return data.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (title: string) => {
        console.log(title);
        const { data } = await axios.delete(
            `https://api.storerestapi.com/products/${title}`
        );
        return title;
    }
);

export const fetchCategory = createAsyncThunk(
    "product/fetchCategory",
    async () => {
        const { data } = await axios.get(
            `https://api.storerestapi.com/categories`
        );
        return data.data;
    }
);

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (newData: any) => {
        const data1 = await axios.post(
            `https://api.storerestapi.com/products`,
            newData
        );
        return data1;
    }
);

export const changeProduct = createAsyncThunk(
    "product/changeProduct",
    async ({ formData, slug }: { formData: ProductForm; slug: string }) => {
        const data = await axios.put(
            `https://api.storerestapi.com/products/${slug}`,
            formData
        );
        return data.data;
    }
);

export const fetchSingleProduct = createAsyncThunk(
    "product/fetchSingleProduct",
    async (slug: string) => {
        const { data } = await axios.get(
            `https://api.storerestapi.com/products/${slug}`
        );
        return data.data;
    }
);
