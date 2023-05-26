import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const indexReducer = useSelector((state) => state.indexReducer);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar toggle={toggle} isLog={indexReducer.isLog} />
      <Sidebar isOpen={isOpen} toggle={toggle} isLog={indexReducer.isLog} />
    </>
  );
};

export default Header;
