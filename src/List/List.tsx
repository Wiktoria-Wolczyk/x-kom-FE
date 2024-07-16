import React, { useContext } from "react";
import "./List.css";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/loginContext/LoginContext";

function List() {
  const navigate = useNavigate();

  const { actualUser } = useContext(LoginContext);
  return (
    <div className="containerForListComponent">
      <div className="userNameDiv">
        <p>Hi, </p>
        <p className="userNameTextBold">{actualUser?.firstName}</p>
      </div>
      <div className="containerForList">
        <div className="divInList" onClick={() => navigate("/orders")}>
          <div className="containerForIconAndText">
            <div className="iconInList">
              <i className="fa-regular fa-clipboard "></i>
            </div>
            <div className="textInList"> Orders</div>
          </div>
          <button className="chevronRight">
            <i className="fa-solid fa-chevron-right "></i>
          </button>
        </div>
        <div className="divInList">
          <div className="containerForIconAndText">
            <div className="iconInList">
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            <div className="textInList"> Claims and Returns</div>
          </div>
          <div className="chevronRight">
            <i className="fa-solid fa-chevron-right "></i>
          </div>
        </div>
        <div className="divInList">
          <div className="containerForIconAndText">
            <div className="iconInList">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="textInList"> Shopping Lists</div>
          </div>
          <div className="chevronRight">
            <i className="fa-solid fa-chevron-right "></i>
          </div>
        </div>
        <div className="divInList">
          <div className="containerForIconAndText">
            <div className="iconInList">
              <i className="fa-regular fa-comment-dots"></i>
            </div>
            <div className="textInList"> Opinions</div>
          </div>
          <div className="chevronRight">
            <i className="fa-solid fa-chevron-right "></i>
          </div>
        </div>
        <div className="divInList" onClick={() => navigate("/user_details")}>
          <div className="containerForIconAndText">
            <div className="iconInList">
              <i className="fa-solid fa-gear"></i>
            </div>
            <div className="textInList">Account settings </div>
          </div>
          <button className="chevronRight">
            <i className="fa-solid fa-chevron-right "></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;
