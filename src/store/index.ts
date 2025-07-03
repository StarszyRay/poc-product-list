import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/slice";
import listenerMiddleware from "./middleware";
import { setupProductListeners } from "./products";

// Huge overkill for this use case, react context would have been enough

const rootReducer = combineReducers({
  products: productsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

export const store = setupStore();

// Setup listener(s)
setupProductListeners();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
