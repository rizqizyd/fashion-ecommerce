import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// Middlewares our kind of like little library helpers that run before an action hits the reducer.
const middleWares = [logger];

// Compose is a functional programming concept. It's essentially a way for us to pass multiple functions left to right.
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
