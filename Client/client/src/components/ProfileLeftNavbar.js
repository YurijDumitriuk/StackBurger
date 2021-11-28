import React from "react";
import './ProfileLeftNavbar.css';
import { Link } from "react-router-dom";

export default function ProfileLeftNavbar() {
    return(
        <nav className="ProfileNavbar Left">
            <ul className="ProfileNavigationItems">
                <Link to="/profile">
                    <li className="ProfileListItem">
                        <a href="#">ORDER</a>
                    </li>
                </Link>
                <Link to="/profile_history">
                    <li className="ProfileListItem">
                        <a href="#">HISTORY</a>
                    </li>
                </Link>
            </ul>
        </nav>
    );
    
    
    
}