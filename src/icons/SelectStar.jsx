import React from "react";
import { useNavigate } from "react-router-dom";

const SelectStar = ({ onTap, click, label }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/customers");
  };

  return (
    <div onClick={() => { onTap(); handleNavigation(); }} style={{ textAlign: 'center', cursor: 'pointer' }}>
      {click === "btn2" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          <path
            fill="url(#paint0_linear_3382_16054)"
            d="M10.329 8.007l2.205-6.939c.452-1.422 2.44-1.425 2.896-.003l2.225 6.942h7.243c1.475 0 2.087 1.91.893 2.786l-5.848 4.29 2.245 6.923c.46 1.42-1.146 2.603-2.34 1.725l-5.826-4.284-5.847 4.31c-1.192.879-2.8-.302-2.342-1.721l2.241-6.959-5.864-4.283c-1.196-.874-.585-2.787.891-2.787h7.228z"
          ></path>
          <path
            fill="url(#paint1_linear_3382_16054)"
            d="M14 28.002a.555.555 0 01-.551-.558v-4.511c0-.308.247-.558.551-.558.305 0 .551.25.551.558v4.51a.555.555 0 01-.55.559z"
          ></path>
          <path
            fill="url(#paint2_linear_3382_16054)"
            d="M27.448 18.115a.545.545 0 01-.17-.027l-4.24-1.394a.56.56 0 01-.355-.703.55.55 0 01.695-.358l4.24 1.394a.56.56 0 01-.17 1.088z"
          ></path>
          <path
            fill="url(#paint3_linear_3382_16054)"
            d="M19.69 5.77a.545.545 0 01-.323-.107.562.562 0 01-.122-.78l2.62-3.65a.547.547 0 01.771-.123c.246.182.3.53.122.78l-2.621 3.65a.548.548 0 01-.446.23z"
          ></path>
          <path
            fill="url(#paint4_linear_3382_16054)"
            d="M8.31 5.77a.549.549 0 01-.447-.23L5.242 1.89a.562.562 0 01.122-.78.547.547 0 01.77.124l2.621 3.65a.562.562 0 01-.122.779.544.544 0 01-.324.106z"
          ></path>
          <path
            fill="url(#paint5_linear_3382_16054)"
            d="M.551 18.115a.56.56 0 01-.17-1.088l4.24-1.394a.55.55 0 01.695.358.56.56 0 01-.353.703L.722 18.088a.548.548 0 01-.17.027z"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_3382_16054"
              x1="31.703"
              x2="6.795"
              y1="-2.578"
              y2="23.499"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear_3382_16054"
              x1="14.786"
              x2="12.557"
              y1="21.772"
              y2="22.215"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint2_linear_3382_16054"
              x1="29.135"
              x2="27.151"
              y1="15.337"
              y2="19.619"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint3_linear_3382_16054"
              x1="23.654"
              x2="18.847"
              y1="0.493"
              y2="4.302"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint4_linear_3382_16054"
              x1="9.652"
              x2="4.844"
              y1="0.493"
              y2="4.302"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A72DD"></stop>
              <stop offset="1" stopColor="#0D62CA"></stop>
            </linearGradient>
            <linearGradient
              id="paint5_linear_3382_16054"
              x1="6.479"
              x2="4.495"
              y1="15.337"
              y2="19.619"
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
            <path d="M10.329 8.007l2.205-6.939c.452-1.422 2.44-1.425 2.896-.003l2.225 6.942h7.243c1.475 0 2.087 1.91.893 2.786l-5.848 4.29 2.245 6.923c.46 1.42-1.146 2.603-2.34 1.725l-5.826-4.284-5.847 4.31c-1.192.879-2.8-.302-2.342-1.721l2.241-6.959-5.864-4.283c-1.196-.874-.585-2.787.891-2.787h7.228z"></path>
            <path d="M14 28.002a.555.555 0 01-.551-.558v-4.511c0-.308.247-.558.551-.558.305 0 .551.25.551.558v4.51a.555.555 0 01-.55.559zM27.448 18.115a.545.545 0 01-.17-.027l-4.24-1.394a.56.56 0 01-.355-.703.55.55 0 01.695-.358l4.24 1.394a.56.56 0 01-.17 1.088zM19.69 5.77a.545.545 0 01-.323-.107.562.562 0 01-.122-.78l2.62-3.65a.547.547 0 01.771-.123c.246.182.3.53.122.78l-2.621 3.65a.548.548 0 01-.446.23zM8.31 5.77a.549.549 0 01-.447-.23L5.242 1.89a.562.562 0 01.122-.78.547.547 0 01.77.124l2.621 3.65a.562.562 0 01-.122.779.544.544 0 01-.324.106zM.551 18.115a.56.56 0 01-.17-1.088l4.24-1.394a.55.55 0 01.695.358.56.56 0 01-.353.703L.722 18.088a.548.548 0 01-.17.027z"></path>
          </g>
        </svg>
      )}
      <div className="create-bottom-nav-label" >{label}</div> {/* Added label here */}
    </div>
  );
};

export default SelectStar;
