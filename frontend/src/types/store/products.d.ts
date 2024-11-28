
interface ReturnObject { 
   success: boolean; 
   message?: string; 
   data?: any;
};

export interface ProductState {
   products: Product[];
   setProducts: (products: Product[]) => void;
   createProduct: (newProduct: Product) => Promise<ReturnObject>;
   fetchProducts: () => Promise<void>;
   deleteProduct: (id: string) => Promise<ReturnObject>;
   updateProduct: (id: string, updatedProduct: Product) => Promise<ReturnObject>;
};