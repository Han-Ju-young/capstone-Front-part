import React from "react";
import { FaBars } from "react-icons/fa";
import {
  MoblieIcon,
  Nav,
  NavbarContainer,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">LOGO</NavLogo>
          <MoblieIcon>
            <FaBars />
          </MoblieIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/popular">인기도서</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/aibook">인공지능 추천도서</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/review">도서리뷰</NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/login">Login</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};
export default Navbar;
