import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.jsx";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
// import React, { useState, useEffect } from "react";
const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const { isCartOpen } = useContext(CartContext);

  // const [stickyClass, setStickyClass] = useState({});
  // const [bufferHeight, setBufferHeight] = useState(0);
  // useEffect(() => {
  //   window.addEventListener("scroll", stickNavbar);

  //   return () => {
  //     window.removeEventListener("scroll", stickNavbar);
  //   };
  // }, []);

  // const stickNavbar = () => {
  //   if (window !== undefined) {
  //     let windowHeight = window.scrollY;
  //     if (windowHeight > document.querySelector(".navigation").clientHeight) {
  //       setStickyClass({
  //         position: "fixed",
  //         top: "0",
  //         left: "0",
  //         padding: "20px 40px",
  //         zIndex: "100",
  //       });
  //       setBufferHeight(document.querySelector(".navigation").clientHeight);
  //     } else {
  //       setStickyClass({
  //         position: "relative",
  //       });
  //       setBufferHeight(0);
  //     }
  //   }
  // };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={() => signOutHandler()}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
