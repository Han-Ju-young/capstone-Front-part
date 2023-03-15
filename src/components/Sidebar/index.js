import React from "react";
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

const Sidebar = () => {
  return (
    <>
      <SidebarContainer>
        <Icon>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to="/">Home</SidebarLink>
            <SidebarLink to="/popular">인기도서</SidebarLink>
            <SidebarLink to="/aibook">인공지능 추천도서</SidebarLink>
            <SidebarLink to="/review">도서리뷰</SidebarLink>
          </SidebarMenu>
          <SideBtnWrap>
            <SidebarRoute to="/singin">Sign In</SidebarRoute>
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
