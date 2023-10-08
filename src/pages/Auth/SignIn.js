import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { authLogin, authReset } from "../../redux/Extra/authSlice";
import signInImage from "../../assets/images/auth/sign-in.png";
import Logo from "../../assets/images/logo.png";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingButton from "../../components/LoadingButton";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      console.log("isSuccess",isSuccess)
      toast.success("Welcome Back!");
      history.push("/");
    }
    dispatch(authReset());
    setIsLoading(false);
  }, [isSuccess, isError]);

  const handleChange = (e) => {
    setUserData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    dispatch(authLogin(userData));
  };

  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>Sign In | Wizfill</title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="g-0">
                        <Col lg={6} className="text-center">
                          <CardBody className="p-4">
                            <Link to="/">
                              <img src={Logo} alt="" height="50" />
                            </Link>
                            <div className="mt-5">
                              <img
                                src={signInImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>Welcome Back !</h5>
                                <p className="text-white-70">
                                  Sign in to continue to Wizfill.
                                </p>
                              </div>
                              <Form
                                action="#"
                                className="auth-form"
                                onSubmit={handleSubmit}
                              >
                                <div className="mb-3">
                                  <label
                                    htmlFor="usernameInput"
                                    className="form-label"
                                  >
                                    Email
                                  </label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="usernameInput"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      &nbsp;
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <LoadingButton
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                    className={
                                      "btn btn-primary btn-hover w-100"
                                    }
                                    title={"Sign In"}
                                  />
                                </div>
                              </Form>
                              <div className="mt-4 text-center">
                                <p className="mb-0">
                                  Don't have an account ?{" "}
                                  <Link
                                    to="/signup"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    {" "}
                                    Sign Up{" "}
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
