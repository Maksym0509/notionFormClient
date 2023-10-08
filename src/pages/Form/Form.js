import React, { useEffect } from "react";
import { Col, Row, Card, CardBody, Container } from "reactstrap";
import MetaTags from "react-meta-tags";
import { useDispatch } from "react-redux";
import { getForm } from "../../redux/Form/formSlice";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import FormGenerator from "./FormGenerator";
import "react-form-builder2/dist/app.css";
import "./index.css";

const Form = ({ match }) => {
  const {
    params: { formId },
  } = match;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForm({ formId: formId }));
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Wizfill | Form</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </MetaTags>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="formLogo justify-content-center">
                <Link
                  className="navbar-brand text-dark fw-bold me-auto mb-4"
                  to="http://localhost:3000/"
                >
                  <img src={Logo} alt="" height="50" />
                </Link>
              </div>
              <Card className="profile-content-page mt-4 mt-lg-0">
                <CardBody className="p-4">
                  <FormGenerator />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Form;
