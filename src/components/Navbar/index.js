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

const Navbar = ({ toggle }) => {
  return (
    <div>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">LOGO</NavLogo>
          <MoblieIcon onClick={toggle}>
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
            <NavItem>
              <NavLinks to="/bookdeal">도서거래</NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/login">Log In</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};
export default Navbar;
