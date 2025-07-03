import { RootState } from "../index";

export const selectAllProducts = (state: RootState) => {
  return state.products;
};

export const selectProductById =
  (id: string | undefined) => (state: RootState) => {
    return id ? state.products.find((p) => p.id === id) : undefined;
  };
