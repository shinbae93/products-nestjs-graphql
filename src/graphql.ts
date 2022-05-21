
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateProduct {
    name: string;
    price: number;
    userId: number;
}

export interface UpdateProduct {
    name?: Nullable<string>;
    price?: Nullable<number>;
    userId?: Nullable<number>;
}

export interface Role {
    id: number;
    name: string;
}

export interface IMutation {
    login(username: string, password: string): string | Promise<string>;
    signup(username: string, password: string): User | Promise<User>;
    createProduct(createProduct: CreateProduct): Nullable<Product> | Promise<Nullable<Product>>;
    updateProduct(id: number, updateProduct?: Nullable<UpdateProduct>): Nullable<Product> | Promise<Nullable<Product>>;
    deleteProduct(id: number): Nullable<Product> | Promise<Nullable<Product>>;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface IQuery {
    products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;
    product(id: number): Nullable<Product> | Promise<Nullable<Product>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: number;
    username: string;
    products?: Nullable<Nullable<Product>[]>;
}

type Nullable<T> = T | null;
