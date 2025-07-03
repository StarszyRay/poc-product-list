import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/dataTypes";
import defaultItemsData from "../../defaultItemsData";
import parseItemsData from "../../utils/parseItemsData";
import localStorageService from "../../utils/localStorageService";

// Use empty array for initial state for easier loading condition in products list
const initialState: Product[] = [];
const loadLocalStorageState = (): Product[] | null => {
  const localStorageData = localStorageService.get<Product[]>("products");
  return localStorageData ? localStorageData : parseItemsData(defaultItemsData);
};

const productsSlice = createSlice({
  name: "products",
  initialState: loadLocalStorageState() || initialState,
  reducers: {
    setProducts: (state, action) => {
      const products = action.payload;
      if (!Array.isArray(products)) {
        console.error(
          "setProducts action payload must be an array of products."
        );
        return;
      }
      state = products;
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state[index] = updatedProduct;
      } else {
        console.warn(`Product with ID ${updatedProduct.id} not found.`);
      }
    },
  },
});

export const { setProducts, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
