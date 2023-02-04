import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

    return (
        <div className="w-full h-screen bg-secondary-600 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <p className="text-10xl text-white">404</p>
                <p className="mt-4 text-white text-2xl text-center">
                    Page not found, take me back to <Link to="/">digiclass.com</Link>
                </p>
            </div>
        </div>
    );
}

export default NotFound;
