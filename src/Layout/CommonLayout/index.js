import React, { Suspense } from "react";

//Importing Section
import NavBar from "../CommonLayout/NavBar";
import Footer from "../CommonLayout/Footer";
import ScrolltoTop from "../../components/ScrolltoTop";
import "./index.css";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Suspense>
        <div>
          <NavBar />
          <div className="main-content">
            <div className="page-content">{props.children}</div>
          </div>
          <ScrolltoTop />
          <Footer />
        </div>
      </Suspense>
    </React.Fragment>
  );
};

export default Layout;
