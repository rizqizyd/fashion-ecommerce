import { compose, createStore, applyMiddleware } from "redux";
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

const middleWares = [loggerMiddleware];

// Middlewares our kind of like little library helpers that run before an action hits the reducer.
// const middleWares = [logger];

// Compose is a functional programming concept. It's essentially a way for us to pass multiple functions left to right.
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
