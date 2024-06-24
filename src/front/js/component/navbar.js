import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    <Link to="/demo">
                        <button className="btn btn-primary mr-2">Check the Context in action</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-danger">Login</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
