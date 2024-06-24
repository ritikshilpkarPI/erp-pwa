import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArrowLeft = () => {
    const navigate = useNavigate()
    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="lucide lucide-arrow-left"
            viewBox="0 0 24 24"
            onClick={()=> navigate(-1)}
        >
            <path d="M12 19l-7-7 7-7M19 12H5"></path>
        </svg>
    )
}

export default ArrowLeft