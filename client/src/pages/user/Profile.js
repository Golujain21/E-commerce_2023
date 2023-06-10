import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
const Profile = () => {
  return (
    <Layout title={"Dashboard - Profile"}>
      <section className="orders_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1>Profile</h1>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
