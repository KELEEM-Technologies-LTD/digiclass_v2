import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spinner from "./component/spinner";
import GeneralContextProvider from "./context/generalcontext_provider";
import "./index.css";

// const MyNavBar = React.lazy(() =>
//   import("./component/navigation/public_navigation_bar")
// );
// const MyFooter = React.lazy(() => import("./component/navigation/footer"));
const MyPrivateRoute = React.lazy(() =>
  import("./component/hoc/private_route")
);
const MyEror404 = React.lazy(() => import("./pages/Error404"));
const MyHome = React.lazy(() => import("./pages/Home/home"));
const MySignup = React.lazy(() => import("./pages/sign_up"));
const MySignin = React.lazy(() => import("./pages/sign_in"));
const MyForgotPassword = React.lazy(() => import("./pages/forgot_password"));
const MyVerifyAndReset = React.lazy(() =>
  import("./pages/verify_and_reset_pwd")
);
const MyCourseDetail = React.lazy(() => import("./pages/Course/course_detail"));
const MyCart = React.lazy(() => import("./pages/cart/cart"));
const MyCheckOut = React.lazy(() => import("./pages/cart/checkout"));
const MyBuyNow = React.lazy(() => import("./pages/cart/buynow"));
const MyAllCourse = React.lazy(() => import("./pages/allcourses/all_course"));
const MyProfilePage = React.lazy(() => import("./pages/profile/profile"));
const MyCourses = React.lazy(() => import("./pages/mycourses/mycourses"));
const MyVerifyTransaction = React.lazy(() =>
  import("./pages/profile/verify_transaction")
);
const MyUserCourseDetail = React.lazy(() =>
  import("./pages/mycoursedetail/my_course_detail")
);
const MyCourseCategory = React.lazy(() =>
  import("./pages/category/course_by_category")
);
// const MyMessages = React.lazy(() => import("./pages/messages/messages"));
const MyhotReload = React.lazy(() => import("./pages/hot_reload"));
const MyInstructor = React.lazy(() => import("./pages/instructor/instructor"));
const MyVerify = React.lazy(() => import("./pages/verify_email"));
const MyMessaging = React.lazy(() => import("./pages/messages/main"));
const MyMobileMessages = React.lazy(() => import("./pages/messages/mobile"));
const MyMobileChat = React.lazy(() => import("./pages/messages/mobilechat"));

function App() {
  return (
    <>
      <React.Suspense fallback={<Spinner />}>
        <GeneralContextProvider>
          <Router>
            <Routes>
              {/* Public Routes  */}
              <Route path="/" exact element={<MyHome />} />
              <Route path="/testpage" exact element={<MyMessaging />} />
              <Route path="/*" exact element={<MyEror404 />} />
              <Route path="/signup" exact element={<MySignup />} />
              <Route path="/login" exact element={<MySignin />} />
              <Route
                path="/password/reset"
                exact
                element={<MyForgotPassword />}
              />
              <Route exact path="/reload" element={<MyhotReload />} />
              <Route
                path="/password/reset/verify/:verification_id"
                exact
                element={<MyVerifyAndReset />}
              />
              {/* <Route path="/cart" exact element={<MyCart />} /> */}
              <Route
                path="/course/:courseid"
                exact
                element={<MyCourseDetail />}
              />
              <Route
                path="/category/:categoryid/:name"
                exact
                element={<MyCourseCategory />}
              />
              <Route exact path="/all" element={<MyAllCourse />} />
              <Route
                exact
                path="/instructor/:instructorid"
                element={<MyInstructor />}
              />
              <Route exact path="/verify" element={<MyVerify />} />

              <Route element={<MyPrivateRoute />}>
                <Route exact path="/cart" element={<MyCart />} />
                <Route exact path="/checkout" element={<MyCheckOut />} />
                <Route exact path="/buy-now/:courseid" element={<MyBuyNow />} />
                <Route exact path="/profile" element={<MyProfilePage />} />
                <Route exact path="/my-course" element={<MyCourses />} />
                <Route
                  exact
                  path="/verifytransaction"
                  element={<MyVerifyTransaction />}
                />
                <Route
                  exact
                  path="/my-course/:courseid"
                  element={<MyUserCourseDetail />}
                />
                <Route exact path="/messages" element={<MyMessaging />} />
                <Route
                  exact
                  path="/messages/mobile"
                  element={<MyMobileMessages />}
                />
                <Route
                  exact
                  path="/messages/mobile/:chatid"
                  element={<MyMobileChat />}
                />
              </Route>
            </Routes>
          </Router>
        </GeneralContextProvider>
      </React.Suspense>
    </>
  );
}

export default App;
