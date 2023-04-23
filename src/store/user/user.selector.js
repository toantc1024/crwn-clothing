import { createSelector } from "reselect";

const selectUserReducer = (state) => {
  console.log("selector user 1");
  return state.user;
};
export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => {
    console.log("selector user 2");
    return userSlice.currentUser;
  }
);
