import { FaBars } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
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

const Navbar = ({ toggle, isLog, setLog }) => {
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
          </NavMenu>
          <NavBtn id="loginbtn">
            {!isLog ? (
              <NavBtnLink to="/login" onClick={setLog}>
                LOG IN TEST
              </NavBtnLink>
            ) : (
              <div>
                <NavBtnLink onClick={setLog}>LOG OUT TEST</NavBtnLink>
              </div>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};
// <p><NavLinks to="/mypage"><AiOutlineUser />마이페이지</NavLinks></p>

export default Navbar;
