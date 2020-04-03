import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/actions/usersActions";
import UserNav from "../UI/UserNav";
import AnonymousNav from "../UI/AnonymousNav";

const Header = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  return (
    <div className="Header">
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RouterNavLink} to="/" className='mr-auto'>Chat App</NavbarBrand>
        <Nav className="ml-auto" navbar>

          {user ? <UserNav user={user} onClick={() => dispatch(logoutUser())}/> : <AnonymousNav />}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;