import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import Container from "../Container/Container";
import NavbarNotSignedIn from "./NavbarNotSignedIn/NavbarNotSignedIn";
import NavbarSignedIn from "./NavbarSignedIn/NavbarSignedIn";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  return (
    <nav className="py-4 bg-red-700 text-white">
      <Container className="flex justify-between items-center">
        <Link to="/" className="hover:text-amber-200 duration-200 ease-out">
          <h1 className="font-semibold text-xl">China Garden</h1>
        </Link>
        <ul>
          {!isLoading && isAuthenticated ? (
            <NavbarSignedIn />
          ) : (
            <NavbarNotSignedIn />
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
