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
const MyCourseDetail = React.lazy(() => import("./pages/Course/course_detail"));
const MyCart = React.lazy(() => import("./pages/cart/cart"));
const MyAllCourse = React.lazy(() => import("./pages/allcourses/all_course"));
const MyProfilePage = React.lazy(() => import("./pages/profile/profile"));
const MyCourses = React.lazy(() => import("./pages/mycourses/mycourses"));
const MyUserCourseDetail = React.lazy(()=>import("./pages/mycoursedetail/my_course_detail"))

function App() {
  return (
    <>
      <React.Suspense fallback={<Spinner />}>
        <GeneralContextProvider>
          <Router>
            <Routes>
              {/* Public Routes  */}
              <Route path="/" exact element={<MyHome />} />
              <Route path="/*" exact element={<MyEror404 />} />
              <Route path="/signup" exact element={<MySignup />} />
              <Route path="/login" exact element={<MySignin />} />
              {/* <Route path="/cart" exact element={<MyCart />} /> */}
              <Route
                path="/course/:courseid"
                exact
                element={<MyCourseDetail />}
              />

              <Route element={<MyPrivateRoute />}>
                <Route exact path="/cart" element={<MyCart />} />
                <Route exact path="/all" element={<MyAllCourse />} />
                <Route exact path="/profile" element={<MyProfilePage />} />
                <Route exact path="/my-course" element={<MyCourses />} />
                <Route exact path="/my-course/:courseid" element={<MyUserCourseDetail />} />
              </Route>
            </Routes>
          </Router>
        </GeneralContextProvider>
      </React.Suspense>
    </>
  );
}

export default App;
