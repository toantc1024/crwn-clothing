import { createContext, useEffect, useReducer } from "react";
import {
  getCategoriesAndDocuments,
  // addCollectionAndDocument,
} from "../utils/firebase/firebase.utils";

const CategoriesContext = createContext({
  categoriesMap: {},
});

const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: "SET_CATEGORIES_MAP",
};
const INITIAL_STATE = {
  categoriesMap: {},
};
const categoriesReducer = (state, action) => {
  const { type, payload } = action;
  console.log("reducer worked!", payload);
  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      throw new Error("Error handling type of action");
  }
};

const CategoriesProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );
  const value = { categoriesMap };

  const setCategoriesMap = (categoryMap) => {
    dispatch({
      type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,
      payload: categoryMap,
    });
  };

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoryMap();
  }, []);

  // useEffect(() => {
  //   addCollectionAndDocument("categories", SHOP_DATA, 'title');
  // }, []);
  // => Data will be imported to Firestore
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };
