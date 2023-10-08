import React from "react";
/** Add Route Component */

// Public Section
const LandingPage = React.lazy(() => import("../pages/Home/Layout2/Layout2"));
const SignIn = React.lazy(() => import("../pages/Auth/SignIn"));
const SignUp = React.lazy(() => import("../pages/Auth/SignUp"));
const SignOut = React.lazy(() => import("../pages/Auth/SignOut"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword"));
const FormBuilder = React.lazy(() =>
  import("../pages/FormBuilder/FormBuilder")
);
const Form = React.lazy(() => import("../pages/Form/Form"));

// Routes
const authLayoutForPublicRoutes = [
  { path: "/signin", component: SignIn },
  { path: "/signup", component: SignUp },
  { path: "/signout", component: SignOut },
  { path: "/reset-password", component: ResetPassword },
  { path: "/form/:formId", component: Form },
];

const authLayoutForPrivateRoutes = [];

const commonLayoutForPublicRoutes = [
  { path: "/", component: LandingPage },
  // { path: "*", component: Error404 },
];

const commonLayoutForPrivateRoutes = [
  { path: "/build", component: FormBuilder },
];

export {
  authLayoutForPublicRoutes,
  authLayoutForPrivateRoutes,
  commonLayoutForPublicRoutes,
  commonLayoutForPrivateRoutes,
};
