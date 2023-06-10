import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
const CreateCategory = () => {
  return (
    <Layout title={"Dashboard - Create Category"}>
      <section className="create_category_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Category</h1>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateCategory;
