export interface Product {
    _id: string;
    title: string;
    price: number;
    category: Category;
    description: null | string;
    createdBy: CreatedBy;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}
export interface ProductForm {
    title: string;
    price: number;
    category: Category;
    description: null | string;
}

export interface Category {
    products?: [];
    _id: string;
    name: string;
    slug: string;
}

export interface CreatedBy {
    role: string;
    _id: string;
    name: string;
}
