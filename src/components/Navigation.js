import React, { useState } from 'react';

import {
  Navbar, Nav, Collapse, NavbarToggler,
  NavbarBrand, NavLink, NavItem
} from 'reactstrap';

import oslo from "../img/oslo.png";

const Navigation = (props) => {

	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (

	<Navbar className="navbar-light" fixed="top" color="light">

		<NavbarBrand href="/" className="me-auto">
		    <img alt="logo" src={oslo} className="nav_logo"/>
			<span>Oslo Bysykkel</span>
		</NavbarBrand>
		
		    <NavbarToggler className="me-2"
				onClick={toggleNavbar}
			/>

			<Collapse isOpen={!collapsed} navbar>
		
				<Nav navbar>		
						<>
							<NavItem>
								<NavLink href="/find/?q=bike">Find a bike</NavLink>
							</NavItem>
		
							<NavItem>
								<NavLink href="/find/?q=dock">Dock a bike</NavLink>
							</NavItem>
							
							<NavItem>
								<hr></hr>
							</NavItem>
							
							<NavItem>
								<NavLink href="https://www.christofwendt.de/" target="_blank">christofwendt.de</NavLink>
							</NavItem>

						</>
					
				</Nav>
		
			</Collapse>

		</Navbar>
	);
}

export default Navigation;

