import React, { Component } from "react";
import './Navbar.css';
import logo from "../images/logo.png";
import cart from "../images/cart.png";
import { Link } from "react-router-dom";
import {CheckAuthorization} from "../services/AutorizationService";

function LogOut(){
	localStorage.removeItem("userId");
	localStorage.clear();
}

class Navbar extends Component{
	render(){
		console.log(this.props);
		return(
			<nav className="Navbar">
				<Link to="/">
					<div>
						<img alt="logo" className="NavbarLogo" src={logo} />
					</div>
				</Link>
				<ul className="NavigationItems">
					<Link to="/constructor">
						<li className="ListItem">
							<a href="#">CONSTRUCTOR</a>
						</li>
					</Link>
					<Link to="/">
						<li className="ListItem">
							<a href="#">MENU</a>
						</li>
					</Link>
					{CheckAuthorization() === true &&
						<Link to="/login" onClick={() => LogOut()}>
							<li className="ListItem">
								<a href="#">LOG OUT</a>
							</li>
						</Link>
					}
					{CheckAuthorization() === false &&
						<Link to="/login">
							<li className="ListItem">
								<a href="#">LOGIN</a>
							</li>
						</Link>
					}
					{CheckAuthorization() === false &&
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
									<a className="ItemsCountTracker">{this.props.itemCounter}</a>
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