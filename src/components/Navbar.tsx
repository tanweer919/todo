import {
  faUserCircle,
  faSearch,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import logo from "../logo.png";
import "./Navbar.scss";
import store from "../store/store";
interface propType {
  sidebarExpanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar = ({ sidebarExpanded, setExpanded }: propType): JSX.Element => {
  const history = useHistory();
  const [focus, setFocus] = useState(false);

  const handleLinkClick = (link: string) => {
    history.push(link);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  };

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
  };
  return (
    <nav className={`navbar${sidebarExpanded ? " navbar--small" : ""} row`}>
      <div className="navbar__logo-box col-3">
        <img src={logo} alt="Logo" className="navbar__logo" />
      </div>
      <div className="navbar__right row col-9">
        <div
          className={`navbar__right__search-box col-11${
            focus ? " navbar__right__search-box--active" : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="navbar__right__search-box__search-icon"
          />
          <input
            type="text"
            className="navbar__right__search-box__input"
            placeholder="Search"
            onFocus={handleFocus}
            onBlur={handleFocusOut}
          />
        </div>
        <div className="navbar__right__user-box col-1">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="navbar__right__user-box__icon"
          />
          <span className="navbar__right__user-box__down-arrow">&#9660;</span>
          <div className={`navbar__right__user-box__dropdown`}>
            <store.Consumer>
              {(context) => {
                const user = context![0].user;
                return user !== null ? (
                  <div
                    className="navbar__right__user-box__dropdown__link"
                    onClick={() => {
                      handleLinkClick("/profile");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      className="navbar__right__user-box__dropdown__link__icon"
                    />
                    <span>{}</span>
                  </div>
                ) : (
                  <>
                    <div
                      className="navbar__right__user-box__dropdown__link"
                      onClick={() => {
                        handleLinkClick("/login");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUserAlt}
                        className="navbar__right__user-box__dropdown__link__icon"
                      />
                      <span>Login</span>
                    </div>
                    <div
                      className="navbar__right__user-box__dropdown__link"
                      onClick={() => {
                        handleLinkClick("/register");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="navbar__right__user-box__dropdown__link__icon"
                      />
                      <span>Register</span>
                    </div>
                  </>
                );
              }}
            </store.Consumer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
