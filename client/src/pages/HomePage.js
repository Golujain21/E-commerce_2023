import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Best offers "}>
      <section className="home">
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </section>
    </Layout>
  );
};

export default HomePage;
