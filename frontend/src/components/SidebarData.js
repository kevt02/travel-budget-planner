import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Savings",
    path: "/savings",
    icon: <FaIcons.FaPiggyBank />,
    cName: "nav-text",
  },
  {
    title: "Flights",
    path: "/flights",
    icon: <FaIcons.FaPlane />,
    cName: "nav-text",
  },
  {
    title: "Trains",
    path: "/trains",
    icon: <FaIcons.FaTrain />,
    cName: "nav-text",
  },
  {
    title: "Stays",
    path: "/stays",
    icon: <FaIcons.FaHotel />,
    cName: "nav-text",
  }
];