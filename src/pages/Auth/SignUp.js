import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Card, Col, Input, Row, CardBody } from "reactstrap";
import MetaTags from "react-meta-tags";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { authRegister, authReset } from "../../redux/Extra/authSlice";
import signUpImage from "../../assets/images/auth/sign-up.png";
import LoadingButton from "../../components/LoadingButton";
import Logo from "../../assets/images/logo.png";

const SignUp = () => {
  // Dispatch
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("User Registered Successfully");
      history.push("/signin");
    }
    dispatch(authReset());
    setIsLoading(false);
  }, [isSuccess, isError]);

  const onSubmit = (data) => {
    const userData = { ...data };

    setIsLoading(true);
    dispatch(authRegister(userData));
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(Yup.string().required("Password is required"))
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .when("password", (password, schema) => {
        if (password) {
          return schema.required("Confirm Password is required");
        }
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  // form end validation

  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>User Sign Up | Wizfill</title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                {" "}
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="align-items-center">
                        <Col lg={6} className="text-center">
                          <CardBody className="p-4">
                            <Link to="/">
                              <img src={Logo} alt="" height="50" />
                            </Link>
                            <div className="mt-5">
                              <img
                                src={signUpImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 text-white">
                            <div className="w-100">
                              <div className="text-center">
                                <h5>Let's Get Started</h5>
                                <p className="text-white-70">&nbsp;</p>
                              </div>
                              <form
                                className="auth-form"
                                onSubmit={handleSubmit(onSubmit)}
                              >
                                <div className="mb-3">
                                  <label
                                    htmlFor="userInput"
                                    className="form-label"
                                  >
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    id="userInput"
                                    name="name"
                                    placeholder="Enter your name"
                                    {...register("name")}
                                    className={`form-control ${
                                      errors.name ? "is-invalid" : ""
                                    }`}
                                  />
                                  <div className="invalid-feedback">
                                    {errors.name?.message}
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="emailInput"
                                    className="form-label"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    id="emailInput"
                                    name="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className={`form-control ${
                                      errors.email ? "is-invalid" : ""
                                    }`}
                                  />
                                  <div className="invalid-feedback">
                                    {errors.email?.message}
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    id="passwordInput"
                                    name="password"
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    className={`form-control ${
                                      errors.password ? "is-invalid" : ""
                                    }`}
                                  />
                                  <div className="invalid-feedback">
                                    {errors.password?.message}
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="confirmPasswordInput"
                                    className="form-label"
                                  >
                                    Confirm Password
                                  </label>
                                  <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPasswordInput"
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword")}
                                    className={`form-control ${
                                      errors.confirmPassword ? "is-invalid" : ""
                                    }`}
                                  />
                                  <div className="invalid-feedback">
                                    {errors.confirmPassword?.message}
                                  </div>
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
                                    className={
                                      "btn btn-primary btn-hover w-100"
                                    }
                                    isLoading={isLoading}
                                    title={"Join"}
                                  />
                                </div>
                              </form>
                              <div className="mt-3 text-center">
                                <p className="mb-0">
                                  Already a member ?{" "}
                                  <Link
                                    to="/signin"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    {" "}
                                    Sign In{" "}
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

export default SignUp;
