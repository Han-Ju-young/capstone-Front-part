import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"; // load
import storageSession from "redux-persist/lib/storage/session"; // sessionStorage
// import storage from 'redux-persist/lib/storage // localstorage

import indexReducer from "./indexReducer";

const persistConfig = {
  key: "root",
  storage: storageSession, // 사용할 스토리지를 정의해요.
  whitelist: ["indexReducer"], // 유지 할 데이터를 정의해요
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    indexReducer,
  })
);

export default persistedReducer;
