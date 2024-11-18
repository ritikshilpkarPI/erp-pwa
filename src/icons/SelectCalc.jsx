import React from "react";
import { useNavigate } from "react-router-dom";

const SelectCalc = ({ onTap, click, label}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/history");
  };

  return (
    <div
      onClick={() => {
        onTap();
        handleNavigation();
      }}
      style={{ textAlign: "center", cursor: "pointer" }}
    >
      {click === "btn3" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          <path
            fill="url(#paint0_linear_3382_16101)"
            d="M26.15 8.847c-.598-.6-1.551-.637-2.195-.112-.093.075-.021.009-1.44 1.427l3.682 3.681 1.323-1.306c.64-.64.64-1.68 0-2.32l-1.37-1.37z"
          ></path>
          <path
            fill="url(#paint1_linear_3382_16101)"
            d="M14.966 17.783l-2.165 4.64a.82.82 0 001.09 1.09l4.64-2.165c.184-.085-.372.435 6.499-6.35l-3.675-3.674c-6.811 6.812-6.301 6.272-6.389 6.46z"
          ></path>
          <path
            fill="url(#paint2_linear_3382_16101)"
            d="M19.913 22.355c-.2.198-.432.36-.688.479l-4.64 2.165a2.457 2.457 0 01-2.781-.49 2.468 2.468 0 01-.49-2.78l2.165-4.641c.122-.26.287-.496.49-.7l6.977-6.976V2.461A2.464 2.464 0 0018.485 0H2.46A2.464 2.464 0 000 2.46v23.08A2.464 2.464 0 002.461 28h16.024a2.464 2.464 0 002.46-2.46v-4.205l-1.032 1.02zM4.375 5.305h12.25a.82.82 0 010 1.64H4.375a.82.82 0 010-1.64zm0 4.375H14a.82.82 0 110 1.64H4.375a.82.82 0 010-1.64zm-.82 5.195a.82.82 0 01.82-.82h7a.82.82 0 110 1.64h-7a.82.82 0 01-.82-.82z"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_3382_16101"
              x1="29.165"
              x2="23.491"
              y1="7.78"
              y2="13.542"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear_3382_16101"
              x1="27.645"
              x2="14.934"
              y1="10.01"
              y2="22.937"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint2_linear_3382_16101"
              x1="25.397"
              x2="-2.546"
              y1="-3"
              y2="18.191"
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
            <path d="M26.15 8.847c-.598-.6-1.551-.637-2.195-.112-.093.075-.021.009-1.44 1.427l3.682 3.681 1.323-1.306c.64-.64.64-1.68 0-2.32l-1.37-1.37zM14.966 17.783l-2.165 4.64a.82.82 0 001.09 1.09l4.64-2.165c.184-.085-.372.435 6.499-6.35l-3.675-3.674c-6.811 6.812-6.301 6.272-6.389 6.46z"></path>
            <path d="M19.913 22.355c-.2.198-.432.36-.688.479l-4.64 2.165a2.457 2.457 0 01-2.781-.49 2.468 2.468 0 01-.49-2.78l2.165-4.641c.122-.26.287-.496.49-.7l6.977-6.976V2.461A2.464 2.464 0 0018.485 0H2.46A2.464 2.464 0 000 2.46v23.08A2.464 2.464 0 002.461 28h16.024a2.464 2.464 0 002.46-2.46v-4.205l-1.032 1.02zM4.375 5.305h12.25a.82.82 0 010 1.64H4.375a.82.82 0 010-1.64zm0 4.375H14a.82.82 0 110 1.64H4.375a.82.82 0 010-1.64zm-.82 5.195a.82.82 0 01.82-.82h7a.82.82 0 110 1.64h-7a.82.82 0 01-.82-.82z"></path>
          </g>
        </svg>
      )}
      <div className="create-bottom-nav-label">{label}</div> {/* Added label here */}
    </div>
  );
};

export default SelectCalc;
