import localforage from "localforage";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spinner from "./component/spinner";
import GeneralContext from "./context/general_context";
import './index.css';

const MyNavBar = React.lazy(() => import("./component/navigation/public_navigation_bar"))
const MyFooter = React.lazy(() => import("./component/navigation/footer"))
const MyEror404 = React.lazy(() => import("./pages/Error404"))
const MyHome = React.lazy(() => import("./pages/Home/home"))
const MySignup = React.lazy(() => import("./pages/sign_up"))
const MySignin = React.lazy(() => import("./pages/sign_in"))

// const MyPrivateRoute = React.lazy(()=>import("./component/hoc/private_route"))

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    checkStatus()
  }, [])



  const checkStatus = async () => {
    try {
      const token = await localforage.getItem('token');
      const userdata = await localforage.getItem('userdata')
      token !== null ? setIsLogged(true) : setIsLogged(false)
      userdata !== null ? setUser(userdata) : localforage.clear()

      console.log(userdata)
    } catch (err) {
      setIsLogged(false)
    }
  }

  return (
    <>
      <React.Suspense fallback={<Spinner />}>
        <GeneralContext.Provider value={{ isLogged, setIsLogged, user }}>
          <Router>
            <MyNavBar />
            <Routes>
              {/* Public Routes  */}
              <Route path="/" exact element={<MyHome />} />
              <Route path="/*" exact element={<MyEror404 />} />
              <Route path="/signup" exact element={<MySignup />} />
              <Route path="/login" exact element={<MySignin />} />

              {/* <Route path="/*" exact element={<MyPrivateRoute><MyEror404 /></MyPrivateRoute>} /> Private Route */}

            </Routes>


            <MyFooter />
          </Router>
        </GeneralContext.Provider>
      </React.Suspense>
    </>
  );
}

export default App;
