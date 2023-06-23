import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { AiFillWarning } from "react-icons/ai";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <section className="section_add_to_cart">
        <div className="container">
          <div className="row">
            <h1>{`hello ${auth?.token && auth?.user?.name}`}</h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="cart_items">
                {cart?.map((p, ind) => (
                  <div key={ind} className="row mb-2  card flex-row cart_item">
                    <div className="col-md-4 p-0">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top "
                        alt={p.name}
                        width="150"
                        height="150"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price : {p.price}</p>
                      <Button
                        variant="contained"
                        // startIcon={<MdSystemUpdateAlt />}
                        size="small"
                        color="error"
                        onClick={() => removeCartItem(p._id)}
                      >
                        {" "}
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="cart_summary">
                <h3>Summary</h3>
                <p>Total | Payment | Checkout</p>
                <hr />
                <h5>Total : {totalPrice()} </h5>
                <div className="checkout">
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3">
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button
                          className="btn btn-outline-warning w-100"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-warning w-100"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning w-100"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Plase Login to checkout
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="payment mb-2">
                  {/* <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  /> */}
                  {/* <DropIn
                    options={{ authorization: clientToken }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <Button
                    variant="contained"
                    // startIcon={<MdSystemUpdateAlt />}
                    size="small"
                    onClick={handlePayment}
                  >
                    Make Payment
                  </Button> */}
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn btn-primary w-100"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
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

export default CartPage;
