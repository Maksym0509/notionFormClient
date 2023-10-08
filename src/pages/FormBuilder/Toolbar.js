import React, { useState, useEffect } from "react";
import {
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import { save, formReset, publish } from "../../redux/Form/formSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "../../components/LoadingButton";
import fileUpload from "../../helper/fileUpload";
import convertNotionToElements from "../../helper/convertNotionToElements";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Logo from "../../assets/images/logo.png";
import "./index.css";
import RefreshIcon from "./icons";

const Toolbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, formId, tables } = useSelector(
    (state) => state.form
  );

  const [selectedTable, setSelectedTable] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedTable")) || null;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [previewVisibility, setPreviewVisibility] = useState(false);
  const [publishVisibility, setPublishVisibility] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [isPublishBtnLoading, setIsPublishBtnLoading] = useState(false);
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
  const [copyBtnText, setCopyBtnText] = useState("Copy");

  useEffect(() => {
    setIsPublishBtnLoading(false);
    setIsSubmitBtnLoading(false);

    if (isError) {
      toast.error(message);

      if (message === "API token is invalid.") {
        history.push("/");
      }
    } else if (isSuccess) {
      if (message === "published") {
        openPublishModal();
      }
      if (message === "submitted") {
        toast.success("Successfully submitted!");
      }
    }
    dispatch(formReset());
  }, [isSuccess, isError]);

  useEffect(() => {
    if (tables) {
      console.log(tables, "table data of notion")
      setData(convertNotionToElements(tables, selectedTable));
    }
  }, [tables]);

  useEffect(() => {
    ElementStore.subscribe((state) => {
      onChange(state.data);
      state.data.length ? setIsDisableBtn(false) : setIsDisableBtn(true);
    });
  });

  useEffect(() => {
    setTimeout(() => {
      $(".toolbar-header").each(function () {
        if ($(this).find(".badge").text() === "Checkbox") {
          $(this).find(".fas.fa-edit").parent().hide();
        }
      });
    }, 0);
  }, []);

  const onRefresh = () => {
    window.location.reload();
  }

  const toggle = () => setIsOpen(!isOpen);
  const openPreviewModal = () => setPreviewVisibility(!previewVisibility);
  const openPublishModal = () => setPublishVisibility(!publishVisibility);
  const onChange = (formData) => setData(formData);
  const onSubmit = (formData) => {
    setIsSubmitBtnLoading(true);

    let formdata = formData;
    data.map(item => {
      if(item.element === "HyperLink"){
        const newItem = {
          custom_name: "hyperlink",
          id: item.id,
          name: "hyperlink",
          value: item.href
        }
        formdata.push(newItem)
      }
    })

    const newData = data.reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, {});

    const promises = formdata.map(async (obj) => {
      if (newData[obj.id]) {
        if (
          newData[obj.id].element === "Camera" ||
          newData[obj.id].element === "FileUpload"
        ) {
          const imgSrc =
            obj.value !== null ? await fileUpload(obj.value) : null;

          if (imgSrc) {
            return {
              ...obj,
              value: imgSrc,
              label: newData[obj.id].label?.trim(),
            };
          }
        } else {
          return {
            ...obj,
            label: newData[obj.id].label?.trim(),
          };
        }
      }
    });

    Promise.all(promises).then((results) => {
      results = results.filter(function (element) {
        return element !== undefined;
      });
      dispatch(save({ formData: results, table: selectedTable }));
      openPreviewModal();
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      process.env.REACT_APP_DEV_SERVER_URL + "form/" + formId
    );

    setCopyBtnText("Copied!");
    toast.success("Copy this link to clipboard");
    setTimeout(() => {
      setCopyBtnText("copy");
    }, 5000);
  };

  const onPublishForm = () => {
    setIsPublishBtnLoading(true);
    dispatch(publish({ data: data, notionDBID: selectedTable }));
  };

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg fixed-top sticky p-0 builderMT " + false
        }
        id="navigation"
      >
        <Container fluid className="custom-container">
          <Link className="navbar-brand text-dark fw-bold me-auto" to="/">
            <img src={Logo} alt="" height="50" />
          </Link>
          <div>
            <NavbarToggler
              className="me-3"
              type="button"
              onClick={() => toggle()}
            >
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
          </div>
          <Collapse
            isOpen={isOpen}
            className="navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav mx-auto navbar-center">
              <>
                <NavItem>
                  <button
                    type="button"
                    disabled={isDisableBtn}
                    onClick={openPreviewModal}
                    className="btn btn-primary mr-5"
                  >
                    Preview
                  </button>
                 
                </NavItem>{" "}
                <NavItem>
                  <LoadingButton
                    disabled={isDisableBtn || isPublishBtnLoading}
                    className={"btn btn-success mr-5"}
                    onClick={onPublishForm}
                    isLoading={isPublishBtnLoading}
                    title={"Publish"}
                  />
                </NavItem>
                <NavItem>
                  <button
                    type="button"
                    onClick={onRefresh}
                    className="btn btn-warning mr-5"
                  >
                    {/* <i class="bi bi-arrow-clockwise"></i> */}
                    {/* <MdRefresh /> */}
                    <RefreshIcon />
                  </button>
                </NavItem>
              </>
            </ul>
          </Collapse>
        </Container>
      </nav>

      {previewVisibility && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <ModalBody className="modal-body p-5">
                <div className="position-absolute end-0 top-0 p-3">
                  <button
                    type="button"
                    onClick={openPreviewModal}
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div>
                  <ReactFormGenerator
                    download_path=""
                    answer_data={{}}
                    action_name="Submit"
                    form_action="/"
                    form_method="POST"
                    onSubmit={onSubmit}
                    submitButton={
                      <LoadingButton
                        disabled={isSubmitBtnLoading}
                        className={"btn btn-primary submitBtn"}
                        isLoading={isSubmitBtnLoading}
                        title={"Submit"}
                      />
                    }
                    data={data}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  onClick={() => {
                    openPreviewModal();
                  }}
                  className="btn btn-secondary waves-effect cancelBtn"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </ModalFooter>
            </div>
          </div>
        </div>
      )}

      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <Modal isOpen={publishVisibility} autoFocus={true} centered>
            {" "}
            <div className="position-absolute end-0 top-0 p-3">
              <button
                type="button"
                onClick={openPublishModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <ModalBody className="modal-body p-3 mt-3">
              <div>
                <div className="alert  bg-soft-success" role="alert">
                  Your form was published!
                </div>
                <div className="mt-5">
                  <h5 className="fs-17 fw-bold mb-3">Form link</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="profile-document-list d-flex align-items-center p-1 formDiv">
                      <div className="ms-3 formLink">
                        <p className="text-muted mb-0">
                          {process.env.REACT_APP_DEV_SERVER_URL +
                            "form/" +
                            formId}
                        </p>
                      </div>
                      <div className="ms-3">
                        <Link
                          to={`/form/${formId}`}
                          target="blank"
                          className="fs-20 text-muted"
                        >
                          <i className="uil uil-external-link-alt"></i>
                        </Link>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={copyLink}
                      className="btn btn-dark"
                    >
                      {copyBtnText}
                    </button>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Toolbar);
