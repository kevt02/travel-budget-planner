import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  
  {
    title: "Savings",
    path: "/savings",
    icon: <FaIcons.FaPiggyBank />,
    cName: "nav-text",
  },
  {
    title: "Flights",
    path: "/flights",
    icon: <FaIcons.FaSuitcaseRolling />,
    cName: "nav-text",
  },

  {
    title: "Stays",
    path: "/stays",
    icon: <FaIcons.FaHotel />,
    cName: "nav-text",
  },
  {
    title: "Currency Rate",
    path: "/currency",
    icon: <FaIcons.FaMoneyBill />,
    cName: "nav-text",
  }


];