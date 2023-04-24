export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("action", action);

  console.log("currentState: ", store.getState());

  next(action);

  console.log("nextState: ", store.getState());
};
