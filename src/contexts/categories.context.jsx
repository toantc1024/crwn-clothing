import { createContext, useEffect, useState } from "react";
import {
  getCategoriesAndDocuments,
  // addCollectionAndDocument,
} from "../utils/firebase/firebase.utils";

const CategoriesContext = createContext({
  categoriesMap: {},
});

const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

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
