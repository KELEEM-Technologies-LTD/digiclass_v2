import localforage from "localforage";
import { Navigate, Outlet, } from "react-router-dom";

const PrivateRoute = async () => {
    var token = null;
    try {
        token = await localforage.getItem('token');
        token === null ? <Navigate to='/login' /> : <Outlet />
    } catch (err) {
        console.log(err);
        return <Navigate />
    }

    // let token = localStorage.getItem('token');

    // return (
    //     token ? <Outlet /> : <Navigate to="/login" />
    // )
}

export default PrivateRoute;