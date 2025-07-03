import { isAnyOf } from "@reduxjs/toolkit";
import { startAppListening } from "../middleware";
import { setProducts, updateProduct } from "./slice";
import localStorageService from "../../utils/localStorageService";

export const setupProductListeners = () => {
  startAppListening({
    matcher: isAnyOf(setProducts, updateProduct),
    effect: (_, listenerApi) => {
      listenerApi.cancelActiveListeners();

      const updatedState = listenerApi.getState().products;
      localStorageService.set("products", updatedState);
    },
  });
};
