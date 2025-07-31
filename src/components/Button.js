import React from "react";
import PropTypes from "prop-types";

const Button = ({
                    children,
                    variant = "primary",
                    size = "normal",
                    onClick,
                    type = "button",
                    loading = false,
                    disabled = false,
                    className = "",
                }) => {
    const baseStyles =
        "rounded font-medium transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    const sizes = {
        small: "px-2 py-1 text-sm",
        normal: "px-4 py-2",
        large: "px-6 py-3 text-lg",
    };
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        gray: "bg-gray-300 hover:bg-gray-400 text-black",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
            disabled={loading || disabled}
        >
            {loading ? (
                <span className="flex items-center justify-center">
          <svg
              className="animate-spin h-4 w-4 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          Loading...
        </span>
            ) : (
                children
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["primary", "success", "danger", "gray"]),
    size: PropTypes.oneOf(["small", "normal", "large"]),
    onClick: PropTypes.func,
    type: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
