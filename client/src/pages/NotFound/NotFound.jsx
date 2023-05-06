import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <main className="mx-auto min-h-screen">
      <section className="mx-auto max-w-2xl flex flex-col justify-center items-center pt-12">
        <h1 className="text-9xl text-red-600 font-bold">404</h1>
        <h3 className="text-3xl font-semibold">Oops! Page not found</h3>
        <p className="mb-2">
          Sorry, the page you are looking for cannot be found.
        </p>
        <Link
          to="/"
          className="block px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 duration-200 ease-out active:bg-red-800"
        >
          Click here to go home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
