import React, { Component } from "react";
import './Navbar.css';
import logo from "../images/logo.png";
import cart from "../images/cart.png";
import { Link } from "react-router-dom";
class Navbar extends Component{
	render(){
		return(
			<nav className="Navbar">
				<div>
					<img className="NavbarLogo" src={logo} />
				</div>
				<ul className="NavigationItems">
					<li className="ListItem">
						<a href="#">CONSTRUCTOR</a>
					</li>
					<Link to="/">
						<li className="ListItem">
							<a href="#">MENU</a>
						</li>
					</Link>
					<Link to="/login">
						<li className="ListItem">
							<a href="#">LOGIN</a>
						</li>
					</Link>
					<Link to="/registration">
						<li className="ListItem">
							<a href="#">REGISTRATION</a>
						</li>
					</Link>
					<li className="ListItem">
						<div>
							<a href="#">
								<img className="NavbarCart" src={cart} />
							</a>
						</div>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;