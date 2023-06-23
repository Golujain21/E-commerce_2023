import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <section className="admin_all_order_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Orders</h1>

              {orders?.map((o, i) => {
                return (
                  <div className="all_orders">
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
                            <td>
                              <Select
                                bordered={false}
                                onChange={(value) => handleChange(o._id, value)}
                                defaultValue={o?.status}
                              >
                                {status.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
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

export default AdminOrders;
