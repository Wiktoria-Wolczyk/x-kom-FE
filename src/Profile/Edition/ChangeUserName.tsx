import "./ChangeUserName.css";
import React, { useNavigate } from "react-router";

function ChangeUserName() {
  const navigate = useNavigate();
  return (
    <div className="containerForChangeUserNameComponent">
      <div className="divForReturnButtonInChangeUserName">
        <button
          className="returnButtonInChangeUserName"
          onClick={() => navigate("/user_details")}
        >
          <i className="fa-solid fa-chevron-left "></i>
        </button>
        <p onClick={() => navigate("/user_details")}>Your details</p>
      </div>
    </div>
  );
}

export default ChangeUserName;
