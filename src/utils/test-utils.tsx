import { renderHook, RenderHookOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import type { AppStore, RootState } from "../store";
import { setupStore } from "../store";

interface ExtendedRenderOptions<Props = unknown>
  extends Omit<RenderHookOptions<Props>, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  initialProps?: Props;
}

export function renderHookWithProviders<Result, Props>(
  hook: (props?: Props) => Result,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    initialProps = {},
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return renderHook(hook, { wrapper, ...renderOptions });
}
