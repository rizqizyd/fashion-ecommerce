import { compose, createStore, applyMiddleware } from "redux";
// redux-persist allows storing the state of the Redux store in browser storage, such as localStorage, sessionStorage, or IndexedDB.
import { persistStore, persistReducer } from "redux-persist";
// So by default in any web browser, this will just use local storage.
import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// make our own logger middleware (reusable middleware functions)
const loggerMiddleware = store => next => action => {
  // middleware signature | write the code that we want our middleware to do
  if (!action.type) {
    return next(action);
  }
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);

  // Get state will give us back the value of the state right now.
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"], // for which reducer you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

// Middlewares our kind of like little library helpers that run before an action hits the reducer.
// const middleWares = [logger];

// Compose is a functional programming concept. It's essentially a way for us to pass multiple functions left to right.
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// using these new modified persisted values that we have in Redux that we can now persist the store.
export const persistor = persistStore(store);
