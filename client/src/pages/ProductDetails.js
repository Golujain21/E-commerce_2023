import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <section
        className="section_product_details"
        style={{ backgroundColor: "#ccddff" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                height="300"
                width={"350px"}
              />
            </div>
            <div className="col-md-8">
              {/* {JSON.stringify(product, null, 4)} */}
              <div className="single_pro_detail">
                <h1 className="text-center">Product Details</h1>
                <h6>Name : {product.name}</h6>
                <h6>Description : {product.description}</h6>
                <h6>Price : {product.price}</h6>
                <h6>Category : {product?.category?.name}</h6>
                {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
                <Button variant="contained" size="medium">
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section_similar_products"
        style={{ backgroundColor: "#e6eeff" }}
      >
        <div className="container">
          <h4> Similar Products</h4>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="row">
            {relatedProducts?.map((p) => (
              <div className="col-md-3">
                <div key={p._id} className=" card ">
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
                      {/* <Button
                        variant="contained"
                        // startIcon={<AiOutlineDelete />}
                        color="warning"
                        size="small"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        MORE DETAILS
                      </Button> */}
                      <Button
                        variant="contained"
                        // startIcon={<MdSystemUpdateAlt />}
                        // size="small"
                        fullWidth
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

export default ProductDetails;
