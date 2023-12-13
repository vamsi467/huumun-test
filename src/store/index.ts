import { createStore, createLogger } from "vuex";

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];
import dashboard from "./dashboard";

export const store = createStore({
  plugins,
  modules: { dashboard },
  strict: debug,
});
