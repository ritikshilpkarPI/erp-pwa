import React from "react";
import { useNavigate } from "react-router-dom";

const SelectMenu = ({ onTap, click, label}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/landing");
  };

  return (
    <div
      onClick={() => {
        onTap();
        handleNavigation();
      }}
      style={{ textAlign: "center", cursor: "pointer" }}
    >
      {click === "btn1" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          <rect
            width="12.6"
            height="9.8"
            fill="url(#paint0_linear_3382_15984)"
            rx="2"
          ></rect>
          <rect
            width="12.6"
            height="15.4"
            x="15.4"
            fill="url(#paint1_linear_3382_15984)"
            rx="2"
          ></rect>
          <rect
            width="12.6"
            height="15.4"
            y="12.602"
            fill="url(#paint2_linear_3382_15984)"
            rx="2"
          ></rect>
          <rect
            width="12.6"
            height="9.8"
            x="15.4"
            y="18.199"
            fill="url(#paint3_linear_3382_15984)"
            rx="2"
          ></rect>
          <defs>
            <linearGradient
              id="paint0_linear_3382_15984"
              x1="15.277"
              x2="5.468"
              y1="-1.05"
              y2="11.736"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear_3382_15984"
              x1="30.677"
              x2="14.992"
              y1="-1.65"
              y2="11.36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint2_linear_3382_15984"
              x1="15.277"
              x2="-0.407"
              y1="10.952"
              y2="23.962"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint3_linear_3382_15984"
              x1="30.677"
              x2="20.868"
              y1="17.149"
              y2="29.936"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          <g fill="#2A3256" opacity="0.3">
            <rect width="12.6" height="9.8" rx="2"></rect>
            <rect width="12.6" height="15.4" x="15.4" rx="2"></rect>
            <rect width="12.6" height="15.4" y="12.602" rx="2"></rect>
            <rect width="12.6" height="9.8" x="15.4" y="18.199" rx="2"></rect>
          </g>
        </svg>
      )}
      <div className="create-bottom-nav-label" >{label}</div> {/* Added label here */}
    </div>
  );
};

export default SelectMenu;
