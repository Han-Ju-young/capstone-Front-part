import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SidebarLink,
  SidebarMenu,
  SidebarRoute,
  SidebarWrapper,
  SideBtnWrap,
} from "./SidebarElements";
import { useDispatch } from "react-redux";
import {
  indexReducer_LogIn,
  indexReducer_LogOut,
} from "../../store/actions/indexAction";

const Sidebar = ({ isOpen, toggle, isLog }) => {
  const dispatch = useDispatch();
  return (
    <>
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to="/" onClick={toggle}>
              Home
            </SidebarLink>
            <SidebarLink to="/popular" onClick={toggle}>
              인기도서
            </SidebarLink>
            <SidebarLink to="/aibook" onClick={toggle}>
              인공지능 추천도서
            </SidebarLink>
            <SidebarLink to="/review" onClick={toggle}>
              도서리뷰
            </SidebarLink>
          </SidebarMenu>
          <SideBtnWrap>
            {!isLog ? (
              <SidebarRoute
                to="/login"
                onClick={() => {
                  dispatch(indexReducer_LogIn());
                }}
              >
                LOG IN TEST
              </SidebarRoute>
            ) : (
              <SidebarRoute
                onClick={() => {
                  dispatch(indexReducer_LogOut());
                  localStorage.removeItem("accessToken");
                }}
              >
                LOG OUT TEST
              </SidebarRoute>
            )}
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
