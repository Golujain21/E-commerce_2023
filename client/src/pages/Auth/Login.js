import React, { useState } from "react";
import Layout from "../../components/Layout";
// import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [auth, setAuth] = useAuth();

  //   const navigate = useNavigate();
  return (
    <Layout>
      <section className="login_form">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form>
                <h4 className="title">LOGIN FORM</h4>

                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
