import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import RightSideContent from "./RightSideContent";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase } from "../../redux/Form/formSlice";
import MetaTags from "react-meta-tags";
import Toolbar from "./Toolbar";
import "react-form-builder2/dist/app.css";
import "./index.css";

const FormBuilder = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { tables, isError } = useSelector((state) => state.form);

  const [selectedTable, setSelectedTable] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedTable")) || null;
  });

  useEffect(() => {
    if (isError) {
      history.push("/");
    }
  }, [isError]);

  useEffect(() => {
    if (!selectedTable) {
      history.push("/");
    } else {
      dispatch(getDatabase());
    }
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Wizfill | Build</title>
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
      {tables ? <Toolbar /> : null}
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              {tables ? (
                <RightSideContent />
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  {" "}
                  <div
                    className="spinner-border text-primary m-1"
                    role="status"
                  ></div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default FormBuilder;
