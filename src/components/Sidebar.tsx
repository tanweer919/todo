import React, { useState } from "react";
import "./Sidebar.scss";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouseUser,
  faListAlt,
  faPen,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
interface propType {
  sidebarExpanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar = ({ sidebarExpanded, setExpanded }: propType): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setExpanded(!sidebarExpanded);
  };
  const history = useHistory();
  const handleSelect = (i: number, url: string) => {
    setSelectedIndex(i);
    history.push(url);
  };
  interface sidebarItem {
    label: string;
    iconClass: IconDefinition;
    link: string;
  }
  const items: sidebarItem[] = [
    { label: "Home", iconClass: faHouseUser, link: "/home" },
    { label: "All Todos", iconClass: faListAlt, link: "/all-todo" },
    {
      label: "Add Todo",
      iconClass: faPen,
      link: "/add-todo",
    },
    { label: "Settings", iconClass: faCogs, link: "/settings" },
  ];
  return (
    <nav className={`sidebar${sidebarExpanded ? " sidebar-expanded" : ""}`}>
      <div className="sidebar-menu-button__container" onClick={handleChange}>
        <div className="sidebar-menu-button">
          <div
            className={`icon-dash${sidebarExpanded ? " icon-dash-first" : ""}`}
          ></div>
          <div className="icon-dash "></div>
          <div
            className={`icon-dash${sidebarExpanded ? " icon-dash-last" : ""}`}
          ></div>
        </div>
      </div>
      {items.map((item: sidebarItem, i: number) => (
        <div
          className={`sidebar-item${
            selectedIndex === i ? " sidebar-item-active" : ""
          }`}
          key={i}
          onClick={() => {
            handleSelect(i, item["link"]);
          }}
        >
          <div className="sidebar-item__icon-box">
            <FontAwesomeIcon
              icon={item["iconClass"]}
              className={`sidebar-item__icon`}
            />
          </div>
          <div className="sidebar-item--text">{item["label"]}</div>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
