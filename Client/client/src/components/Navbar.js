import React, { Component } from "react";
import './Navbar.css';
import logo from "../images/logo.png";
import cart from "../images/cart.png"
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
					<li className="ListItem">
						<a href="#">MENU</a>
					</li>
					<li className="ListItem">
						<a href="#">LOGIN</a>
					</li>
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