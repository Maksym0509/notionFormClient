import React, { useState, useEffect } from "react";
import {
  Container,
  NavbarToggler,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { Link, withRouter, useHistory } from "react-router-dom";
import userImage2 from "../../assets/images/user/img-02.jpg";
import Logo from "../../assets/images/logo.png";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser, authReset } from "../../redux/Extra/authSlice";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const NavBar = (props) => {
  // Auth
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { isLogoutSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  let Token = cookies.token;

  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [navClass, setnavClass] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  }, []);

  // Auth
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isLogoutSuccess) {
      history.push("/signin");
    }
    dispatch(authReset());
  }, [isLogoutSuccess, isError, message, history, dispatch]);

  //menu activation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const logoutHandler = (e) => {
    dispatch(logoutUser());

    history.push("/signout");
  };

  const scrollNavigation = () => {
    var scrollup = window.pageYOffset;

    if (scrollup > 0) {
      setnavClass("nav-sticky");
    } else {
      setnavClass("");
    }
  };

  return (
    <React.Fragment>
      <nav
        className={"navbar navbar-expand-lg fixed-top sticky p-0 " + navClass}
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

          {Token ? (
            <ul className="header-menu list-inline d-flex align-items-center mb-0">
              <Dropdown
                onClick={() => setUserProfile(!userProfile)}
                isOpen={userProfile}
                toggle={dropDownuserprofile}
                className="list-inline-item"
              >
                <DropdownToggle
                  to="#"
                  className="header-item"
                  id="userdropdown"
                  type="button"
                  tag="a"
                  aria-expanded="false"
                >
                  <img
                    src={userImage2}
                    alt="mdo"
                    width="35"
                    height="35"
                    className="rounded-circle me-1"
                  />{" "}
                  <span className="d-none d-md-inline-block fw-medium">
                    {currentUser}
                  </span>
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-end"
                  aria-labelledby="userdropdown"
                  end
                >
                  <li>
                    <Link className="dropdown-item" to="/">
                      {/* Settings */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={logoutHandler}
                    >
                      Log out
                    </Link>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </ul>
          ) : (
            <ul className="navbar-nav navbar-center">
              <NavItem>
                <Link className="nav-link" to="/signin">
                  Log In
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </NavItem>
            </ul>
          )}
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
