import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and redirect
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/"); // Redirect to login page
  };

  return (
    <TopbarContainer>
      <div className="TopbarLeft">
        <Link to="/feed" style={{ textDecoration: "none" }}>
          <span className="Logo">Sasta Instagram</span>
        </Link>
      </div>

      <div className="TopbarCenter">
        <div className="Searchbar">
          <AiOutlineSearchStyled />
          <input type="text" className="SearchInput" placeholder="Search" />
        </div>
      </div>

      <div className="TopbarRight">
        <div className="TopbarIcons">
          <div className="TopbarIconItem">
            <FiSearchStyled />
          </div>
          <div className="TopbarIconItem">
            <BsPlusSquareStyled onClick={() => navigate("/post")} />
          </div>
          <img
            onClick={() => navigate("/account")}
            className="TopbarImg"
            alt="Profile"
            src="https://picsum.photos/500/500?random=2"
          />
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </div>
    </TopbarContainer>
  );
}

/* ===== Styled Components ===== */

const FiSearchStyled = styled(FiSearch)`
  font-size: 20px;
  margin-right: 10px;
  display: none;
  @media (max-width: 655px) {
    display: block;
  }
`;

const BsPlusSquareStyled = styled(BsPlusSquare)`
  font-size: 20px;
  margin-right: 10px;
`;

const AiOutlineSearchStyled = styled(AiOutlineSearch)`
  font-size: 20px !important;
  margin-left: 10px;
`;

const TopbarContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  justify-content: center;
  border-bottom: 1px solid gray;

  .TopbarLeft {
    padding-right: 130px;
    display: flex;
    @media (max-width: 655px) {
      padding-right: 0px;
    }
  }

  .TopbarCenter {
    display: flex;
    width: 400px;
    justify-content: center;
    margin: 0 20px;
  }

  .Searchbar {
    width: 100%;
    height: 30px;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    display: flex;
    align-items: center;
    @media (max-width: 655px) {
      display: none;
    }
  }

  .SearchInput {
    border: none;
    width: 70%;
    background-color: rgb(218, 218, 218);
    &:focus {
      outline: none;
    }
  }

  .TopbarRight {
    margin-right: 10px;
    padding-left: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 655px) {
      padding-left: 0px;
    }
  }

  .TopbarIcons {
    display: flex;
    position: relative;
    align-items: center;
    gap: 10px;
  }

  .TopbarIconItem {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .TopbarImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  .Logo {
    font-size: 32px;
    padding: 0 20px;
    font-weight: bold;
    color: black;
    cursor: pointer;
    font-family: "Dancing Script", cursive;

    /* Mobile view */
    @media (max-width: 655px) {
      font-size: 20px;
      padding: 0 8px;
    }

    /* Tablet view */
    @media (min-width: 656px) and (max-width: 1024px) {
      font-size: 22px;
      padding: 0 10px;
    }
  }
`;

/* Logout Button */
const LogoutButton = styled.button`
  background-color: #ff4b4b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #e13a3a;
  }

  @media (max-width: 655px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;

export default Topbar;
