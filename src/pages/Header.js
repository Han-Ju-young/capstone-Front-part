import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIsLog] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const setLog = () => {
    setIsLog(!isLog);
  };

  return (
    <>
      <Navbar toggle={toggle} isLog={isLog} setLog={setLog} />
      <Sidebar isOpen={isOpen} toggle={toggle} isLog={isLog} setLog={setLog} />
    </>
  );
};

export default Header;
