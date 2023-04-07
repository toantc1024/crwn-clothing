import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  // Destruct type and payload from action
  const { type, payload } = action;
  // Log the action type and payload
  console.log("type", type);
  console.log("payload", payload);
  //   Log the previous state
  console.log("prev state", store.getState());

  //   Call the next middleware in the chain
  next(action);

  //   Log the next state
  console.log("next state", store.getState());
};

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
