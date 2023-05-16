import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIsLog] = useState(false);

  const dispatch = useDispatch();
  const indexReducer = useSelector((state) => state.indexReducer);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const setLog = () => {
    setIsLog(!isLog);
  };

  return (
    <>
      <Navbar toggle={toggle} isLog={indexReducer.isLog} setLog={setLog} />
      <Sidebar
        isOpen={isOpen}
        toggle={toggle}
        isLog={indexReducer.isLog}
        setLog={setLog}
      />
    </>
  );
};

export default Header;
