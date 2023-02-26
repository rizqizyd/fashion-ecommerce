import { compose, createStore, applyMiddleware } from "redux";
// redux-persist allows storing the state of the Redux store in browser storage, such as localStorage, sessionStorage, or IndexedDB.
import { persistStore, persistReducer } from "redux-persist";
// So by default in any web browser, this will just use local storage.
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
// So again saga's replace thunks, you mainly want one asynchronous side effect library.
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // for which reducer you don't want to persist
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

// If these fail, then we'll use regular 'compose' just as we had been for otherwise run the actual one from 'Redux DevTools'
const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Middlewares our kind of like little library helpers that run before an action hits the reducer.
// const middleWares = [logger];

// Compose is a functional programming concept. It's essentially a way for us to pass multiple functions left to right.
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

// using these new modified persisted values that we have in Redux that we can now persist the store.
export const persistor = persistStore(store);
