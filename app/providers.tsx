// app/providers.tsx (or pages/_app.tsx for pages router)
"use client"; // only for app directory

import { Provider } from "react-redux";
import { store } from "./store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
