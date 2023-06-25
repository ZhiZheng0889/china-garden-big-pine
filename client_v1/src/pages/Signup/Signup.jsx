import React from "react";
import Container from "../../components/Container/Container";
import { Auth0Provider } from "@auth0/auth0-react";
import Card from "../../components/Card/Card";

const Signup = () => {
  return (
    <main className="bg-gray-100 grow py-6">
      <Container className="max-w-xl">
        <Card>
          <header>
            <p>Welcome to</p>
            <h2 className="text-2xl font-semibold">China Garden</h2>
          </header>
        </Card>
      </Container>
    </main>
  );
};

export default Signup;
