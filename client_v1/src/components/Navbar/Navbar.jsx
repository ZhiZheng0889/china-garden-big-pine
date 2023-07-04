import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import Container from "../Container/Container";
import NavbarNotSignedIn from "./NavbarNotSignedIn/NavbarNotSignedIn";
import NavbarSignedIn from "./NavbarSignedIn/NavbarSignedIn";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonCheckout from "../Button/ButtonCheckout/ButtonCheckout";
import ButtonBurger from "../Button/ButtonBurger/ButtonBurger";
import NavbarCanvas from "./NavbarCanvas/NavbarCanvas";
import CheckoutCanvas from "../Checkout/CheckoutCanvas/CheckoutCanvas";

const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  return (
    <nav className="py-4 bg-red-700 text-white px-3 sm:px-0 relative">
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ButtonBurger setIsMenuOpen={setIsMenuOpen} />
          <Link to="/" className="hover:text-amber-200 duration-200 ease-out">
            <h1 className="font-semibold text-xl">China Garden</h1>
          </Link>
        </div>
        <ul className="flex items-center">
          {!isLoading && isAuthenticated ? (
            <NavbarSignedIn />
          ) : (
            <NavbarNotSignedIn className="hidden md:flex" />
          )}
          <ButtonCheckout
            className="ml-3"
            padding="p-0"
            onClick={() => setIsCheckoutOpen((curr) => !curr)}
          />
        </ul>
      </Container>
      <NavbarCanvas isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <CheckoutCanvas
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
      />
    </nav>
  );
};

export default Navbar;
