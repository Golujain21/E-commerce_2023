import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
const Orders = () => {
  return (
    <Layout title={"Dashboard - orders"}>
      <section className="orders_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1>Orders</h1>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
