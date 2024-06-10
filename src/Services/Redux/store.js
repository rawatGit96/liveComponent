import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authentication from "./signInSlice";
import sidebarSlice from "./sidebarSlice";
import ContentSlice from "./contentSlice";

const reducers = combineReducers({
  signIn: Authentication,
  sidebar: sidebarSlice,
  content: ContentSlice,
});

const persistConfig = {
  key: "0.01",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store);
