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
import { useDispatch } from "react-redux";
import {
  indexReducer_LogIn,
  indexReducer_LogOut,
} from "../../store/actions/indexAction";

const Navbar = ({ toggle, isLog, setLog }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">LOOKBOOK</NavLogo>
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
              <NavBtnLink
                to="/login"
                onClick={() => {
                  dispatch(indexReducer_LogIn());
                }}
              >
                LOG IN
              </NavBtnLink>
            ) : (
              <div>
                <NavBtnLink
                  onClick={() => {
                    dispatch(indexReducer_LogOut());
                    localStorage.removeItem("accessToken");
                  }}
                >
                  LOG OUT
                </NavBtnLink>
                <NavBtnLink to="/mypage">MyPage</NavBtnLink>
              </div>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};

export default Navbar;
