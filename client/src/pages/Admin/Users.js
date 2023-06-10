import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <section className="users_section">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>All Users</h1>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Users;
