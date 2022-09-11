import React from "react";
import { Link } from "react-router-dom";
import "./topnav.css"

const Topnav = () => {
    return (
        <div class="topnav">
            <Link to="/Home">
                <div className="GetAllPlayers">
                    GetAllPlayers
                </div>
            </Link>

            <Link to="/Player">
            <div className="GetPlayerDetails ">
                GetPlayerDetails 
            </div>
            </Link>

            <Link to="/Rating">
            <div className="AddPlayerRating ">
                AddPlayerRating 
            </div>
            </Link>

        </div>

    )
}

export default Topnav;