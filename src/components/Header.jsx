import React, { useState, useEffect } from "react";
import "../styles/header.scss";
import domainLogo from "../assets/domain_logo.svg";
import { useNavigate } from "react-router-dom";
import TodaysDate from "./TodaysDate";
import { useLocation } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import { IconMenu2, IconX } from "@tabler/icons-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerModalVisability, setHeaderModalVisability] = useState(false);
  const handleNavigate = (path) => {
    navigate(path);
  };

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const headerModal = () => {
    return (
      <>
        <nav className="headerNavModal">
          <button onClick={() => handleNavigate("/daily")}>Daily</button>
          <button onClick={() => handleNavigate("/community")}>
            Community
          </button>
          <button onClick={() => handleNavigate("/leaderboard")}>
            Leaderboard
          </button>
          <button onClick={() => handleNavigate("/tutorial")}>Tutorial</button>

          {localStorage.getItem("token") === null ? (
            <button
              className="loginButton whiteButton"
              onClick={() => handleNavigate("/login")}
            >
              Login
            </button>
          ) : (
            <button
              className="loginButton whiteButton"
              onClick={() => handleNavigate("/login")}
            >
              Profile
            </button>
          )}
        </nav>
      </>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="headerContainer">
      <div className="contentContainer">
        <div className="logoDateContainer">
          <img
            onClick={() => handleNavigate("/community")}
            src={domainLogo}
            alt=""
            width="150"
          ></img>
          {location.pathname.startsWith("/daily") && <TodaysDate />}
        </div>

        {screenSize.width >= 910 ? (
          <nav className="headerNav">
            <button
              className="dailyButton blackButton"
              onClick={() => handleNavigate("/daily")}
            >
              Daily
            </button>
            <button
              className="communityButton blackButton"
              onClick={() => handleNavigate("/community")}
            >
              Community
            </button>
            <button
              className="dailyButton blackButton"
              onClick={() => handleNavigate("/leaderboard")}
            >
              Leaderboard
            </button>
            <button
              className="tutorialButton whiteButton"
              onClick={() => handleNavigate("/tutorial")}
            >
              Tutorial
            </button>

            {localStorage.getItem("token") === null ? (
              <button
                className="loginButton whiteButton"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </button>
            ) : (
              <ProfileIcon />
            )}
          </nav>
        ) : (
          <>
            <div className="menuButton">
              {headerModalVisability ? (
                <IconX
                  className="menuButton"
                  onClick={() =>
                    setHeaderModalVisability(!headerModalVisability)
                  }
                />
              ) : (
                <IconMenu2
                  className="menuButton"
                  onClick={() =>
                    setHeaderModalVisability(!headerModalVisability)
                  }
                />
              )}
            </div>
            {headerModalVisability && headerModal()}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
