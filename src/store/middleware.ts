import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./index";

declare type ExtraArgument = { foo: string };

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch,
  ExtraArgument
>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

export default listenerMiddleware;
