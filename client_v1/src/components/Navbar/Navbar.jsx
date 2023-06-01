import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import Container from "../Container/Container";
import NavbarNotSignedIn from "./NavbarNotSignedIn/NavbarNotSignedIn";
import NavbarSignedIn from "./NavbarSignedIn/NavbarSignedIn";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <nav className="py-4 bg-red-700 text-white">
      <Container className="flex justify-between items-center">
        <Link to="/" className="hover:text-amber-200 duration-200 ease-out">
          <h1 className="font-semibold text-xl">China Garden</h1>
        </Link>
        <ul>
          {isObjectEmpty(user) ? <NavbarNotSignedIn /> : <NavbarSignedIn />}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
