import React, { Component } from "react";
import './Navbar.css';
import logo from "../images/logo.png";
import cart from "../images/cart.png";
import { Link } from "react-router-dom";

function CheckAurhorization(){
	if(localStorage.getItem("userId") === null){
		return false;
	}
	return true;
}

function LogOut(){
	localStorage.removeItem("userId");
}

class Navbar extends Component{
	render(){
		return(
			<nav className="Navbar">
				<Link to="/">
					<div>
						<img alt="logo" className="NavbarLogo" src={logo} />
					</div>
				</Link>
				<ul className="NavigationItems">
					<li className="ListItem">
						<a href="#">CONSTRUCTOR</a>
					</li>
					<Link to="/">
						<li className="ListItem">
							<a href="#">MENU</a>
						</li>
					</Link>
					{CheckAurhorization() === true &&
						<Link to="/login" onClick={() => LogOut()}>
							<li className="ListItem">
								<a href="#">LOG OUT</a>
							</li>
						</Link>
					}
					{CheckAurhorization() === false &&
						<Link to="/login">
							<li className="ListItem">
								<a href="#">LOGIN</a>
							</li>
						</Link>
					}
					{CheckAurhorization() === false &&
						<Link to="/registration">
							<li className="ListItem">
								<a href="#">REGISTRATION</a>
							</li>
						</Link>
					}
					<Link to="/profile">
						<li className="ListItem">
							<div>
								<a href="#">
									<img alt="cart" className="NavbarCart" src={cart} />
								</a>
							</div>
						</li>
					</Link>
				</ul>
			</nav>
		);
	}
}

export default Navbar;