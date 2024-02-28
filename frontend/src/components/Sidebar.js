import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom"; // Remove BrowserRouter import
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import Header from "./Header";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      {/* <div className="sidebar active">
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </div> */}

      <IconContext.Provider value={{ color: undefined }}>
        <div className="sidebar-container">
          <Link to="#!" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Header />
        </div>
        <nav className={sidebar ? "sidebar active" : "sidebar"}>
          <ul className="sidebar-items" onClick={showSidebar}>
            <li className="sidebar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
