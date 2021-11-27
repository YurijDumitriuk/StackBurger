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
<<<<<<< Updated upstream
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
=======
					{CheckAurhorization() === true &&
						<Link to="/login" onClick={() => LogOut()}>
							<li className="ListItem">
								<a href="#">LOG OUT</a>
							</li>
						</Link>
					}
					{CheckAurhorization() === true &&
						<Link to="/profile">
							<li className="ListItem">
								<a href="#">PROFILE</a>
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
>>>>>>> Stashed changes
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