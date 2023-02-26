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
