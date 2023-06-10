import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - Create Product"}>
      <section className="create_product_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Product</h1>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateProduct;
