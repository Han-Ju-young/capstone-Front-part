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

const Sidebar = ({ isOpen, toggle, isLog }) => {
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
              <SidebarRoute to="/login">LOG IN TEST</SidebarRoute>
            ) : (
              <SidebarRoute onClick={localStorage.removeItem("accessToken")}>
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
