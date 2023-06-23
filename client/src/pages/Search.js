import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/search";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import { Prices } from "../components/Prices";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate("");
  return (
    <Layout title={"Search results"}>
      <section className="search-result">
        <div className="container">
          <div className="text-center">
            <h1>Search Resuts</h1>
            <h6>
              {values?.results.length < 1
                ? "No Products Found"
                : `Found ${values?.results.length}`}
            </h6>

            <div className="row flex-wrap">
              {/* {JSON.stringify(radio, null, 4)} */}
              {/* <h6>ALL PRODUCTS</h6> */}
              {values?.results.map((p) => (
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
        </div>
      </section>
    </Layout>
  );
};

export default Search;
