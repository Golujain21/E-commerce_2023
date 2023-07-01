import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <section className="section_all_category">
        <div className="container">
          <h5 className="text-center mb-3">All Categories</h5>
          <div className="row">
            {categories.map((c) => (
              <div className="col-md-6 mb-3 " key={c._id}>
                <div class="categoryies">
                  <Link to={`/category/${c.slug}`} className="allcatgory">
                    {c.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
