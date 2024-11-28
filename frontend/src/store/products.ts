import { ProductState } from "../types/store/products";
import { create } from "zustand";

export const useProductStore = create<ProductState>((set) => ({
   products: [],
   setProducts: (products) => set({ products }),

   /* The `createProduct` function in the `useProductStore` zustand store is an asynchronous function
   that is responsible for adding a new product to the store. Here's a breakdown of what it does: */
   createProduct: async (newProduct) => {
      if (!newProduct.name || !newProduct.price || !newProduct.image) { // Check if any field is empty
         return {
            success: false,
            message: "Please fill in all fields"
         };
      };
      const res = await fetch("/api/products", { // POST the new product
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] })); // add the new product
      return { success: true, message: "Product added successfully" };
   },

   /* The `fetchProducts` function in the `useProductStore` zustand store is an asynchronous function
   that is responsible for fetching the list of products from the server API endpoint
   `/api/products`. Here's a breakdown of what it does: */
   fetchProducts: async () => {
      const res = await fetch("/api/products"); // get data from database
      const data = await res.json();
      set({ products: data.data }); // set the products
   },
   
   /* The `deleteProduct` function in the `useProductStore` zustand store is an asynchronous function
   that handles the deletion of a product from the store. Here's a breakdown of what it does: */
   deleteProduct: async (id: string) => {
      const res = await fetch(`/api/products/${id}`, { // DELETE request sent to database
         method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return {
         success: false,
         message: data.message,
      };

      set((state) => ({
         products: state.products.filter((product) => product._id !== id), // Update the UI
      }));
      return { 
         success: true, 
         data: data.message,
      };
   },

   /* The `updateProduct` function in the `useProductStore` zustand store is an asynchronous function
   that handles the updating of a product's information in the store. Here's a breakdown of what it 
   does: */
   updateProduct: async (id: string, updatedProduct: any) => {
      const res = await fetch(`/api/products/${id}`, { // sent a PUT request to the server
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return {
         success: false,
         message: data.message,
      };
      set(state => ({
         products: state.products.map(product => product._id === id? data.data : product), // Update
      }));
      return {
         success: true,
         data: data.message,
      };
   },
}));

