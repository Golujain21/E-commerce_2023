import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <section className="section_category_wise_product">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>{category?.name}</h3>
            </div>
          </div>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-3">
                <div key={p._id} className=" card w-100">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <p>{p.price}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-center">
                    <Stack direction={"row"} spacing={1}>
                      <Button
                        variant="contained"
                        // startIcon={<AiOutlineDelete />}
                        color="warning"
                        size="small"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        MORE DETAILS
                      </Button>
                      <Button
                        variant="contained"
                        // startIcon={<MdSystemUpdateAlt />}
                        size="small"
                        // onClick={handleUpdate}
                      >
                        ADD TO CART
                      </Button>
                    </Stack>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryProduct;
