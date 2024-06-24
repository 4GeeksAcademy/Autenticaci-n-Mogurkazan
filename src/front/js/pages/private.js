import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await actions.logout();
            navigate("/login"); 
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="container">
            <h1>ESTÁS EN TU ÁREA PRIVADA</h1>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            <Link to="/">
                <button className="btn btn-primary mt-3">Back home</button>
            </Link>
        </div>
    );
};
