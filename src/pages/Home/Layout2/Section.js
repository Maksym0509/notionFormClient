import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getTables, formReset } from "../../../redux/Form/formSlice";
import { setCode } from "../../../redux/Form/formSlice";
import { useCookies } from "react-cookie";
import convertNotionTablesToSelect from "../../../helper/convertNotionTablesToSelect";
import Select from "react-select";
import "./index.css";

const Section = () => {
  const [cookies] = useCookies(["token"]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, tables } = useSelector(
    (state) => state.form
  );
  
  const params = new URL(window.document.location).searchParams;
  const code = params.get("code");
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableOptions, setTableOptions] = useState([]);
  const [table, setTable] = useState(null);
  const openModal = () => setModal(!modal);

  let Token = localStorage.getItem('token')
  const authorizationUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.REACT_APP_DEV_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${process.env.REACT_APP_DEV_REDIRECT_RUL}`;
  
  const validateTable = () => {
    if (table) {
      localStorage.setItem("selectedTable", JSON.stringify(table));
      history.push("/build");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      history.push("/signin");
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
    }
    dispatch(formReset());
  }, [isSuccess, isError]);

  useEffect(() => {
    if (code) {
      openModal();
      dispatch(setCode(code));
      dispatch(getTables({ code: code }));
      setIsLoading(true);
    }
  }, [code]);

  useEffect(() => {
    if (tables) {
      setTableOptions(convertNotionTablesToSelect(tables));
      setIsLoading(false);
    }
  }, [tables]);

  return (
    <React.Fragment>
      <section className="bg-home2" id="home">
        <Container>
          <Row className="align-items-center createF">
            <Col lg={12}>
              <div className="registration-form">
                <h2>
                  <span className="text-success fw-bold"></span>
                </h2>
                {Token && (
                  <Row className="g-0 justify-content-center">
                    <Col md={4}>
                      <div className="mt-3 mt-md-0 h-100">
                        <a
                          href={authorizationUrl}
                          className="btn btn-primary w-100 h-100"
                        >
                          <i className="uil uil-plus me-1"></i>New Form
                        </a>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        id="myModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <Modal isOpen={modal} role="dialog" centered>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Pick the Notion table
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={openModal}
              ></button>
            </div>
            <ModalBody>
              <Select
                className="basic-single"
                classNamePrefix="select"
                value={table}
                isLoading={isLoading}
                isClearable={true}
                isSearchable={true}
                onChange={setTable}
                required={true}
                name="notionTable"
                options={tableOptions}
              />
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                onClick={() => {
                  openModal();
                }}
                className="btn btn-secondary waves-effect"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={validateTable}
                type="button"
                className="btn btn-primary waves-effect waves-light"
              >
                Continue
              </button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Section;
