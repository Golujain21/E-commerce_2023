import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import HeroBanner from "../components/HeroBanner";
const HomePage = () => {
  // const [auth, setAuth] = useAuth();

  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
      console.log(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(value);
    console.log(id);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best offers "}>
      <section className="section_banner_block p-0">
        <HeroBanner />
      </section>
      <section className="home-page">
        <div className="container">
          {/* <h1>HomePage</h1> */}
          {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
          <div className="row ">
            <div className="col-md-3">
              <h5>filter By Category</h5>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h5>filter By Price</h5>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((pri, index) => (
                    <div key={index}>
                      <Radio value={pri.array}>{pri.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column mt-3 ">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </Button>
              </div>
            </div>
            <div className="col-md-9">
              <div className="all-products">
                <div className="row ">
                  {/* {JSON.stringify(radio, null, 4)} */}
                  <h6>ALL PRODUCTS</h6>
                  {products?.map((p) => (
                    <div
                      key={p._id}
                      className="product-link col-md-4"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card m-2">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          <p>{p.price}</p>
                        </div>
                        <div className="card-footer">
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
                              onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, p])
                                );
                                toast.success("Item Added to cart");
                              }}
                            >
                              ADD TO CART
                            </Button>
                          </Stack>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="m-2 p-3">
                  {/* {total} */}
                  {products && products.length < total && (
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? "Loading ..." : "Load More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
