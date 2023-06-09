import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
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
              {/* {JSON.stringify(orders, null, 4)} */}
              {orders?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <div class="table-responsive">
                      <table className="table m-0">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col"> date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createAt).fromNow()}</td>
                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div
                          class="accordion accordion-flush mb-3"
                          id="accordionFlushExample"
                        >
                          <div class="accordion-item">
                            <h2 class="accordion-header">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                              >
                                Product Details
                              </button>
                            </h2>
                            <div
                              id="flush-collapseOne"
                              class="accordion-collapse collapse"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body">
                                {o?.products?.map((p, i) => (
                                  <div
                                    className="row mb-2 p-3 card flex-row"
                                    key={p._id}
                                  >
                                    <div className="col-md-4">
                                      <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"100px"}
                                      />
                                    </div>
                                    <div className="col-md-8">
                                      <p>{p.name}</p>
                                      <p>{p.description.substring(0, 30)}</p>
                                      <p>Price : {p.price}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
